import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Modal, View, Text, Button } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';  // React Navigation hook
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CartScreen() {
  const [isCartModalVisible, setCartModalVisible] = useState(false);
  const isFocused = useIsFocused();  // Detect when the Cart tab is focused
  const navigation = useNavigation();  // Navigation hook

  // Effect to show the modal when the Cart tab is focused
  useEffect(() => {
    if (isFocused) {
      setCartModalVisible(true);  // Show modal when Cart tab is focused
    }
  }, [isFocused]);

  // Function to close the modal and navigate to the Menu page
  const closeModalAndNavigate = () => {
    setCartModalVisible(false);  // Close the modal
    navigation.navigate('explore');  // Navigate to Menu screen
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
        animationType="fade"
        transparent={true}
        visible={isCartModalVisible}
        onRequestClose={closeModalAndNavigate}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('@/assets/images/grocerybag.png')} 
              style={styles.emptyCartImage}
            />
            <Text style={styles.modalText}>Your Bag is Empty</Text>
            <Text style={styles.modalSubtitle}>It's lonely in here</Text>
            <Button title="Order Now" onPress={closeModalAndNavigate} />
            <Button title="Close" onPress={closeModalAndNavigate} color="#ff7043" />
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
