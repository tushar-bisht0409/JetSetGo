import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../utils/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../types/searchData';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../utils/format';
import ResultCard from '../components/ResultCard';
import FiltersModal from '../components/FiltersModal';
import SortByModal from '../components/SortByModal';
import { fetchFlightData } from '../apis/rest_apis';
import { FlightData } from '../types/flightData';
import { filterAndSortByFlightData, filterFlightsByAircraftModel, filterFlightsByAirline, filterFlightsByDepartureTime, filterFlightsByOriginAndDestination, sortFlightsByArrivalTime, sortFlightsByDepartureTime, sortFlightsByDuration, sortFlightsByPrice } from '../utils/filterFunctions';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native';

const ResultScreen: React.FC = () => {

  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

    const searchData = useSelector((state: RootState) => state.data);
    const navigation = useNavigation();
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [sortbyModalOpen, setSortbyModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Recommended');
    const [byArrival, setByArrival] = useState(false);
    const [startHour, setStartHour] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [aircraft, setAircraft] = useState('');
    const [airline, setAirline] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [flightData, setFlightData] = useState<FlightData[]>([]);
    const [filteredData, setFilteredData] = useState<FlightData[]>([]);

    const [isError, setIsError] = useState(false);

    useEffect(() => {
      getData();
    }, []);
  
    async function getData () {
      try {
        setIsError(false);
        const newData = await fetchFlightData();
        // const finalData = filterFlightsByOriginAndDestination(newData,searchData.origin,searchData.destination);
        // setFlightData(finalData);
        // setFilteredData(finalData);
        setFlightData(newData);
        setFilteredData(newData);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    function applyFilters () {
      setFilteredData(filterAndSortByFlightData(flightData, byArrival, startHour, endHour, aircraft, airline, sortBy));
      setFilterModalOpen(false);
      setSortbyModalOpen(false);
    }

    function clearFilter() {
      setSortBy('Recommended');
      setByArrival(false);
      setStartHour(0);
      setEndHour(0);
      setAircraft('');
      setAirline('');
      setFilterModalOpen(false);
      setSortbyModalOpen(false);
      setFilteredData(flightData);
    }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.centerContent}>
          <Text style={styles.centerText1}>{searchData.origin}</Text>
          <View style={styles.lineStyle}></View>
          <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="airplane" size={20} color={Colors.primary} />
          </View>
          <View style={styles.lineStyle}></View>
          <Text style={styles.centerText2}>{searchData.destination}</Text>
        </View>
      </View>

      <View style={styles.subHead}>
      <Text style={styles.subHeadText}>{formatDate(searchData.date)}</Text>
      <View style={styles.subHeadDot}></View>
      <Text style={styles.subHeadText}>{searchData.travellers} {searchData.travellers === 1 ? 'Traveller' : 'Travellers'}</Text>
      </View>

      {isError? <View style={styles.errorView}>
        <Text style={styles.errorText}>An Error Occured!</Text>
        <TouchableOpacity style={styles.errorButton} onPress={()=>{getData()}}>
          <Text style={styles.errorButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View> : isLoading ? <Animated.View style={[styles.rotateView, { transform: [{ rotate: spin }] }]} >
      <MaterialCommunityIcons name="airplane" size={30} color={Colors.primary} />
      </Animated.View> : filteredData.length === 0 ? <Text style={styles.noResults}>No Search Results Here</Text> :
      <FlatList
      contentContainerStyle={{ paddingBottom: 80 }}
      data={filteredData}
      renderItem={({item})=> <ResultCard data={item}/>}
      />}

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={()=> setFilterModalOpen(true)} style={styles.iconContainer}>
          <FontAwesome name="filter" size={24} color="white" />
          <Text style={styles.buttonText}>Filter</Text>
          <FiltersModal visible={filterModalOpen} onClose={() => setFilterModalOpen(false)} applyFilter={applyFilters} clearFilter={clearFilter} byArrival={byArrival} setByArrival={(str)=> setByArrival(str)} startHour={startHour} setStartHour={(str)=> setStartHour(str)} endHour={endHour} setEndHour={(str)=> setEndHour(str)} aircraft={aircraft} setAircraft={(str)=> setAircraft(str)} airline={airline} setAirline={(str)=> setAirline(str)}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setSortbyModalOpen(true)} style={styles.iconContainer}>
          <MaterialCommunityIcons name="sort" size={24} color="white" />
          <Text style={styles.buttonText}>Sort By</Text>
          <SortByModal visible={sortbyModalOpen} sortBy={sortBy} setSortBy={(str)=> setSortBy(str)} onClose={() => setSortbyModalOpen(false)} applyFilters={applyFilters}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  centerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText1: {
    marginRight: 30,
    fontSize: 18,
    color: Colors.tertiary
  },
  centerText2: {
    marginLeft: 30,
    fontSize: 18,
    color: Colors.tertiary
  },
  lineStyle:{
    borderWidth: 1,
    borderColor: Colors.tertiary,
    width: 20,
    borderRadius: 10,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  subHead: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 20
  },
  subHeadDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.secondary,
    marginHorizontal: 20
  },
  subHeadText: {
    fontSize: 12,
    color: Colors.secondary
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    backgroundColor: Colors.primary,
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  rotateView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 300,
    backgroundColor: Colors.tertiary,
  },
  noResults: {
    fontSize: 20,
    color: Colors.secondary,
    marginTop: 300,
    textAlign: 'center'
  },
  errorView: {
    alignSelf: 'center',
    marginTop: 300,

  },
  errorText: {
    fontSize: 16,
    color: Colors.secondary,
    textAlign: 'center'
  },
  errorButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.tertiary,
    marginTop: 10,
    padding: 10
  },
  errorButtonText: {
    color: Colors.tertiary,
    alignSelf: 'center'
  }
});

export default ResultScreen;
