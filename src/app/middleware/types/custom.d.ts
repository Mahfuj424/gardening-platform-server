// types/custom.d.ts
import { IUserPayload } from "../middleware/auth"; // Adjust the path if needed

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload; // Add the user property to the Request interface
    }
  }
}
