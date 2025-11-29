import { loadReminders, saveReminders } from '../../storage';
import { scheduleNotification, cancelNotification } from './notificationService';
import { generateId, validateReminder } from '../../utils/helpers';

/**
 * Save a new reminder
 */
export const saveReminder = async (reminderData) => {
  try {
    const { title, hour, minute, repeat } = reminderData;
    
    // Validate input
    const validation = validateReminder(title, hour, minute);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    
    // Load existing reminders
    const reminders = await loadReminders();
    
    // Create new reminder
    const newReminder = {
      id: generateId(),
      title: title.trim(),
      hour,
      minute,
      repeat,
      notificationId: null,
      createdAt: new Date().toISOString(),
    };
    
    // Schedule notification
    const notificationId = await scheduleNotification(newReminder);
    newReminder.notificationId = notificationId;
    
    // Add to list
    reminders.push(newReminder);
    
    // Save to storage
    await saveReminders(reminders);
    
    console.log('✅ Reminder saved:', newReminder.title);
    
    return { success: true, reminder: newReminder };
  } catch (error) {
    console.error('Error saving reminder:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update an existing reminder
 */
export const updateReminder = async (id, reminderData) => {
  try {
    const { title, hour, minute, repeat } = reminderData;
    
    // Validate input
    const validation = validateReminder(title, hour, minute);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    
    // Load existing reminders
    const reminders = await loadReminders();
    
    // Find reminder
    const index = reminders.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, error: 'Reminder tidak ditemukan' };
    }
    
    const oldReminder = reminders[index];
    
    // Cancel old notification
    if (oldReminder.notificationId) {
      await cancelNotification(oldReminder.notificationId);
    }
    
    // Update reminder
    const updatedReminder = {
      ...oldReminder,
      title: title.trim(),
      hour,
      minute,
      repeat,
      updatedAt: new Date().toISOString(),
    };
    
    // Schedule new notification
    const notificationId = await scheduleNotification(updatedReminder);
    updatedReminder.notificationId = notificationId;
    
    // Update in list
    reminders[index] = updatedReminder;
    
    // Save to storage
    await saveReminders(reminders);
    
    console.log('✅ Reminder updated:', updatedReminder.title);
    
    return { success: true, reminder: updatedReminder };
  } catch (error) {
    console.error('Error updating reminder:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a reminder
 */
export const deleteReminder = async (id) => {
  try {
    // Load existing reminders
    const reminders = await loadReminders();
    
    // Find reminder
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) {
      return { success: false, error: 'Reminder tidak ditemukan' };
    }
    
    // Cancel notification
    if (reminder.notificationId) {
      await cancelNotification(reminder.notificationId);
    }
    
    // Remove from list
    const updatedReminders = reminders.filter(r => r.id !== id);
    
    // Save to storage
    await saveReminders(updatedReminders);
    
    console.log('✅ Reminder deleted:', reminder.title);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all reminders
 */
export const getAllReminders = async () => {
  try {
    const reminders = await loadReminders();
    // Sort by time
    return reminders.sort((a, b) => {
      if (a.hour !== b.hour) return a.hour - b.hour;
      return a.minute - b.minute;
    });
  } catch (error) {
    console.error('Error getting reminders:', error);
    return [];
  }
};

/**
 * Get a single reminder by ID
 */
export const getReminder = async (id) => {
  try {
    const reminders = await loadReminders();
    return reminders.find(r => r.id === id);
  } catch (error) {
    console.error('Error getting reminder:', error);
    return null;
  }
};
