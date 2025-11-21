import Notification from '../models/Notification';
import mongoose from 'mongoose';

interface CreateNotificationData {
  userId: mongoose.Types.ObjectId | string;
  type: 'order_update' | 'payment' | 'promotion' | 'system' | 'review' | 'payout';
  title: string;
  message: string;
  data?: Record<string, any>;
  link?: string;
}

export const createNotification = async (
  data: CreateNotificationData
): Promise<void> => {
  try {
    await Notification.create(data);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const createBulkNotifications = async (
  notifications: CreateNotificationData[]
): Promise<void> => {
  try {
    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Error creating bulk notifications:', error);
  }
};

export const markAsRead = async (
  notificationId: string,
  userId: string
): Promise<void> => {
  await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true }
  );
};

export const markAllAsRead = async (userId: string): Promise<void> => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
};

export const getUnreadCount = async (userId: string): Promise<number> => {
  return await Notification.countDocuments({ userId, isRead: false });
};
