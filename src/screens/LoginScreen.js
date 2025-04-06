import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [passcode, setPasscode] = useState(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);

    if (text !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (index === 3 && text !== '') {
      const code = newPasscode.join('');
      if (code === '8985') {
        handleLogin();
      } else {
        triggerShake();
      }
    }
  };

  const triggerShake = () => {
    setIsError(true);

    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 3,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setPasscode(['', '', '', '']);
        inputRefs.current[0].focus();
        setIsError(false);
      }, 400);
    });
  };

  const handleLogin = () => {
    console.log('Passcode correct! Navigating...');
    navigation.replace('MainApp');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.innerContainer}>
        <Image
          source={{uri: 'https://i.imgur.com/t3pd53a.png'}}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appTitle}>AmmaVindu</Text>
        <Text style={styles.subtitle}>Enter 4-digit Passcode</Text>

        <Animated.View
          style={[
            styles.passcodeContainer,
            {transform: [{translateX: shakeAnim}]},
          ]}>
          {passcode.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.passcodeInput,
                isError && {borderColor: '#FF6B6B'},
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              ref={el => (inputRefs.current[index] = el)}
              autoFocus={index === 0}
            />
          ))}
        </Animated.View>

        <TouchableOpacity onPress={() => setPasscode(['', '', '', ''])}>
          <Text style={styles.forgotText}>Reset Passcode</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FF6B6B',
    top: -80,
    left: -80,
    opacity: 0.3,
  },
  circle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#4ECDC4',
    bottom: -150,
    right: -150,
    opacity: 0.3,
  },
  appTitle: {
    fontSize: 44,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  passcodeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  forgotText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginScreen;
