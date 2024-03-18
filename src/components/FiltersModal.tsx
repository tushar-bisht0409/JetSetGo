import React, { useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../utils/colors';
import { airLineArray, aircrafts } from '../data/airline';
import { ScrollView } from 'react-native-gesture-handler';


interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  applyFilter: () => void;
  clearFilter: () => void;
  byArrival: boolean;
  setByArrival: (str: boolean) => void;
  startHour: number;
  setStartHour: (str: number) => void;
  endHour: number;
  setEndHour: (str: number) => void;
  aircraft: string;
  setAircraft: (str: string) => void;
  airline: string;
  setAirline: (str: string) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ visible, onClose, applyFilter, clearFilter, byArrival, setByArrival, startHour, setStartHour, endHour, setEndHour, aircraft, setAircraft, airline, setAirline }) => {
  const [timeMode, setTimeMode] = useState('');

  useEffect(()=>{
    if(startHour+endHour === 6){
      setTimeMode('sunrise');
    } else if(startHour+endHour === 18){
      setTimeMode('sun');
    } else if(startHour+endHour === 30){
      setTimeMode('sunset');
    } else if(startHour+endHour === 42){
      setTimeMode('moon');
    }
  },[])

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.topBar}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors.primary}/>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.sectionOne}>
            <TouchableOpacity onPress={()=> setByArrival(false)} style={[styles.button, !byArrival ? styles.activeButton: {}]}>
            <FontAwesome5 name="plane-departure" size={24} color="white" />
              <Text style={styles.buttonText}>Departure</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setByArrival(true)} style={[styles.button, byArrival ? styles.activeButton: {}]}>
            <FontAwesome5 name="plane-arrival" size={24} color="white" />
              <Text style={styles.buttonText}>Arrival</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionTwo}>
            <TouchableOpacity onPress={()=>{setTimeMode('sunrise'); setStartHour(0); setEndHour(6)}} style={[styles.button]}>
            <Feather name="sunrise" size={24} color={timeMode === "sunrise" ? Colors.primary : "white"} />
              <Text style={[styles.buttonText2, timeMode === 'sunrise' ? styles.activeButton2 : {}]}>Before 6AM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setTimeMode('sun'); setStartHour(6); setEndHour(12)}} style={[styles.button]}>
            <Feather name="sun" size={24} color={timeMode === "sun" ? Colors.primary : "white"} />
              <Text style={[styles.buttonText2, timeMode === 'sun' ? styles.activeButton2 : {}]}>6AM-12PM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setTimeMode('sunset'); setStartHour(12); setEndHour(18)}} style={[styles.button]}>
            <Feather name="sunset" size={24} color={timeMode === "sunset" ? Colors.primary : "white"} />
              <Text style={[styles.buttonText2, timeMode === 'sunset' ? styles.activeButton2 : {}]}>12PM-6PM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setTimeMode('moon'); setStartHour(18); setEndHour(24)}} style={[styles.button]}>
            <Feather name="moon" size={24} color={timeMode === "moon" ? Colors.primary : "white"} />
              <Text style={[styles.buttonText2, timeMode === 'moon' ? styles.activeButton2 : {}]}>After 6PM</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subHead}>Aircraft Model</Text>
          <View>
  {aircrafts.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => setAircraft(item)}
      style={styles.optionBox}
    >
      <Text style={styles.option}>{item}</Text>
      {aircraft === item ? (
        <Ionicons name="checkbox" size={24} color={Colors.primary} />
      ) : (
        <Ionicons name="square-outline" size={24} color={Colors.primary} />
      )}
    </TouchableOpacity>
  ))}
</View>

<Text style={styles.subHead}>Airline</Text>
<View>
  {airLineArray.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => setAirline(item)}
      style={styles.optionBox}
    >
      <Text style={styles.option}>{item}</Text>
      {airline === item ? (
        <Ionicons name="checkbox" size={24} color={Colors.primary} />
      ) : (
        <Ionicons name="square-outline" size={24} color={Colors.primary} />
      )}
    </TouchableOpacity>
  ))}
</View>

        </View>

        <View style={styles.action}>
          <TouchableOpacity onPress={clearFilter} style={styles.button1}>
            <Text style={styles.button1Text}>Clear Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={applyFilter} >
        <Text style={styles.doneButtonText}>Apply</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  body: {
    padding: 16,
  },
  sectionOne: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sectionTwo: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.tertiary,
  },
  buttonText2: {
    fontSize: 14,
    marginTop: 5,
    color: Colors.tertiary,
  },
  activeButton: {
    backgroundColor: Colors.primary,
    color: Colors.tertiary,
  },
  activeButton2: {
    color: Colors.primary,
  },
  subHead: {
    fontSize: 18,
    color: Colors.tertiary,
    fontWeight: 'bold',
    marginTop: 20
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
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20
  },
  button1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button1Text: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: 'bold'
  },
  button2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    elevation: 20
  },
  button2Text: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    color: Colors.tertiary,
  }
});

export default FiltersModal;
