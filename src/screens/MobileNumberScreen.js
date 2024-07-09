import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const MobileNumberScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);

  const sendOtp = async () => {
    const confirmation = await auth().signInWithPhoneNumber(
      `+91${mobileNumber}`,
    );
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(otp);
      navigation.reset({
        index: 0,
        routes: [{name: 'Products'}],
      });
    } catch (error) {
      Alert.alert('Error', error.toString());
      console.log('Invalid code.');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text>Enter Mobile Number:</Text>
      <TextInput
        keyboardType="number-pad"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      {mobileNumber.length === 10 && !confirm && (
        <Button title="Send OTP" onPress={sendOtp} />
      )}
      {confirm && (
        <>
          <Text>Enter OTP:</Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            style={{borderWidth: 1, padding: 10, marginVertical: 10}}
          />
          <Button title="Confirm OTP" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

export default MobileNumberScreen;
