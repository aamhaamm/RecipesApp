import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, View, Animated, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@/components/Themed';
import { Link, useRouter } from 'expo-router';

export default function PhoneNumberScreen() {
  const [step, setStep] = useState(1); // 1 for phone input, 2 for OTP input
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const router = useRouter();

  const handleSendOTP = () => {
    // Mock sending OTP logic
    Alert.alert('OTP Sent', `OTP sent to +966${phone}`);
    setStep(2);
    setTimer(30);
    setResendDisabled(true);
  };

  const handleVerifyOTP = () => {
    // Mock verify OTP logic
    if (otp === '123456') { // Example OTP for testing
      router.push('/main');
    } else {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setResendDisabled(true);
    Alert.alert('OTP Resent', 'A new OTP has been sent');
  };

  const scaleValue = new Animated.Value(1);

  const startHeartbeat = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startHeartbeat();
  }, []);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer, step]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome to Recipes Maker</Text>
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            style={[styles.image, { transform: [{ scale: scaleValue }] }]}
          />
        </View>
        <View style={styles.bottomContainer}>
          {step === 1 ? (
            <>
              <View style={styles.inputContainer}>
                <Image source={require('@/assets/images/saudi_flag.jpg')} style={styles.flag} />
                <Text style={styles.prefix}>+966</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>
              <Pressable style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </Pressable>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={20} color="#333" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="OTP"
                  value={otp}
                  onChangeText={setOTP}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
              <Pressable style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </Pressable>
              <Pressable
                style={[styles.button, resendDisabled && styles.buttonDisabled]}
                onPress={handleResendOTP}
                disabled={resendDisabled}
              >
                <Text style={styles.buttonText}>Resend OTP ({timer}s)</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CBE25B',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginVertical: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: -20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#CBE25B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  prefix: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
