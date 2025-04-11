import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Image, useColorScheme, Modal, Alert } from 'react-native';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  allergen: string;
  category: string;
  description: string;
}

interface MenuItemFormData {
  name: string;
  price: number;
  allergen: string;
  category: string;
  description: string;
}

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newMenuItem, setNewMenuItem] = useState<MenuItemFormData>({ 
    name: '', 
    price: 0, 
    allergen: '',
    category: '',
    description: '' 
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [menuModalVisible, setMenuModalVisible] = useState(false); // Modal for menu management
  const [newItemModalVisible, setNewItemModalVisible] = useState(false); // Modal for menu management

  const BACKEND_URL = 'https://tmc-85hb.onrender.com';

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/menuItems`);
      // Fix: Access the foundMenuItems array from the response structure
      setMenuItems(response.data.foundMenuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSubmit = async () => {
    // const { name, price, allergen, description } = newMenuItem;

    // // Validation checks
    // if (!name) {
    //   Alert.alert('Validation Error', 'Please enter a name.');
    //   return;
    // }
    // if (!price || isNaN(price) || price <= 0) {
    //   Alert.alert('Validation Error', 'Please enter a valid price greater than 0.');
    //   return;
    // }
    // if (!allergen) {
    //   Alert.alert('Validation Error', 'Please enter an allergen.');
    //   return;
    // }
    // if (!description) {
    //   Alert.alert('Validation Error', 'Please enter a description.');
    //   return;
    // }

    const method = editMode ? 'PUT' : 'POST';
    const url = editMode 
      ? `${BACKEND_URL}/menuItem?_id=${selectedItem?._id}` 
      : `${BACKEND_URL}/menuItem`;

    try {
      const payload = {
        name: newMenuItem.name,
        price: newMenuItem.price,
        allergen: newMenuItem.allergen,
        category: newMenuItem.category,
        description: newMenuItem.description,
      };

      if (method === 'PUT') {
        await axios.put(url, payload);
      } else {
        await axios.post(url, payload);
      }

      fetchMenuItems();
      resetForm();
    } catch (error) {
      console.error('Error creating/updating menu item:', error);
    }
  };

  const resetForm = () => {
    setNewMenuItem({ name: '', price: 0, allergen: '',category: '', description: '' });
    setEditMode(false);
    setSelectedItem(null);
  };



  const selectItemForEditing = (item: MenuItem) => {
    setNewItemModalVisible(true)
    setEditMode(true);
    setSelectedItem(item);
    setNewMenuItem({ 
      name: item.name, 
      price: item.price, 
      allergen: item.allergen,
      category: item.category,
      description: item.description 
    });
    
  };

  const colorScheme = useColorScheme(); 

  const colors = {
    background: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    placeholderText: colorScheme === 'dark' ? '#BDBDBD' : '#000000', 
    buttonColor: colorScheme === 'dark' ? '#FF7043' : '#FFA726',
    inputBackground: colorScheme === 'dark' ? '#333' : '#FFF',  
    inputTextColor: colorScheme === 'dark' ? '#FFF' : '#000', 
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

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Admin Page</ThemedText>
        </ThemedView>

        <Button title="Manage Menu" onPress={() => setMenuModalVisible(true)} color={colors.buttonColor}/>

        <Modal visible={menuModalVisible} transparent={true} animationType="slide">
          <ThemedView style={styles.modalContainer}>
            <ThemedView style={styles.modalContent}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Menu Changes</ThemedText>
              </ThemedView>
              <Button title="Add New Menu" onPress={() => setNewItemModalVisible(true)} color={colors.buttonColor}/>
              <Modal visible={newItemModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ThemedView style={styles.titleContainer}>
                      <ThemedText type="title">New/Edit Item</ThemedText>
                    </ThemedView>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
                      placeholder="Name"
                      placeholderTextColor={colors.placeholderText}
                      value={newMenuItem.name}
                      onChangeText={(text) => setNewMenuItem({...newMenuItem, name: text})}
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
                      placeholder="Price"
                      placeholderTextColor={colors.placeholderText}
                      value={newMenuItem.price ? String(newMenuItem.price) : ''}
                      onChangeText={(text) => setNewMenuItem({...newMenuItem, price: parseFloat(text) || 0})}
                      keyboardType="decimal-pad"
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
                      placeholder="Allergen"
                      placeholderTextColor={colors.placeholderText}
                      value={newMenuItem.allergen}
                      onChangeText={(text) => setNewMenuItem({...newMenuItem, allergen: text})}
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
                      placeholder="Category"
                      placeholderTextColor={colors.placeholderText}
                      value={newMenuItem.category}
                      onChangeText={(text) => setNewMenuItem({...newMenuItem, category: text})}
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.inputTextColor }]}
                      placeholder="Description"
                      placeholderTextColor={colors.placeholderText}
                      value={newMenuItem.description}
                      onChangeText={(text) => setNewMenuItem({...newMenuItem, description: text})}
                      autoCapitalize="none"
                    />
                    <Button title="Save" onPress={handleSubmit} color={colors.buttonColor}/>
                    <Button title="Cancel" onPress={() => setNewItemModalVisible(false)} color={'red'}/>
                  </View>
                </View>
              </Modal>
              <FlatList
                data={menuItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <Text style={styles.itemName}>{item.name} - ${item.price.toFixed(2)}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemDescription}>{item.category}</Text>
                    <Button
                      title="Edit"
                      onPress={() => selectItemForEditing(item)}
                      color={colors.buttonColor}
                    />
                  </View>
                )}
              />
              <Button title="Close" onPress={() => setMenuModalVisible(false)} color={'red'}/>
            </ThemedView>
          </ThemedView>
        </Modal>
      </ParallaxScrollView>
    
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
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
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    marginTop: 5,
    color: '#666',
  },
  form: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginVertical: 5,
  },
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
});

export default AdminPage;