import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, Modal, StyleSheet, useColorScheme } from 'react-native';

// Example menu data
const initialMenuItems = [
  { id: '1', name: 'Burger', price: '5.99' },
  { id: '2', name: 'Pizza', price: '8.99' },
  { id: '3', name: 'Pasta', price: '7.99' },
];

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems); // Menu items state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentItem, setCurrentItem] = useState(null); // Current item being edited
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

//   // Handle opening the edit modal
//   const openEditModal = (item) => {
//     setCurrentItem(item);
//     setNewName(item.name);
//     setNewPrice(item.price);
//     setModalVisible(true);
//   };

  // Handle saving the menu item
  const saveMenuItem = () => {
    if (!newName || !newPrice) {
      Alert.alert('Error', 'Please provide both name and price.');
      return;
    }

    // // Update the menu items
    // const updatedItems = menuItems.map((item) =>
    //   item.id === currentItem.id ? { ...item, name: newName, price: newPrice } : item
    // );
    // setMenuItems(updatedItems);
    // setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      {/* <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Edit" onPress={() => openEditModal(item)} />
          </View>
        )}
      /> */}

      {/* Modal for editing a menu item
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Menu Item</Text>
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
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View> */}
      {/* </Modal> */}
    </View>
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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
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
});

export default AdminPage;
