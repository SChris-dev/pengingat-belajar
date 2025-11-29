// Helper functions
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const formatTime = (hour, minute) => {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const validateReminder = (title, hour, minute) => {
  const errors = {};
  
  if (!title || title.trim() === '') {
    errors.title = 'Judul tidak boleh kosong';
  }
  
  if (hour < 0 || hour > 23) {
    errors.hour = 'Jam tidak valid (0-23)';
  }
  
  if (minute < 0 || minute > 59) {
    errors.minute = 'Menit tidak valid (0-59)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
