import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cities } from '../data/cities';
import { Colors } from '../utils/colors';

interface SearchScreenModalProps {
  visible: boolean;
  origin: string;
  destination: string;
  mode: string;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const SearchScreenModal: React.FC<SearchScreenModalProps> = ({ visible, origin, destination, mode, onClose, onSelectCity }) => {
  const [searchText, setSearchText] = useState('');
  const removeCity = mode === 'from' ? destination : origin;
  const newCities = cities.filter(item => item.city !== removeCity);

  let filteredCities = newCities.filter(city =>
    city.city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
            <View style={styles.topBartop}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{`Select ${mode === 'from' ? 'Origin' : 'Destination'} City`}</Text>
            </View>
            <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Enter City"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
        </View>
        </View>
        
        <View style={styles.body}>
          { filteredCities.map(city => (
            <TouchableOpacity key={city.id} style={styles.cityItem} onPress={() => {onSelectCity(city.city); onClose();} }>
              <Text style={styles.cityText}>{city.city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkPrimary,
  },
  topBar: {
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    padding: 16,
  },
  topBartop: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderRadius: 10
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cityItem: {
    paddingVertical: 8,
  },
  cityText: {
    fontSize: 18,
    color: Colors.tertiary,
    width: '100%'
  },
});

export default SearchScreenModal;
