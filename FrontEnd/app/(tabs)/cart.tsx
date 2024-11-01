import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Modal, View, Text, Button } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function CartScreen() {
 const [isCartModalVisible, setCartModalVisible] = useState(false);
 const [isNewModalVisible, setIsNewModalVisible] = useState(false); // New modal state
 const [cart, setCart] = useState([]);  // Array holding cart items
 const isFocused = useIsFocused();
 const navigation = useNavigation();


 // Check if the cart is empty
 const isCartEmpty = cart.length === 0;


 // Effect to show the modal when the Cart tab is focused and cart is empty
 useEffect(() => {
   if (isFocused && isCartEmpty) {
     setCartModalVisible(true);  // Show modal when Cart tab is focused and cart is empty
   } else {
     setCartModalVisible(false);  // Hide modal if cart has items
   }
 }, [isFocused, isCartEmpty]);


 const closeModal = () => {
   setCartModalVisible(false);  // Close the modal
 };


 const closeModalAndNavigate = () => {
   setCartModalVisible(false);  // Close the modal
   navigation.navigate('explore');  // Navigate to Menu screen
 };


 const openNewModal = () => {
   setCartModalVisible(false); // Close current modal
   setIsNewModalVisible(true); // Open new modal
 };


 const closeNewModal = () => {
   setIsNewModalVisible(false); // Close new modal
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
         <ThemedText type="title">Payment Options</ThemedText>
       </ThemedView>
       <ThemedView style={styles.stepContainer}>
         <ThemedText type="subtitle">1. Apple Pay</ThemedText>
         <Image
           source={require('@/assets/images/applepaylogo.png')}
           style={styles.invertedapplePayLogo}
         />
         <ThemedText type="subtitle">2. Google Pay</ThemedText>
         <Image
           source={require('@/assets/images/googlepaylogo.svg.png')}
           style={styles.googlePayLogo}
         />
         <ThemedText type="subtitle">3. Venmo</ThemedText>
         <Image
           source={require('@/assets/images/Venmo_logo.png')}
           style={styles.venmoLogo}
         />
         <ThemedText type="subtitle">4. Credit Card/Debit Card</ThemedText>
         <Image
           source={require('@/assets/images/6963703.png')}
           style={styles.creditCardLogo} 
         />
       </ThemedView>
     </ParallaxScrollView>


     {/* Modal for Empty Cart */}
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
           <Button title="Add Items to Cart" onPress={closeModalAndNavigate} color="#" />
           <Button title="Complete Order" onPress={openNewModal} color="blue" />
           <Button title="View Payment Options" onPress={closeModal} color="#" />
         </View>
       </View>
     </Modal>


     {/* Order Modal */}
     <Modal
       animationType="slide"
       transparent={true}
       visible={isNewModalVisible}
       onRequestClose={closeNewModal}>
       <View style={styles.modalContainer}>
         <View style={styles.modalContent}>
           <Text style={styles.modalText}>Order Summary</Text>
           <Text style={styles.modalSubtitle}>Order Total: </Text>
           <Button title="Close" onPress={closeNewModal} color="#FF7043" />
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
 invertedapplePayLogo: {
   height: 75,
   width: 75,
   tintColor: 'red',
   resizeMode: 'contain',
 },
 googlePayLogo: {
   height: 75,
   width: 75,
   resizeMode: 'contain',
 },
 venmoLogo: {
   height: 75,
   width: 75,
   resizeMode: 'contain',
 },
 creditCardLogo: {
   height: 75,
   width: 75,
   resizeMode: 'contain',
 },
 modalContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
 },
 modalContent: {
   backgroundColor: '#D88A3C',
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
   color: '#fff',
 },
 modalSubtitle: {
   fontSize: 14,
   color: '#888',
   marginBottom: 20,
 },
});


