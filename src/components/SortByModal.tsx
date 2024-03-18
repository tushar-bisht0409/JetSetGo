import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Colors } from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sortByFilter } from '../data/filters';

interface Props {
    visible: boolean;
    sortBy: string;
    setSortBy: (str: string) => void;
  onClose: () => void;
  applyFilters: () => void;
}

const SortByModal: React.FC<Props> = ({ visible, sortBy, setSortBy, onClose, applyFilters }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
      <View style={styles.topBar}>
          <Text style={styles.title}>Sort By</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors.primary}/>
          </TouchableOpacity>
        </View>

        <FlatList
      data={sortByFilter}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=> setSortBy(item)} style={styles.optionBox}>
          <Text style={styles.option}>{item}</Text>
          {sortBy === item ? <Ionicons name="checkbox" size={24} color={Colors.primary}/> : <Ionicons name="square-outline" size={24} color={Colors.primary}/>}

        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
    />

        </View>
        <TouchableOpacity style={styles.doneButton} onPress={applyFilters} >
        <Text style={styles.doneButtonText}>Apply</Text>
        </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
      modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: Colors.darkPrimary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      },
      topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkTertiary,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.tertiary,
      },
      closeButton: {
        paddingHorizontal: 10,
      },
      optionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
      },
      option:{
        fontSize: 16,
        color: Colors.tertiary,
      },
      doneButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        paddingVertical: 16,
        marginHorizontal: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
      },
      doneButtonText: {
        fontSize: 16,
        color: Colors.tertiary,
      }
});

export default SortByModal;
