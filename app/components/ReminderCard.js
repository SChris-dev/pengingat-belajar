import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../utils/constants';
import { formatTime } from '../../utils/helpers';

const ReminderCard = ({ reminder, onPress, onDelete }) => {
  const { title, hour, minute, repeat } = reminder;

  const handleDelete = () => {
    Alert.alert(
      'Hapus Pengingat',
      `Apakah Anda yakin ingin menghapus "${title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => onDelete(reminder.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(reminder)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(hour, minute)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, repeat ? styles.badgeRepeat : styles.badgeOnce]}>
              <Text style={styles.badgeText}>
                {repeat ? '🔁 Harian' : '📅 Sekali'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  timeContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 12,
    minWidth: 70,
    alignItems: 'center',
    marginRight: 12,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  infoContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeRepeat: {
    backgroundColor: '#10b98120',
  },
  badgeOnce: {
    backgroundColor: '#f59e0b20',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 24,
  },
});

export default ReminderCard;
