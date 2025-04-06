import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  getAllDebtorsTotalDebts,
} from './api/debtors';
import {useNavigation} from '@react-navigation/native';


const AllDebtors = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [debtorsData, setDebtorsData] = useState([]);

  useEffect(() => {
    const fetchDebtors = async () => {
      try {
        const data = await getAllDebtorsTotalDebts();
        console.log('getAllDebtorsTotalDebts:', data);
        setDebtorsData(data);
      } catch (err) {
        console.error('Error fetching debtors:', err);
      }
    };

    fetchDebtors();
  }, []);
  
  const searchAnim = useState(new Animated.Value(0))[0];

 const filteredData = debtorsData.filter(item =>
   item.debtor_name.toLowerCase().includes(searchQuery.toLowerCase()),
 );

  const searchHeight = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });

  const renderItem = ({item, index}) => {
    const scaleAnim = new Animated.Value(0);

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      delay: index * 50,
      useNativeDriver: true,
    }).start();

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DebtorDetails', {
            debtorId: item.debtor_id,
            debtorName: item.debtor_name,
          })
        }>
        <View style={styles.cardContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.debtor_name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.debtor_name}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, {color: '#FF4444'}]}>
              {item.total_debt.toFixed(2)}
            </Text>
            <Text style={styles.amountLabel}>Total Debt</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search debtors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.phoneNumber}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💸</Text>
            <Text style={styles.emptyText}>No debtors found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#E8ECEF',
    borderRadius: 12,
  },
  searchToggle: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 5,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default AllDebtors;
