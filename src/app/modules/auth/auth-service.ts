/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import nodemailer from "nodemailer";

const logInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    return null;
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    followers: user.followers,
    following: user.following,
    isVerified: user.isVerified,
    premiumAccess: user.premiumAccess,
    posts: user.posts,
  };

  // Create token and send to the user
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_screet as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    token: accessToken,
    data: jwtPayload,
  };
};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'hotmail', 'yahoo', etc.
  auth: {
    user: "mahfujahmad424@gmail.com", // Replace with your email
    pass: "iagd gzpn gjqi sukf", // Replace with your email password or app password
  },
});

const forgotPasswordIntoDB = async (email: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist!");
    }

    // Create a secret key using the user's password
    const screet = config.jwt_access_screet + user?.password;

    // Generate a JWT token with the user's email and id
    const token = jwt.sign({ email: user?.email, id: user?._id }, screet, {
      expiresIn: "10m", // Token expires in 10 minutes
    });

    // Generate the password reset link
    const link = `http://localhost:5000/api/v1/auth/reset-password/${user?._id}/${token}`;

    // Set up mail options
    const mailOptions = {
      from: "mahfujahmad424@gmail.com", // Sender address (your email)
      to: user?.email, // Recipient's email (the user)
      subject: "Password Reset Request From GrowNest", // Email subject
      text: `You requested for a password reset. Use the following link to reset your password: ${link}`,
      html: `<p>You requested for a password reset.</p>
             <p>Click <a href="${link}">here</a> to reset your password.</p>
             <p>This link will expire in 10 minutes.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // Return the generated link so the controller can access it
    return link;
  } catch (error: any) {
    console.log("Error in forgotPasswordIntoDB:", error);
    throw error;
  }
};

// reset password
const resetPasswordIntoDB = async (id: string, token: string) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User does not exist!");
  }

  const screet = config.jwt_access_screet + user?.password;

  try {
    const verify = jwt.verify(token, screet);
    if (verify) {
      // If verified, return the form HTML
      return `
      <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f3f4f6;">
        <div style="background-color: #ffffff; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; padding: 32px; width: 100%; max-width: 400px;">
          <h2 style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 24px; color: #4b5563;">
            Reset Your Password
          </h2>
          <form id="reset-password-form" style="display: flex; flex-direction: column; gap: 24px;" onsubmit="submitPassword(event)">
            <div>
              <label for="new-password" style="display: block; font-size: 0.875rem; font-weight: 500; color: #4b5563;">New Password</label>
              <input
                id="new-password"
                type="password"
                name="new-password"
                required
                style="width: 100%; margin-top: 8px; padding: 12px; border: 1px solid #38a169; outline: none; border-radius: 8px;"
                placeholder="Enter your new password"
              />
            </div>
            <div>
              <label for="confirm-password" style="display: block; font-size: 0.875rem; font-weight: 500; color: #4b5563;">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                name="confirm-password"
                required
                style="width: 100%; margin-top: 8px; padding: 12px; border: 1px solid #38a169; outline: none; border-radius: 8px;"
                placeholder="Confirm your new password"
              />
            </div>
            <button
              type="submit"
              style="width: 100%; padding: 12px; background: linear-gradient(to right, #ff7e5f, #feb47b); color: white; font-weight: 600; border-radius: 8px; cursor: pointer; transition: background 0.3s;"
              onmouseover="this.style.background='#e3342f'"
              onmouseout="this.style.background='linear-gradient(to right, #ff7e5f, #feb47b)'"
            >
              Reset Password
            </button>
          </form>
          <script>
            async function submitPassword(event) {
              event.preventDefault(); // Prevent the form from reloading the page
              const newPassword = document.getElementById('new-password').value;
              const confirmPassword = document.getElementById('confirm-password').value;

              if (newPassword !== confirmPassword) {
                alert("Passwords do not match!");
                return;
              }

              // Send the password to the server via a fetch request
              try {
                const response = await fetch('/api/v1/auth/update-password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: '${id}', // Pass the user ID (from your backend context)
                    token: '${token}', // Pass the token (from your backend context)
                    password: newPassword,
                  }),
                });

                const data = await response.json();
                  alert("Password updated successfully!");
                  window.location.href = "http://localhost:3000/auth/login"; // Redirect to the correct login page after success
                
              } catch (error) {
                console.error("Error during password update:", error);
                alert("Something went wrong, please try again.");
              }
            }
          </script>
        </div>
      </div>
    `;

    }
  } catch (error) {
    return `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-6 text-red-600">
          Invalid or Expired Token
        </h2>
        <p class="text-center text-gray-600">Please try resetting your password again.</p>
      </div>
    </div>
    `;
  }
  return "not verified!";
};

const resetPasswordAndSaveIntoDB = async (
  id: string,
  token: string,
  password: string
) => {
  // Find user by id
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User does not exist!");
  }

  // Append user's current password to the JWT secret
  const secret = config.jwt_access_screet + user?.password;

  try {
    // Verify the JWT token with the modified secret
    const verify = jwt.verify(token, secret);
    if (verify) {
      // Hash the new password before saving it to the database

      // Update the user's password with the hashed password
      await User.findByIdAndUpdate(
        id,
        { $set: { password } },
        { new: true, runValidators: true }
      );

      return "Password Updated";
    }
  } catch (error) {
    // Handle JWT verification errors
    return "Token not verified!";
  }
};

export const AuthServices = {
  forgotPasswordIntoDB,
  logInUserIntoDB,
  resetPasswordIntoDB,
  resetPasswordAndSaveIntoDB,
};
