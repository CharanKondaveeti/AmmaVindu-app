import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Swipeable} from 'react-native-gesture-handler';

const sampleDebts = [
  {
    id: '1',
    user: {name: 'Ramesh Kumar', phone: '+91 9876543210'},
    amount: 1500,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '2',
    user: {name: 'Sita Devi', phone: '+91 9123456780'},
    amount: -1200,
    type: 'not paid',
    date: '2025-04-10',
  },
  {
    id: '3',
    user: {name: 'Anil Singh', phone: '+91 9988776655'},
    amount: 2000,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '4',
    user: {name: 'Priya Mehta', phone: '+91 9012345678'},
    amount: -850,
    type: 'not paid',
    date: '2025-04-10',
  },
  {
    id: '5',
    user: {name: 'Rahul Verma', phone: '+91 8765432190'},
    amount: 1800,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '6',
    user: {name: 'Neha Sharma', phone: '+91 9234567810'},
    amount: -950,
    type: 'not paid',
    date: '2025-04-10',
  },
  {
    id: '7',
    user: {name: 'Deepa Rani', phone: '+91 8899776655'},
    amount: 2200,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '8',
    user: {name: 'Karan Patel', phone: '+91 9988123456'},
    amount: -600,
    type: 'not paid',
    date: '2025-04-10',
  },
  {
    id: '9',
    user: {name: 'Mohit Rana', phone: '+91 9871122334'},
    amount: 1350,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '10',
    user: {name: 'Shalini Gupta', phone: '+91 9745632187'},
    amount: -700,
    type: 'not paid',
    date: '2025-04-10',
  },
  {
    id: '11',
    user: {name: 'Aarti Joshi', phone: '+91 9665544332'},
    amount: -450,
    type: 'not paid',
    date: '2025-04-02',
  },
  {
    id: '12',
    user: {name: 'Mohit Rana', phone: '+91 9871122334'},
    amount: 1100,
    type: 'paid',
    date: '2025-04-10',
  },
  {
    id: '13',
    user: {name: 'Shalini Gupta', phone: '+91 9745632187'},
    amount: -700,
    type: 'not paid',
    date: '2025-04-11',
  },
  {
    id: '14',
    user: {name: 'Arjun Kapoor', phone: '+91 9833445566'},
    amount: 900,
    type: 'paid',
    date: '2025-04-12',
  },
  {
    id: '15',
    user: {name: 'Komal Singh', phone: '+91 9123456712'},
    amount: -800,
    type: 'not paid',
    date: '2025-04-13',
  },
  {
    id: '16',
    user: {name: 'Yash Agarwal', phone: '+91 9988771122'},
    amount: 1350,
    type: 'paid',
    date: '2025-04-14',
  },
  {
    id: '17',
    user: {name: 'Pooja Mishra', phone: '+91 9765432180'},
    amount: -950,
    type: 'not paid',
    date: '2025-04-15',
  },
  {
    id: '18',
    user: {name: 'Rohit Jain', phone: '+91 9090909090'},
    amount: 2100,
    type: 'paid',
    date: '2025-04-16',
  },
  {
    id: '19',
    user: {name: 'Tanvi Desai', phone: '+91 9654321098'},
    amount: -300,
    type: 'not paid',
    date: '2025-04-17',
  },
  {
    id: '20',
    user: {name: 'Vivek Nair', phone: '+91 9988123412'},
    amount: 1700,
    type: 'paid',
    date: '2025-04-18',
  },
];

const DebtorsCalendar = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [debts, setDebts] = useState(sampleDebts);

  const filteredDebts = debts.filter(debt => debt.date === selectedDate);

  const handleMarkAsPaid = item => {
    console.log('Marked as paid:', item);
  };

  const handleMarkAsUnpaid = item => {
    console.log('Marked as unpaid:', item);
  };

  const renderLeftActions = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0.8, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.swipeBackground, {backgroundColor: '#FF6B6B'}]}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          Unpaid
        </Animated.Text>
      </View>
    );
  };

  const renderRightActions = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={[
          styles.swipeBackground,
          {backgroundColor: '#4CAF50', alignItems: 'flex-end'},
        ]}>
        <Animated.Text
          style={[styles.actionText, {transform: [{scale}], marginRight: 20}]}>
          Paid
        </Animated.Text>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Swipeable
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, item)
      }
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }
      onSwipeableLeftOpen={() => handleMarkAsUnpaid(item)}
      onSwipeableRightOpen={() => handleMarkAsPaid(item)}>
      <View style={styles.card}>
        <View>
          <Text style={styles.name}>{item.user.name}</Text>
          <Text style={styles.phone}>{item.user.phone}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text
            style={[
              styles.amount,
              {color: item.amount > 0 ? '#4CAF50' : '#FF6B6B'},
            ]}>
            {item.amount > 0
              ? `+₹${item.amount}`
              : `-₹${Math.abs(item.amount)}`}
          </Text>
          <Text style={styles.type}>
            {item.type === 'received'
              ? 'Paid' : 'Not Paid'}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#ffffff',
            dotColor: '#ffffff',
            customStyles: {
              container: {
                backgroundColor: '#fff',
              },
              text: {
                color: '#4526ab',
                fontWeight: 'bold',
              },
            },
          },
        }}
        theme={{
          backgroundColor: '#4526ab',
          calendarBackground: '#4526ab',
          textSectionTitleColor: '#fff',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          selectedDayBackgroundColor: '#fff',
          selectedDayTextColor: '#4526ab',
          todayTextColor: '#FFD700',
          arrowColor: '#fff',
          textDisabledColor: '#aaa',
        }}
        style={styles.calendar}
      />

      <FlatList
        data={filteredDebts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noData}>No debts for this date.</Text>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor:'#fff',
  },
  calendar: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phone: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#777',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 16,
  },
  swipeBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DebtorsCalendar;
