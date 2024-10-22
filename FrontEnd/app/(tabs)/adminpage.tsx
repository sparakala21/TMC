import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, useColorScheme, Image} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const isAdmin = true;

const AdminPage = () => {

  // Render "Not Allowed" message if the user is not an admin
  if (!isAdmin) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
        headerImage={
            <Image
                source={require('@/assets/images/Trans_TMC_Logo.png')}
                style={styles.restaurantLogo}
            />
        }>
        <Text style={styles.notAllowedText}>You are not allowed to be here.</Text>
      </ParallaxScrollView>
    );
  }

  const [menuModalVisible, setMenuModalVisible] = useState(false); // Modal for menu management
  const [locationModalVisible, setLocationModalVisible] = useState(false); // Modal for location management
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [customLocation, setCustomLocation] = useState(''); // State for custom address input

  // Popular locations state
  const [popularLocations, setPopularLocations] = useState({
    'Union': false,
    'Farmers Market': false,
    'Freshman Hill': false,
    '86 Field': false,
  });

  const colorScheme = useColorScheme(); 

  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000', 
    buttonColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',  
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000', 
  };

  

  // Handle saving the menu item
  const saveMenuItem = () => {
    if (!newName || !newPrice) {
      Alert.alert('Error', 'Please provide both name and price.');
      return;
    }

    // Save logic for menu item would go here

    setMenuModalVisible(false);
  };

  // Handle saving the location
  const saveLocation = () => {
    const selectedLocations = Object.entries(popularLocations)
      .filter(([_, isSelected]) => isSelected)
      .map(([location]) => location);
  
    if (selectedLocations.length === 0 && !customLocation) {
      Alert.alert('Error', 'Please select a location or add a new one.');
      return;
    }
  
    // Save logic for selected locations and custom location
    console.log('Selected Popular Locations:', selectedLocations);
    console.log('Custom Location:', customLocation);
  
    setLocationModalVisible(false);
  };

  // // Toggle selection of a popular location
  // const toggleLocation = (location) => {
  //   setPopularLocations(prevState => ({
  //     ...prevState,
  //     [location]: !prevState[location],
  //   }));
  // };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
          <Image
              source={require('@/assets/images/Trans_TMC_Logo.png')}
              style={styles.restaurantLogo}
          />
      }>
      <ThemedText type="title">Admin Panel</ThemedText>
    

      {/* Buttons for Menu and Pickup Locations */}
      <Button title="Manage Menu" onPress={() => setMenuModalVisible(true)} />
      <Button title="Manage Pickup Locations" onPress={() => setLocationModalVisible(true)} />

      {/* Modal for managing menu items */}
      <Modal visible={menuModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Menu Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Item Price"
              value={newPrice}
              keyboardType="numeric"
              onChangeText={setNewPrice}
            />
            <Button title="Save" onPress={saveMenuItem} />
            <Button title="Cancel" onPress={() => setMenuModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for managing pickup locations */}
      <Modal visible={locationModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Pickup Location</Text>

            {/* Checklist for popular locations */}
            <View style={styles.checklistContainer}>
              {Object.keys(popularLocations).map((location) => (
                <View key={location} style={styles.checkboxContainer}>
                  {/* <CheckBox
                    value={popularLocations[location]}
                    onValueChange={() => toggleLocation(location)}
                  /> */}
                  <Text style={styles.checkboxLabel}>{location}</Text>
                </View>
              ))}
            </View>

            {/* Input for adding a custom location */}
            <TextInput
              style={styles.input}
              placeholder="Custom Location Address"
              value={customLocation}
              onChangeText={setCustomLocation}
              placeholderTextColor={colors.placeholderText}
            />

            <Button title="Save" onPress={saveLocation} />
            <Button title="Cancel" onPress={() => setLocationModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checklistContainer: {
    width: '100%',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
  notAllowedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  notAllowedText: {
    fontSize: 100,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
});

export default AdminPage;
