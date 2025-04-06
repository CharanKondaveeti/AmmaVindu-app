import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {getDebtorDebts, updateDebtorDebtStatus} from './api/debtors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DebtorDetails = ({route, navigation}) => {
  const {debtorId, debtorName} = route.params;

  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDebt, setTotalDebt] = useState(0);
  const [unpaidDebt, setUnpaidDebt] = useState(0);

  useEffect(() => {
    const fetchDebtorDetails = async () => {
      try {
        const data = await getDebtorDebts(debtorId);
        setDebts(data);
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        const unpaid = data
          .filter(item => !item.paid)
          .reduce((sum, item) => sum + item.amount, 0);

        setTotalDebt(total);
        setUnpaidDebt(unpaid);
      } catch (error) {
        console.error('Error fetching debtor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDebtorDetails();
  }, [debtorId]);

  const handleTogglePaidStatus = async (debtId, currentStatus) => {
    try {
      await updateDebtorDebtStatus(debtId, !currentStatus);

      const updatedDebts = debts.map(debt =>
        debt.id === debtId ? {...debt, paid: !currentStatus} : debt,
      );

      setDebts(updatedDebts);

      const total = updatedDebts.reduce((sum, item) => sum + item.amount, 0);
      const unpaid = updatedDebts
        .filter(item => !item.paid)
        .reduce((sum, item) => sum + item.amount, 0);

      setTotalDebt(total);
      setUnpaidDebt(unpaid);
    } catch (error) {
      console.error('Failed to update debt status:', error);
    }
  };

  const renderDebtItem = ({item}) => (
    <View
      style={[
        styles.card,
        item.paid ? styles.paidCard : styles.unpaidCard,
        {borderLeftWidth: 6} ,
      ]}>
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <Text style={styles.description}>{item.description}</Text>
          <Text
            style={[
              styles.amount,
              item.paid ? styles.paidAmount : styles.unpaidAmount,
            ]}>
            ₹{item.amount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.dateContainer}>
            <Icon name="event" size={14} color="#777" />
            <Text style={styles.date}>
              {new Date(item.debt_date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.statusButton,
              item.paid ? styles.paidButton : styles.unpaidButton,
            ]}
            onPress={() => handleTogglePaidStatus(item.id, item.paid)}>
            <Text style={styles.statusButtonText}>
              {item.paid ? '✓ Paid' : '● Pending'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{debtorName}'s Debts</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a90e2" />
        </View>
      ) : (
        <FlatList
          data={debts}
          keyExtractor={(item, index) =>
            item.id !== null ? item.id.toString() : index.toString()
          }
          renderItem={renderDebtItem}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryLabel}>Total Debt</Text>
                  <Text style={styles.summaryValue}>
                    ₹{totalDebt.toFixed(2)}
                  </Text>
                </View>
                <View style={[styles.summaryCard, styles.unpaidSummary]}>
                  <Text style={styles.summaryLabel}>Unpaid</Text>
                  <Text style={styles.summaryValue}>
                    ₹{unpaidDebt.toFixed(2)}
                  </Text>
                </View>
              </View>
              <Text style={styles.sectionTitle}>Transaction History</Text>
            </>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container and Header Styles
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Summary Section Styles
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  unpaidSummary: {
    backgroundColor: '#fff9f9',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
    marginBottom: 12,
    marginLeft: 16,
  },

  // List Container
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },

  // Card Styles (Updated with stunning design)
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    overflow: 'hidden',
    borderLeftWidth: 6,
  },
  paidCard: {
    borderLeftColor: '#4CAF50',
  },
  unpaidCard: {
    borderLeftColor: '#FF5722',
  },
  cardContent: {
    padding: 18,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
  },
  paidAmount: {
    color: '#4CAF50',
  },
  unpaidAmount: {
    color: '#FF5722',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#777',
    marginLeft: 6,
  },
  statusButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paidButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  unpaidButton: {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  paidButtonText: {
    color: '#2E7D32',
  },
  unpaidButtonText: {
    color: '#D32F2F',
  },

  // Status Badge (alternative option)
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  paidBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  unpaidBadge: {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DebtorDetails;
