import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from '../utils/colors';
import globalStyles from '../utils/globalStyles';
import { localize } from '../utils/localization';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ourServices } from '../data/ourServices';
import HomeCardSection from '../components/HomeCardSection';
import { ourProducts } from '../data/ourProducts';
import SelectDateCalendar from '../components/SelectDateCalendar';
import SelectTravelersModal from '../components/SelectTravelersModal';
import SearchScreenModal from '../components/SearchScreenModal';
import { saveSearchData } from '../actions/actions';
import { useDispatch } from 'react-redux';
import { useNavigation, ParamListBase} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Snackbar from '../components/SnackBar';

const HomeScreen: React.FC = () => {

  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();



  const handleSearchData = () => {
    if(selectedOrigin === '' || selectedDestination === '' || selectedAdults+selectedChildren+selectedInfants === 0 || selectedDate === ''){
      setSnackbarVisible(true);
    } else{
    const data = {
      origin: selectedOrigin,
      destination: selectedDestination,
      travellers: selectedAdults+selectedChildren+selectedInfants,
      date: selectedDate,
    };
    dispatch(saveSearchData(data));
    navigate('ResultScreen');
  }
  };

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleOpenCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAdults, setSelectedAdults] = useState(0);
  const [selectedChildren, setSelectedChildren] = useState(0);
  const [selectedInfants, setSelectedInfants] = useState(0);

  const handleTravelersSelect = (adults: number, children: number, infants: number) => {
    setSelectedAdults(adults);
    setSelectedChildren(children);
    setSelectedInfants(infants);
    setModalVisible(false);
  };

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [mode, setMode] = useState('from');


  const handleSelectCity = (city: string) => {
    if(mode === "from") {
      setSelectedOrigin(city);
    } else {
      setSelectedDestination(city)
    }
    setModalVisible(false);
  };

  const [snackbarVisible, setSnackbarVisible] = useState(false);


  return (
    <ScrollView style={styles.container}>

      <View style={styles.topBar}>
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
        <Text style={[styles.profileName, globalStyles.text]}>{localize('hi')}, John</Text>
      </View>
      <MaterialCommunityIcons name='bell-outline' size={24} color={Colors.tertiary} />
      </View>

      <View style={styles.headingSection}>
        <Text style={[styles.headingText, globalStyles.text]}>{localize('welcomeMessage')}</Text>
      </View>

      <View style={styles.inputSection}>
        <TouchableOpacity onPress={() => {setMode('from'); setSearchModalVisible(true)}}>
        <Text style={[styles.inputField, globalStyles.text, selectedOrigin === '' ? {color: Colors.placeHolder} : {color: Colors.tertiary}]}>{selectedOrigin === '' ? 'From' : selectedOrigin}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{let o = selectedOrigin; setSelectedOrigin(selectedDestination); setSelectedDestination(o);}} style={styles.swap}>
          <MaterialCommunityIcons name='swap-vertical-circle' size={28} color={Colors.darkPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setMode('to'); setSearchModalVisible(true)}}>
        <Text style={[styles.inputField, globalStyles.text, selectedDestination === '' ? {color: Colors.placeHolder} : {color: Colors.tertiary}]}>{selectedDestination === '' ? 'To' : selectedDestination}</Text>
        </TouchableOpacity>
        <SearchScreenModal
        visible={searchModalVisible}
        mode={mode}
        origin={selectedOrigin}
        destination={selectedDestination}
        onClose={() => setSearchModalVisible(false)}
        onSelectCity={handleSelectCity}
      />
        <View style={styles.inputSectionRow}>
          <TouchableOpacity onPress={handleOpenCalendar} style={[styles.inputSectionRowItem1, styles.inputField]}>
          <AntDesign size={24} color={Colors.placeHolder} name="calendar" />
          {selectedDate === '' ?<Text style={styles.inputSectionRowItemText}>Date</Text> : <Text style={styles.inputSectionRowItemText2}>{selectedDate}</Text>}
          <SelectDateCalendar
        visible={isCalendarVisible}
        onClose={handleCloseCalendar}
        onDateSelect={handleDateSelect}
      />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.inputSectionRowItem2, styles.inputField]}>
          <MaterialCommunityIcons size={24} color={Colors.placeHolder} name="account-outline" />
          {selectedAdults === 0 ?<Text style={styles.inputSectionRowItemText}>Traveller(s)</Text> : <Text style={styles.inputSectionRowItemText2}>{selectedAdults+selectedChildren+selectedInfants} {selectedAdults+selectedChildren+selectedInfants === 1 ? 'Traveller' : 'Travellers'}</Text>}
          <SelectTravelersModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onTravelersSelect={handleTravelersSelect}
      />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSearchData}>
          <Text style={styles.submitButtonText}>Search flights</Text>
        </TouchableOpacity>
      </View>

      <HomeCardSection heading='Our Products' data={ourProducts}/>

      <HomeCardSection heading='Our Services' data={ourServices}/>

      <Snackbar message='Please Fill All the Fields' visible={snackbarVisible} onClose={()=> setSnackbarVisible(false)}/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    objectFit:'cover'
  },
  profileName: {
    fontSize: 18,
  },
  headingSection: {
    marginTop: 20,
  },
  headingText: {
    fontSize: 24,
  },
  inputSection: {
    marginTop: 20,
  },
  inputField: {
    borderWidth: 0,
    backgroundColor: Colors.darkSecondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  swap: {
    borderRadius: 14,
    width: 28,
    height: 28,
    position: 'absolute',
    alignSelf: 'center',
    top: 34,
    zIndex: 10,
    backgroundColor: Colors.placeHolder
  },
  inputSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  inputSectionRowItem1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    flex: 1,
    marginRight: 2.5
  },

  inputSectionRowItem2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    flex: 1,
    marginLeft: 2.5
  },

  inputSectionRowItemText: {
    color: Colors.placeHolder,
    marginLeft: 10,
    fontSize: 16
  },

  inputSectionRowItemText2: {
    color: Colors.tertiary,
    marginLeft: 10,
    fontSize: 16
  },

  openModalButton: {
    marginLeft: 5,
    flex: 1,
    borderWidth: 0,
    backgroundColor: Colors.darkSecondary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  openModalButtonText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: Colors.tertiary,
  },
});

export default HomeScreen;

