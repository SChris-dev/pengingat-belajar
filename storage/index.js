import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';

/**
 * Load all reminders from AsyncStorage
 */
export const loadReminders = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading reminders:', error);
    return [];
  }
};

/**
 * Save all reminders to AsyncStorage
 */
export const saveReminders = async (reminders) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    return true;
  } catch (error) {
    console.error('Error saving reminders:', error);
    return false;
  }
};

/**
 * Clear all reminders (for testing/debugging)
 */
export const clearAllReminders = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing reminders:', error);
    return false;
  }
};
