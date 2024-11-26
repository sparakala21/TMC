import React, { useState, useEffect } from 'react';
import { 
  Image, 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  Button,
  Linking,
  Alert,
  Platform 
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

// Custom PaymentButton component
const PaymentButton = ({ 
  onPress, 
  logo, 
  style, 
  label,
  testID 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.paymentButton, style]}
      activeOpacity={0.7}
      testID={testID}
    >
      <Image 
        source={logo} 
        style={styles.paymentLogo}
        resizeMode="contain"
      />
      {label && <Text style={styles.paymentButtonText}>{label}</Text>}
    </TouchableOpacity>
  );
};



export default function CartScreen() {
  const [isCartModalVisible, setCartModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);
  const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const url = 'http://localhost:3000';
  const isCartEmpty = cart.length === 0;

  useEffect(() => {
    if (isFocused && isCartEmpty) {
      setCartModalVisible(true);
    } else {
      setCartModalVisible(false);
    }
  }, [isFocused, isCartEmpty]);

  const closeModal = () => {
    setCartModalVisible(false);
  };

  const closeModalAndNavigate = () => {
    setCartModalVisible(false);
    navigation.navigate('explore');
  };

  const openNewModal = () => {
    setCartModalVisible(false);
    setIsNewModalVisible(true);
  };

  const closeNewModal = () => {
    setIsNewModalVisible(false);
  };

  const backToOrderSummary = () => {
    setIsNewModalVisible(false);
    setCartModalVisible(true);
  };

  const backtoOrderTotal = () => {  
      setIsPaymentMethodModalVisible(false);
      setIsNewModalVisible(true);
    }

  // New functions for payment modal
  const openPaymentModal = () => {
      setIsNewModalVisible(false);
      setIsPaymentMethodModalVisible(true);
    };
  
    const handleDone = () => {  
      setIsPaymentConfirmationModalVisible(false);
      navigation.navigate('explore');
    }
  
    const handleCompletePayment = () => { 
      setIsPaymentMethodModalVisible(false);
      setIsPaymentConfirmationModalVisible(true);
    }
    const handlePayment = async () => {
      try {
        const response = await axios.post(url)
      } catch (error) {
        console.error('Error generating payment link:', error);
        Alert.alert('Error', 'Failed to create payment link. Please try again.');
      }
    };

  const closePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
    setSelectedPaymentMethod('');
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

      {/* Modal for options when checking out */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartModalVisible}
        onRequestClose={closeModalAndNavigate}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Checkout Options:</Text>
            
            <TouchableOpacity 
              onPress={closeModalAndNavigate}
              style={[styles.touchableButton, { backgroundColor: 'red' }]}
            >
              <Text style={styles.buttonText}>Add Items to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={openNewModal}
              style={[styles.touchableButton, { backgroundColor: 'blue' }]}
            >
              <Text style={styles.buttonText}>Complete Order</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={closeModal}
              style={[styles.touchableButton, { backgroundColor: 'gray' }]}
            >
              <Text style={styles.buttonText}>View Payment Options</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Order Modal */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={isNewModalVisible}
      onRequestClose={closeNewModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Order Total: </Text>
          <Text style={styles.modalSubtitle}>Subtotal: $5.99 </Text>
          <Text style={styles.modalSubtitle}>Tax: $0.53 </Text>
          <Text style={styles.modalSubtitle}>Total: $6.52 </Text>
          <Text style={styles.modalSubtitle}> </Text>
          <Image source={require('@/assets/images/TMC_Logo.png')} style={styles.tmcLogo} />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={backToOrderSummary}
          >
            <Text style={styles.buttonText}>Back to Order Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.payButton}
            onPress={openPaymentModal}
          >
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

     {/* Payment Method Selection Modal */}
<Modal
  animationType="slide"
  transparent={true}
  visible={isPaymentMethodModalVisible}
  onRequestClose={closePaymentMethodModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Select Payment Method</Text>
      
      <View style={styles.paymentButtonsContainer}>
        <PaymentButton
          onPress={() => {
            setSelectedPaymentMethod('Apple Pay');
            console.log('Apple Pay selected');
          }}
          logo={require('@/assets/images/applepaylogo.png')}
          style={styles.applePayButton}
          testID="apple-pay-button"
        />
        <PaymentButton
          onPress={() => {
            setSelectedPaymentMethod('Google Pay');
            console.log('Google Pay selected');
          }}
          logo={require('@/assets/images/googlepaylogo.svg.png')}
          style={styles.googlePayButton}
          testID="google-pay-button"
        />
        <PaymentButton
          onPress={() => {
            setSelectedPaymentMethod('Venmo');
            console.log('Venmo selected');
          }}
          logo={require('@/assets/images/Venmo_logo.png')}
          style={styles.venmoButton}
          testID="venmo-button"
        />
        <PaymentButton
          onPress={() => {
            setSelectedPaymentMethod('Credit Card');
            console.log('Credit Card selected');
          }}
          logo={require('@/assets/images/6963703.png')}
          style={styles.creditCardButton}
          testID="credit-card-button"
        />
      </View>
      
      <Text style={styles.totalText}>Total: $6.52</Text>
      
      <TouchableOpacity 
        style={[styles.touchableButton, styles.backButton1]} 
        onPress={backtoOrderTotal}
      >
        <Text style={styles.buttonText1}>Back to Order Total</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.touchableButton, 
          styles.payButton1,
          !selectedPaymentMethod && { opacity: 0.5 }
        ]}
        onPress={handlePayment}
        disabled={!selectedPaymentMethod}
      >
        <Text style={styles.buttonText1}>Complete Payment</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.touchableButton, styles.payButton1, { backgroundColor: '#FF3B30' }]} 
        onPress={closePaymentMethodModal}
      >
        <Text style={styles.buttonText1}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Payment Confirmation Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={isPaymentConfirmationModalVisible}
  onRequestClose={handleDone}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Payment Confirmation</Text>
      <Text style={styles.modalSubtitle}>Order #12345</Text>
      <Text style={styles.modalSubtitle}>Total Paid: $6.52</Text>
      <Text style={styles.modalSubtitle}>Payment Method: {selectedPaymentMethod}</Text>
      <Text style={styles.modalSubtitle}>Date: {new Date().toLocaleDateString()}</Text>
      <Text style={styles.modalSubtitle}> </Text>
      
      <Image source={require('@/assets/images/TMC_Logo.png')} style={styles.tmcLogo} />
      <Text style={[styles.modalSubtitle, styles.successMessage]}>
        Payment Successful! Thank you for your order.
      </Text>
      <Text style={styles.modalSubtitle}>
        Your order will be ready for pickup in approximately 15-20 minutes.
      </Text>
      
      <TouchableOpacity 
        onPress={handleDone}
        style={styles.doneButton}
        activeOpacity={0.7}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    color: '#fff',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  tmcLogo: {
    height: 75,
    width: 75,
    marginBottom: 20,
    marginTop: 0,
    borderRadius: 50,
  },
  successMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#90EE90',
    marginTop: 10,
    marginBottom: 10,
  },
  paymentButtonsContainer: {
    width: '100%',
    gap: 10,
    marginVertical: 15,
  },
  
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },

  paymentLogo: {
    height: 30,
    width: 100,
  },

  paymentButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  applePayButton: {
    backgroundColor: 'red',
  },

  googlePayButton: {
    backgroundColor: '#fff',
  },

  venmoButton: {
    backgroundColor: '#008CFF',
  },

  creditCardButton: {
    backgroundColor: '#fff',
  },

  touchableButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },

  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 15,
  },
  
  condensedButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  backButton1: {
    width: '35%',
    backgroundColor: '#007AFF',
  },

  payButton1: {
    width: '35%',
    backgroundColor: '#34C759',
  },

  buttonText1: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  doneButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});