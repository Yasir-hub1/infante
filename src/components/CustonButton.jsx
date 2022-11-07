import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, padding }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { padding: padding }]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#41D0D1',
    borderRadius: 10,
    marginBottom: 30,
    width:105,
    height:42,
    paddingHorizontal: 5,

  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
  },
});
