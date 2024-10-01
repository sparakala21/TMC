import React, { useState } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, Linking, Text, TextInput, View, Button, Alert, useColorScheme  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const colorScheme = useColorScheme(); 

  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000', 
    buttonColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',  
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000', 
  };

  const handleLogin = () => {
    // Simple validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out both fields');
    } else {
      // You can add your login logic here
      Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    }
  };

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
        headerImage={
            <Image
                source={require('@/assets/images/Trans_TMC_Logo.png')}
                style={styles.restaurantLogo}
            />
        }>
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

        <TextInput
            style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
            placeholder="Password"
            placeholderTextColor={colors.placeholderText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} color={colors.buttonColor}/>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
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
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
});

export default LoginScreen;
