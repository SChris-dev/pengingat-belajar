import React, { createContext, useState, useEffect } from 'react';
import * as reminderService from '../services/reminderService';
import { requestPermissions } from '../services/notificationService';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Load reminders on mount
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🚀 Initializing app...');
      
      // Request notification permissions
      const granted = await requestPermissions();
      setPermissionGranted(granted);
      
      if (granted) {
        console.log('✅ Notification permission granted');
      } else {
        console.log('⚠️ Notification permission denied');
      }
      
      await loadReminders();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReminders = async () => {
    try {
      const data = await reminderService.getAllReminders();
      setReminders(data);
      console.log('📚 Loaded reminders:', data.length);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const addReminder = async (reminderData) => {
    try {
      const result = await reminderService.saveReminder(reminderData);
      if (result.success) {
        await loadReminders();
        return { success: true, reminder: result.reminder };
      }
      return result;
    } catch (error) {
      console.error('Error adding reminder:', error);
      return { success: false, error: error.message };
    }
  };

  const editReminder = async (id, reminderData) => {
    try {
      const result = await reminderService.updateReminder(id, reminderData);
      if (result.success) {
        await loadReminders();
        return { success: true, reminder: result.reminder };
      }
      return result;
    } catch (error) {
      console.error('Error editing reminder:', error);
      return { success: false, error: error.message };
    }
  };

  const removeReminder = async (id) => {
    try {
      const result = await reminderService.deleteReminder(id);
      if (result.success) {
        await loadReminders();
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Error removing reminder:', error);
      return { success: false, error: error.message };
    }
  };

  const getReminder = async (id) => {
    try {
      return await reminderService.getReminder(id);
    } catch (error) {
      console.error('Error getting reminder:', error);
      return null;
    }
  };

  const value = {
    reminders,
    loading,
    permissionGranted,
    addReminder,
    editReminder,
    removeReminder,
    getReminder,
    refreshReminders: loadReminders,
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
};
