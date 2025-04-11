import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity, Image, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { AuthProvider, useAuth } from '../components/AuthContext'; // Fixed import

// Global stuff
const Stack = createStackNavigator();
const BASE_URL = 'https://tmc-85hb.onrender.com';

// LOGIN SCREEN
const LoginScreen = ({ navigation }) => {
  const { setUser, setLoggedIn } = useAuth();
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

  const handleLogin = async () => {
    if (!email && !password) {
      showPopup('Please fill out both fields');
    } else if (!email) {
      showPopup('Please fill out your email');
    } else if (!password) {
      showPopup('Please fill out your password');
    } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
      showPopup('Please fill out a valid email');
    } else {
      try {
        // Server implementation here
        const find_email = await axios.get(`${BASE_URL}/accounts?email=${email}`);
        const find_account = await axios.get(`${BASE_URL}/accounts?email=${email}&password=${password}`);
        
        if (find_account.data && find_account.data.foundItems.length > 0) {
          showPopup(`Logging into: ${email}`);
          
          // SUCCESSFUL LOGIN! - Fixed to set user data and logged in state separately
          console.log(find_account.data);
          setUser(find_account.data.foundItems[0]); // Use the first account in search (more than one with test accounts)
          setLoggedIn(true);
          navigation.replace('Profile');
        }
        else if (find_email.data && find_email.data.foundItems.length > 0) { // good Email bad password
          showPopup(`Email found, Password is invalid`);
        }
        else { // bad Email
          showPopup(`Email not found`);
        }
      } catch (error) {
        showPopup(`Login error: ${error.message}`);
      }
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

// SIGN UP SCREEN
const SignUpScreen = ({ navigation }) => {
  const { setUser, setLoggedIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setNumber] = useState('');

  // State variables to control password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      return true;
    } 
    return false;
  }
    
  const handleSignUp = async () => {
    try {
      //BACKEND find if these objects are available
      const find_email = await axios.get(`${BASE_URL}/accounts?email=${email}`);
      const find_phone_number = await axios.get(`${BASE_URL}/accounts?phoneNumber=${phoneNumber}`);

      if (!email && !password) {
        showPopup('Please fill out all fields');
      } else if (!email) {
        showPopup('Please fill out your email');
      } else if (!password) {
        showPopup('Please fill out your password');
      } else if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        showPopup('Please fill out a valid email');
      } else if (password.length < 8) {
        showPopup('Please fill out a Password that is at least 8 characters long');
      } else if (!(isAllPresent(password))) {
        showPopup('A Password should contain at least: both a lowercase and an uppercase letters, a number and a special character(#$%&*) ');
      } else if (password !== confirmPassword) {
        showPopup('Passwords do not match');
      }
      //---Query for Email + Phone Number + Passwords---
      else if (find_email.data && find_email.data.length > 0) {
        showPopup("Email is already taken ");
      }
      else if (find_phone_number.data && find_phone_number.data.length > 0) {
        showPopup("Phone number is already taken ");
      }
      else {
        const payload = {
          name: name,
          email: email,
          phone: phoneNumber,
          password: password,
          accessLevel: 0
        };
        
        await axios.post(`${BASE_URL}/accounts`, payload);
        const find_account = await axios.get(`${BASE_URL}/accounts?email=${email}&password=${password}`);
        
        if (find_account.data && find_account.data.length > 0) {
          // Fixed to set user data and logged in state separately
          setUser(find_account.data[0]); // Use the first account if there are multiple matches
          setLoggedIn(true);
          
          showPopup(`Account created for: email: ${email} password: ${password}, name: ${name}, phoneNumber: ${phoneNumber}`);
          navigation.replace('Profile');
        } else {
          showPopup("Account created but couldn't log in automatically. Please try logging in.");
        }
      }
    } catch (error) {
      showPopup(`Sign up error: ${error.message}`);
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
          placeholder="Name"
          placeholderTextColor={colors.placeholderText}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholderText}
          value={phoneNumber}
          onChangeText={setNumber}
        />
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
            placeholder="Confirm Password"
            placeholderTextColor={colors.placeholderText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={styles.showHideText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        
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

// PROFILE SCREEN - UPDATED
const ProfileScreen = ({ navigation }) => { 
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  
  const colorScheme = useColorScheme();
  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000',
    headerColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        phone: phoneNumber,
      };
      await axios.post(`${BASE_URL}/accounts?_id=${user._id}`, payload);
      // Update local state if needed
    } catch (error) {
      console.error('Failed to save changes', error);
    }
  };
  const admin = () => {
    navigation.navigate('AdminPage');
  }

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={<Image source={require('@/assets/images/Trans_TMC_Logo.png')} style={styles.restaurantLogo} />}
    >
      <View style={styles.container}>
        <ThemedText type="title">Profile</ThemedText>
        
        <View style={styles.fieldRow}>
          <Text style={[styles.fieldLabel, {color: colors.headerColor}]}>Current Name: {user.name}</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter New Name"
            placeholderTextColor={colors.placeholderText}
          />
        </View>
        
        <View style={styles.fieldRow}>
          <Text style={[styles.fieldLabel, {color: colors.headerColor}]}>Current Email: {user.email}</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
            value={user.email}
            editable={false}
            placeholder="Email cannot be changed"
            placeholderTextColor={colors.placeholderText}
          />
        </View>
        
        <View style={styles.fieldRow}>
          <Text style={[styles.fieldLabel, {color: colors.headerColor}]}>Current Phone: {user.phone}</Text>
          <TextInput
            style={[styles.fieldInput, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter New Phone Number"
            placeholderTextColor={colors.placeholderText}
          />
        </View>
        
        <Button title="Save Changes" onPress={handleSave} color={colors.background} />
        <View style={styles.buttonSpacer}>
          <Button title="Logout" onPress={logout} color={colors.background} />
        </View>
        
        {user.accessLevel === 1 && (
          <View style={styles.buttonSpacer}>
            <Button title="ADMIN ACCESS" onPress={admin} color={colors.background} />
          </View>       
         )}
      </View>
    </ParallaxScrollView>
  );
};

// The Container that will manage Authentication State
const NavigateLoggedIn = () => {
  const { loggedIn } = useAuth();

  return (
    <Stack.Navigator>
    {!loggedIn ? (
      <>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      </>
    ) : (
      <>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminPage" 
          component={require('../components/adminpage').default} 
          options={{ headerShown: true, title: 'Admin Panel' }} 
        />
      </>
    )}
  </Stack.Navigator>
  );
};

// Main component that provides the Auth context
export default function AuthScreen(){
  return (
      <NavigateLoggedIn />
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
  // Updated styles for Profile fields layout
  fieldRow: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fieldInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonSpacer: {
    marginTop: 20,
  },
});