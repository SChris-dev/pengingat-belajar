import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useReminders } from '../hooks/useReminders';
import ReminderCard from '../components/ReminderCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS } from '../../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { reminders, loading, removeReminder, permissionGranted } = useReminders();

  const handleAddPress = () => {
    navigation.navigate('AddReminder');
  };

  const handleCardPress = (reminder) => {
    navigation.navigate('EditReminder', { reminderId: reminder.id });
  };

  const handleDelete = async (id) => {
    const result = await removeReminder(id);
    if (!result.success) {
      alert('Gagal menghapus pengingat: ' + (result.error || 'Unknown error'));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pengingat Belajar</Text>
          <Text style={styles.headerSubtitle}>
            {reminders.length} pengingat aktif
          </Text>
        </View>
        <Text style={styles.headerIcon}>📚</Text>
      </View>

      {/* Permission Status */}
      {permissionGranted ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            ✅ Notifikasi aktif! Pengingat akan muncul sesuai jadwal.
          </Text>
        </View>
      ) : (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ Izin notifikasi belum diberikan. Buka Settings untuk mengaktifkan.
          </Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {reminders.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ReminderCard
                reminder={item}
                onPress={handleCardPress}
                onDelete={handleDelete}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 4,
  },
  headerIcon: {
    fontSize: 40,
  },
  successContainer: {
    backgroundColor: '#10b98115',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  successText: {
    fontSize: 12,
    color: COLORS.dark,
    lineHeight: 18,
  },
  warningContainer: {
    backgroundColor: '#f59e0b15',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  warningText: {
    fontSize: 12,
    color: COLORS.dark,
    lineHeight: 18,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
