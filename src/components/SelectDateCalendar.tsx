import React, { useState } from 'react';
import { View, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../utils/colors';
import { Text } from 'react-native';

interface SelectDateCalendarProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

const SelectDateCalendar: React.FC<SelectDateCalendarProps> = ({
  visible,
  onClose,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleDone = () => {
    onDateSelect(selectedDate);
    onClose();
  };

  const minDate = new Date();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View style={{ backgroundColor: Colors.darkPrimary, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <Calendar
          onDayPress={onDayPress}
          minDate={minDate.toString()}
          markedDates={{ [selectedDate]: { selected: true } }}
          theme={{
            calendarBackground: Colors.darkPrimary,
            todayTextColor: Colors.primary,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.tertiary,
            arrowColor: Colors.primary,
            textDisabledColor: Colors.placeHolder,
            textInactiveColor: Colors.tertiary,
            dayTextColor: Colors.tertiary,
            monthTextColor: Colors.secondary,
            agendaDayTextColor: Colors.primary
          }}
        />
        <TouchableOpacity style={styles.doneButton} onPress={handleDone} >
        <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default SelectDateCalendar;
