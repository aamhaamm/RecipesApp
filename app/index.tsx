import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, View, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { auth } from '@/firebaseConfig'; // Adjust the path to your firebaseConfig file
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneNumberScreen() {
  const [step, setStep] = useState(1); // 1 for phone input, 2 for OTP input
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false)
  const router = useRouter();
  
  // Create refs for OTP inputs
  const recaptchaRef = useRef(null)
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const handleSendOTP = async () => {
    if (phone.length !== 9) {
      setErrorMessage('Phone number must be exactly 9 digits');
      return;
    }
    setErrorMessage('');

    
    try {
      const phoneNumber = `+966${phone}`;
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved
          console.log('callback:: ', response)
        }
      });
      console.log('here')

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmation(confirmationResult);
      Alert.alert('OTP Sent', `OTP sent to +966${phone}`);
      setStep(2);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmation) {
      setErrorMessage('Error verifying OTP.');
      return;
    }
    const enteredOTP = otp.join('');
    try {
      await confirmation.confirm(enteredOTP);
      // Navigate to main or signup screen
      if (phone === '123456789') { // Example number for testing unregistered user
        router.push({
          pathname: '/signup',
          params: { phone }
        });
      } else {
        router.push('/main');
      }
    } catch (error) {
      setErrorMessage('The OTP you entered is incorrect.');
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value) {
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    } else {
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

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
    <>
    <RecaptchaVerifier 
      
    />
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome to Recipes Maker</Text>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.image}
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
                  maxLength={9}
                />
              </View>
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <Pressable style={styles.button} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable onPress={() => setStep(1)} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={25} color="#333" />
              </Pressable>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={el => otpRefs.current[index] = el}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={(value) => handleOTPChange(index, value)}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                ))}
              </View>
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <Pressable style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  otpInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    width: '15%',
  },
});

