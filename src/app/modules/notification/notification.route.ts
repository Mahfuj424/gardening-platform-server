import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { NotificationValidation } from "./notification.validation";
import { NotificationControllers } from "./notification.controller";

const router = Router();

router.post(
  "/create-notification",
  validateRequest(NotificationValidation.createNotificationSchema),
  NotificationControllers.createNotification
);

router.patch(
  "/:id",
  validateRequest(NotificationValidation.updateNotificationSchema),
  NotificationControllers.updateNotification
);

export const NotificationRoutes = router;
