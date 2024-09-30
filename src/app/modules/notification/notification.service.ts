import { INotification } from "./notification.interface";
import Notification from "./notification.model";

const createNotificationIntoDB = async (payload: INotification) => {
  const favorite = await Notification.create(payload);
  return favorite;
};
const updateNotificationFormDB = async (
  id: string,
  payload: Partial<INotification>
) => {
  const favorite = await Notification.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return favorite;
};

export const NotificationServices = {
  createNotificationIntoDB,
  updateNotificationFormDB,
};
