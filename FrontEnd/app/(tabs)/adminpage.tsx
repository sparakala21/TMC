import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

interface MenuItem {
  _id: string;
  name: string;
  price: GLfloat;
  allergen: string;
  description: string;
}

interface MenuItemFormData {
  name: string;
  price: GLfloat;
  allergen: string;
  description: string;
}

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newMenuItem, setNewMenuItem] = useState<MenuItemFormData>({ 
    name: '', 
    price: 0, 
    allergen: '',
    description: '' 
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const BACKEND_URL = 'http://localhost:3000';

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
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode 
      ? `${BACKEND_URL}/menuItem?_id=${selectedItem?._id}` 
      : `${BACKEND_URL}/menuItem`;

    try {
      const payload = {
        name: newMenuItem.name,
        price: newMenuItem.price,
        allergen: newMenuItem.allergen,
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
    setNewMenuItem({ name: '', price: 0, allergen: '', description: '' });
    setEditMode(false);
    setSelectedItem(null);
  };

  const selectItemForEditing = (item: MenuItem) => {
    setEditMode(true);
    setSelectedItem(item);
    setNewMenuItem({ 
      name: item.name, 
      price: item.price, 
      allergen: item.allergen,
      description: item.description 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Page</Text>
      
      {/* Form for creating/editing menu items */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newMenuItem.name}
          onChangeText={(text) => setNewMenuItem({...newMenuItem, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={newMenuItem.price ? String(newMenuItem.price) : ''}
          onChangeText={(text) => setNewMenuItem({...newMenuItem, price: parseFloat(text) || 0})}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Allergen"
          value={newMenuItem.allergen}
          onChangeText={(text) => setNewMenuItem({...newMenuItem, allergen: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newMenuItem.description}
          onChangeText={(text) => setNewMenuItem({...newMenuItem, description: text})}
          multiline
        />
        <Button
          title={editMode ? "Update Item" : "Add Item"}
          onPress={handleSubmit}
        />
        {editMode && (
          <Button
            title="Cancel"
            onPress={resetForm}
            color="red"
          />
        )}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name} - ${item.price.toFixed(2)}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Button
              title="Edit"
              onPress={() => selectItemForEditing(item)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AdminPage;