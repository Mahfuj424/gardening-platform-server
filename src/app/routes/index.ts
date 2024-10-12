import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRotues } from "../modules/auth/auth-route";
import { PostRoutes } from "../modules/post/post.route";
import { FavoriteRoutes } from "../modules/favorite/favorite.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import {  LikeRoutes } from "../modules/like/like.route";
import { DisLikeRoutes } from "../modules/disLike/disLike.route";
import { PaymentRouters } from './../modules/paymentAamarpay/payment.route';

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
    path: "/favorite",
    route: FavoriteRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/likes",
    route: LikeRoutes,
  },
  {
    path: "/dislikes",
    route: DisLikeRoutes,
  },
  {
    path: "/payment",
    route: PaymentRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
