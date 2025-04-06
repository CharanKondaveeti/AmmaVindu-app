import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';


const existingUsers = [
  {name: 'Ramesh Kumar', phone: '+91 9876543210'},
  {name: 'Sita Devi', phone: '+91 9123456780'},
  {name: 'Ramesh Kumar', phone: '+91 9876543210'},
  {name: 'Sita Devi', phone: '+91 9123456780'},
];

const AddDebtScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleChooseContact = async () => {
    try {
      // Request permission on Android
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        if (!hasPermission) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Permission to access contacts was denied');
            return;
          }
        }
      }

      // Fetch all contacts
      const contacts = await Contacts.getAll();

      // if (!contacts || contacts.length === 0) {
      //   console.warn('No contacts found. Try adding some to your emulator.');
      //   return;
      // }

      // // Just pick the first contact for now
      // const contact = contacts[0];

      // const name =
      //   contact.displayName ||
      //   `${contact.givenName || ''} ${contact.familyName || ''}`.trim();

      // const phoneNumber =
      //   contact.phoneNumbers && contact.phoneNumbers.length > 0
      //     ? contact.phoneNumbers[0].number
      //     : '';

      // setName(name);
      // setPhone(phoneNumber);

      // console.log('Selected contact:', {name, phoneNumber});
    } catch (error) {
      console.error('Error accessing contacts:', error);
    }
  };

  const handleSelectExistingUser = user => {
    setName(user.name);
    setPhone(user.phone);
  };

  const handleAddDebt = () => {
    console.log('Debt added:', {name, phone, amount});
    // Add your data submission logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleChooseContact}>
          <Icon name="book" size={20} color="#4ECDC4" />
          <Text style={styles.actionText}>Choose from Contacts</Text>
        </TouchableOpacity>

        <FlatList
          data={existingUsers}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.existingUser}
              onPress={() => handleSelectExistingUser(item)}>
              <Text style={styles.existingUserName}>{item.name}</Text>
              <Text style={styles.existingUserPhone}>{item.phone}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddDebt}>
        <Text style={styles.addButtonText}>Add Debt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDebtScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  actionRow: {
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#4ECDC4',
    fontWeight: '600',
    marginLeft: 8,
  },
  existingUser: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  existingUserName: {
    fontWeight: 'bold',
  },
  existingUserPhone: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
