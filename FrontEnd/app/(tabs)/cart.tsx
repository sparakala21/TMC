import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Linking, Modal, View, Text, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const [isCartModalVisible, setCartModalVisible] = useState(false);

  // Function to handle cart button press
  const handleCartPress = () => {
    setCartModalVisible(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setCartModalVisible(false);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/Trans_TMC_Logo.png')}
          style={styles.restaurantLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Order Here</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      </ThemedView>
    </ParallaxScrollView>

    {/* Modal for Cart */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('@/assets/images/grocerybag.png')}  // Optional: Replace with an empty cart illustration if available
            style={styles.emptyCartImage}
          />
          <Text style={styles.modalText}>Your Bag is Empty</Text>
          <Text style={styles.modalSubtitle}>It's lonely in here</Text>
          <Button title="Order Now" onPress={closeModal} />
          <Button title="Close" onPress={closeModal} color="#ff7043" />
        </View>
      </View>
    </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
  clickableImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  clickableImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  imageRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 20,
  },
  cartButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: '#ff7043',
    padding: 10,
    borderRadius: 50,
  },
  cartIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  emptyCartImage: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
});
