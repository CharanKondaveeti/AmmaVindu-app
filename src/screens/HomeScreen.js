import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import supabase from './api/supabase';

const sampleUsers = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    phone: '+91 9876543210',
    debt: 1500,
  },
  {
    id: '2',
    name: 'Sita Devi',
    phone: '+91 9123456780',
    debt: 3200,
  },
  {
    id: '3',
    name: 'Anil Singh',
    phone: '+91 9988776655',
    debt: 780,
  },
];

const HomeScreen = ({navigation}) => {
  const [users, setUsers] = useState(sampleUsers);

  const totalDebt = users.reduce((sum, user) => sum + user.debt, 0);
  const collected = totalDebt * 0.4;
  const pending = totalDebt - collected;
  const collectedRatio = totalDebt ? collected / totalDebt : 0;
  const pendingRatio = totalDebt ? pending / totalDebt : 0;

  useEffect(() => {
    const fetchDebtors = async () => {
      let {data: debtors, error} = await supabase.from('debtors').select('*');
      if (error) {
        console.error('Error fetching debtors:', error);
      } else {
        console.log('Debtors fetched successfully:', debtors);
        setUsers(debtors);
      }
    };

    fetchDebtors();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.debtLabel}>Debt</Text>
        <Text style={styles.debtAmount}>₹ {item.debt}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topOptions}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('AddDebtScreen')}>
          <Text style={styles.optionText}>Add Debt</Text>
        </TouchableOpacity>
        <View style={styles.optionButton}>
          <Text style={styles.optionText}>
            Total Debt: ₹ {totalDebt}
          </Text>
        </View>
      </View>

      <View style={styles.debtorList}>
        <Text style={styles.sideHeading}>Debtors</Text>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  debtorList: {
    paddingHorizontal: 10,
  },
  sideHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
  topOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  debtLabel: {
    fontSize: 12,
    color: '#999',
  },
  debtAmount: {
    fontSize: 18,
    color: '#FF6B6B',
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    marginTop: 20,
  },
  greenBar: {
    backgroundColor: '#4ECDC4',
  },
  redBar: {
    backgroundColor: '#FF6B6B',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4ECDC4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#4ECDC4',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default HomeScreen;
