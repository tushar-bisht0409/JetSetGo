import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../utils/colors';


interface SnackbarProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}
const height = Dimensions.get('window').height;

const Snackbar: React.FC<SnackbarProps> = ({ message, visible, onClose }) => {

    useEffect(() => {
        if (visible) {
          const timeout = setTimeout(() => {
            onClose();
          }, 3000);
    
          return () => clearTimeout(timeout);
        }
      }, [visible]);

  return (
    visible && (
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.errorColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    top: height*0.85,
    left: 20,
    right: 20,
    elevation: 20,
  },
  message: {
    color: Colors.tertiary,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    color: Colors.darkPrimary,
  },
});

export default Snackbar;
