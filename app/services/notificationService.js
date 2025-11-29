import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Konfigurasi bagaimana notifikasi ditampilkan
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions
 */
export const requestPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.warn('Notification permission not granted');
      return false;
    }
    
    // Setup notification channel untuk Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Pengingat Belajar',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6366f1',
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return false;
  }
};

/**
 * Schedule a notification
 */
export const scheduleNotification = async (reminder) => {
  try {
    const { title, hour, minute, repeat } = reminder;
    
    const trigger = {
      hour,
      minute,
      repeats: repeat,
    };
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Pengingat Belajar',
        body: title,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });
    
    console.log('✅ Notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error scheduling notification:', error);
    return null;
  }
};

/**
 * Cancel a scheduled notification
 */
export const cancelNotification = async (notificationId) => {
  try {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log('✅ Notification cancelled:', notificationId);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error canceling notification:', error);
    return false;
  }
};
