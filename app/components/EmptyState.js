import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📚</Text>
      <Text style={styles.title}>Belum Ada Pengingat</Text>
      <Text style={styles.subtitle}>
        Tambahkan pengingat belajar pertamamu!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default EmptyState;
