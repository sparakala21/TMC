import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity, Image, useColorScheme,} from 'react-native';
import Modal from 'react-native-modal';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Modal state
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Function to show the modal popup
  const showPopup = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const colorScheme = useColorScheme();
  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000',
    buttonColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000',
  };

  const handleLogin = () => {
    if (!email && !password) {
      showPopup('Please fill out both fields');
    } else if (!email) {
      showPopup('Please fill out your email');
    } else if (!password) {
      showPopup('Please fill out your password');
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
      showPopup('Please fill out a valid email');
    } else {
      showPopup(`Email: ${email}\nPassword: ${password}`);
      // Server implementation here
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/Trans_TMC_Logo.png')}
          style={styles.restaurantLogo}
        />
      }
    >
      <ThemedText type="title">Login</ThemedText>

      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Email"
        placeholderTextColor={colors.placeholderText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
          placeholder="Password"
          placeholderTextColor={colors.placeholderText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} color={colors.buttonColor} />

      {/* Sign Up Text */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {/* Modal for Errors */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close modal on backdrop press
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </ParallaxScrollView>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setNumber] = useState('');


  // Modal state
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Function to show the modal popup
  const showPopup = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const colorScheme = useColorScheme();
  
  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000',
    buttonColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000',
  };

  function isAllPresent(str) {
    // Regex to check if a string
    // contains uppercase, lowercase special character & numeric value
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$%&*]).+$"
    );

    if (!str || str.length === 0) {
      return false;
    }
    if (pattern.test(str)) {
      return true
    } 
    return false
    }

  const handleSignUp = () => {
    if (!email && !password) {
      showPopup('Please fill out both fields');
    } else if (!email) {
      showPopup('Please fill out your email');
    } else if (!password) {
      showPopup('Please fill out your password');
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
      showPopup('Please fill out a valid email');
    } else if (password.length < 8){
      showPopup('Please fill out a Password that is at least 8 characters long');
    } else if ( !(isAllPresent(password)) ){
      showPopup('A Password should contain at least: both a lowercase and  an uppercase letters, a number and a special character(#$%&*) ');
    }else if (password !== confirmPassword) {
      showPopup('Passwords do not match');
    }//add api  pull else if  to compare with previous passwords, emails, and numbers?
    //querey account  baseurl + /accounts?name=test&password=123

    //else if( baseurl + /accounts?password=password){
    // showPopup("Password is already taken ")}
    //else if( baseurl + /accounts?email=email){
    // showPopup("Email is already taken ")}
    //else if( baseurl + /accounts?number=number){
    // showPopup("Phone Number is already taken ")}
    
    else {
      showPopup(`Account created for: email: ${email} password: ${password},  name: ${name}, phoneNumber: ${phoneNumber}`);
      // Server Implementation
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/Trans_TMC_Logo.png')}
          style={styles.restaurantLogo}
        />
      }
    >
    <View style={styles.container}>
    <ThemedText type="title">Sign Up</ThemedText>
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Email"
        placeholderTextColor={colors.placeholderText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Password"
        placeholderTextColor={colors.placeholderText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Confirm Password"
        placeholderTextColor={colors.placeholderText}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Name"
        placeholderTextColor={colors.placeholderText}
        value={name}
        onChangeText={setName}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
        placeholder="Phone Number"
        placeholderTextColor={colors.placeholderText}
        value={phoneNumber}
        onChangeText={setNumber}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignUp} color={colors.buttonColor} />

      {/* Back to Login Text */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginText}>Already have an account? Login</Text>
      </TouchableOpacity>

      {/* Modal for Errors */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close modal on backdrop press
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
    </ParallaxScrollView>
  );
};

const AuthScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showHideText: {
    marginLeft: 10,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: 'bold',
  },
  backToLoginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: 'bold',
  },
  restaurantLogo: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
