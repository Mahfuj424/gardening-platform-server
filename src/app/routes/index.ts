import { Router } from "express";
import { paymentRoutes } from "../modules/payment/payment.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRotues } from "../modules/auth/auth-route";
import { PostRoutes } from "../modules/post/post.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRotues,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/create-checkout-session",
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
