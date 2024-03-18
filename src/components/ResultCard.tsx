import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../utils/colors';
import { airline } from '../data/airline';
import Entypo from 'react-native-vector-icons/Entypo';
import { formatTime } from '../utils/format';
import { FlightData } from '../types/flightData';

interface ResultCardProps {
  data: FlightData;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {

  return (
    <View style={styles.cardSection}>
        <View style={styles.top}>
        <Image source={{ uri: airline[data.airline]}} style={styles.image} />
        <View style={styles.timeBox}>
        <View style={styles.timeBoxUp}>
            <Text style={styles.timeText}>{data.departureTime.split('T')[1].substring(0,5)}</Text>
            <Text style={styles.timeTextDuration}>{formatTime(data.duration)}</Text>            
            <Text style={styles.timeText}>{data.arrivalTime.split('T')[1].substring(0,5)}</Text>
            </View>
            <View style={styles.timeBoxDown}>
          <Entypo name='circle' size={10} color={Colors.darkTertiary}/>
          <View style={styles.lineStyle}></View>
          <Entypo name='circle' size={10} color={Colors.darkTertiary}/>
          </View>
        </View>
        <Text style={styles.price}>₹{data.price}</Text>
        </View>

        <View style={styles.center}>
          <View style={styles.centerBox}>
          <Text style={styles.centerTitle}>Aircraft</Text>
            <Text style={styles.centerText}>{data.aircraft}</Text>
          </View>
          <View style={styles.centerBox}>
          <Text style={styles.centerTitle}>Flight</Text>
            <Text style={styles.centerText}>{data.airline} | {data.flightNumber}</Text>
          </View>
          <View style={styles.centerBox}>
          <Text style={styles.centerTitle}>Seats</Text>
            <Text style={styles.centerText}>{data.seatsAvailable}</Text>
          </View>
        </View>

        <View style={styles.action}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.button1Text}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
          <Text style={styles.button2Text}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    cardSection: {
        marginTop: 20,
        backgroundColor: Colors.darkSecondary,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 10,
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',


      },
      top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      image: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
        objectFit: 'cover'
      },
      timeBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      timeBoxUp: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      timeBoxDown: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      timeText: {
        color: Colors.tertiary,
        fontSize: 16,
        fontWeight: 'bold',
      },
      timeTextDuration: {
        color: Colors.secondary,
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 50
      },
      lineStyle:{
        borderWidth: 1,
        borderColor: Colors.darkTertiary,
        width: 180,
        borderRadius: 10,
      },
      price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.price,
        marginLeft: 10
      },
      center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 30
      },
      centerBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        
      },
      centerTitle: {
        color: Colors.placeHolder,
        fontSize: 12,
        marginBottom: 5
      },
      centerText: {
        color: Colors.secondary,
        fontSize: 14,
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
});

export default ResultCard;
