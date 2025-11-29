import { useContext } from 'react';
import { ReminderContext } from '../context/ReminderContext';

/**
 * Custom hook untuk mengakses reminder context
 */
export const useReminders = () => {
  const context = useContext(ReminderContext);
  
  if (!context) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  
  return context;
};
