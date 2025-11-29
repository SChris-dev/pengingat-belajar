import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useReminders } from '../hooks/useReminders';
import { COLORS } from '../../utils/constants';
import { formatTime } from '../../utils/helpers';

const AddReminderScreen = ({ navigation }) => {
  const { addReminder } = useReminders();
  
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTimeChange = (event, date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = async () => {
    if (saving) return;

    // Clear previous errors
    setErrors({});

    // Validate
    if (!title.trim()) {
      setErrors({ title: 'Judul tidak boleh kosong' });
      return;
    }

    setSaving(true);

    const reminderData = {
      title: title.trim(),
      hour: selectedDate.getHours(),
      minute: selectedDate.getMinutes(),
      repeat,
    };

    const result = await addReminder(reminderData);

    setSaving(false);

    if (result.success) {
      Alert.alert(
        'Berhasil!',
        'Pengingat telah ditambahkan',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert(
        'Gagal',
        result.error || 'Terjadi kesalahan saat menyimpan pengingat'
      );
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Pengingat</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Judul Pengingat *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Contoh: Belajar Matematika"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
        </View>

        {/* Time Picker */}
        <View style={styles.section}>
          <Text style={styles.label}>Jam Pengingat *</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeButtonIcon}>🕐</Text>
            <Text style={styles.timeButtonText}>
              {formatTime(selectedDate.getHours(), selectedDate.getMinutes())}
            </Text>
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Repeat Options */}
        <View style={styles.section}>
          <Text style={styles.label}>Pengulangan</Text>
          <View style={styles.repeatContainer}>
            <TouchableOpacity
              style={[styles.repeatButton, repeat && styles.repeatButtonActive]}
              onPress={() => setRepeat(true)}
            >
              <Text style={[styles.repeatButtonText, repeat && styles.repeatButtonTextActive]}>
                🔁 Harian
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.repeatButton, !repeat && styles.repeatButtonActive]}
              onPress={() => setRepeat(false)}
            >
              <Text style={[styles.repeatButtonText, !repeat && styles.repeatButtonTextActive]}>
                📅 Sekali Saja
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.hintText}>
            {repeat
              ? 'Pengingat akan muncul setiap hari pada waktu yang sama'
              : 'Pengingat hanya akan muncul satu kali'}
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            Data tersimpan secara lokal dan tetap ada meskipun aplikasi ditutup.
          </Text>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Menyimpan...' : '✓ Simpan Pengingat'}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
  timeButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  timeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  repeatContainer: {
    flexDirection: 'row',
  },
  repeatButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    marginHorizontal: 6,
  },
  repeatButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#6366f110',
  },
  repeatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  repeatButtonTextActive: {
    color: COLORS.primary,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: '#6366f110',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.dark,
    lineHeight: 18,
  },
  footer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddReminderScreen;
