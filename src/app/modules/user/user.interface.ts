export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  followers: string[];
  following: string[];
  isVerified: boolean;
  premiumAccess: boolean;
  posts: string[];
  role:string
}
