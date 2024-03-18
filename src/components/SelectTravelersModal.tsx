import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

interface SelectTravelersModalProps {
  visible: boolean;
  onClose: () => void;
  onTravelersSelect: (adults: number, children: number, infants: number) => void;
}

const SelectTravelersModal: React.FC<SelectTravelersModalProps> = ({
  visible,
  onClose,
  onTravelersSelect,
}) => {
  const [selectedAdults, setSelectedAdults] = useState(1);
  const [selectedChildren, setSelectedChildren] = useState(0);
  const [selectedInfants, setSelectedInfants] = useState(0);

  const handleSelect = (type: 'adults' | 'children' | 'infants', value: number) => {
    switch (type) {
      case 'adults':
        setSelectedAdults(value);
        break;
      case 'children':
        setSelectedChildren(value);
        break;
      case 'infants':
        setSelectedInfants(value);
        break;
    }
  };

  const renderNumbers = (type: 'adults' | 'children' | 'infants') => {
    const count = type === 'adults' ? 9 : type === 'children' ? 9 : 5;
    const selectedValue =
      type === 'adults' ? selectedAdults : type === 'children' ? selectedChildren : selectedInfants;

    return Array.from({ length: count }, (_, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.numberButton,
          type === "adults" ? selectedValue === index + 1 && { backgroundColor: Colors.primary } : selectedValue === index && { backgroundColor: Colors.primary },
        ]}
        onPress={() => handleSelect(type, type === 'adults' ? index + 1 : index)}
      >
        <Text style={styles.numberButtonText}>{type === 'adults' ? index + 1 : index}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Number of Travelers</Text>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Adults (12+ yrs)</Text>
            <View style={styles.numberContainer}>{renderNumbers('adults')}</View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Children (2-12 yrs)</Text>
            <View style={styles.numberContainer}>{renderNumbers('children')}</View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Infants (0-2 yrs)</Text>
            <View style={styles.numberContainer}>{renderNumbers('infants')}</View>
          </View>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={()=>{onTravelersSelect(selectedAdults,selectedChildren,selectedInfants);}} >
        <Text style={styles.doneButtonText}>Done</Text>
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
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.tertiary,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.tertiary,
    marginBottom: 5,
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  numberButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 20,
  },
  numberButtonText: {
    fontSize: 16,
    color: Colors.tertiary,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center'
  },
  doneButtonText: {
    fontSize: 16,
    color: Colors.tertiary,
  }
});

export default SelectTravelersModal;
