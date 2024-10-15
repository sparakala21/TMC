import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useIsFocused, useNavigation } from '@react-navigation/native'

// Once backend is finished, add to cart should send itemNames array to backend to add to said person's account

const priceLookup = {
        samosa: 5.99,
        pakoras: 6.99,
        chickenCurry: 14.99,
        veggieStew: 13.99,
        mangoLassi: 4.99,
        gulabJamun: 5.49,
      };

// MenuItem component to display each item with quantity controls
const MenuItem = ({ itemName, itemTitle, itemDescription, itemPrice, onQuantityChange, quantities }) => (
  <ThemedView style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <ThemedText type="defaultSemiBold">{itemTitle}</ThemedText>
      <ThemedText>{itemDescription}</ThemedText>
      <ThemedText>Price: {itemPrice}</ThemedText>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(itemName, -1)}>
          <ThemedText>-</ThemedText>
        </TouchableOpacity>
        <ThemedText>{quantities[itemName]}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(itemName, 1)}>
          <ThemedText>+</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
    <Image
      source={require('@/assets/images/icon.png')}
      style={styles.foodImage}
    />
  </ThemedView>
);

export default function MenuScreen() {
  const [quantities, setQuantities] = useState({
    samosa: 0,
    pakoras: 0,
    chickenCurry: 0,
    veggieStew: 0,
    mangoLassi: 0,
    gulabJamun: 0,
  });

const Sidebar = ({ selectedItems, onClose }) => {
  const navigation = useNavigation();

  const closeAndNavigate = () => {
    onClose();
    navigation.navigate('cart');
  };

  // Variables to calculate
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

  return (
    <ThemedView style={styles.sidebarContainer}>
      <ThemedText type="subtitle" style={styles.sidebarTitle}>Your Cart</ThemedText>
      {selectedItems.length > 0 ? (
        selectedItems.map((item, index) => (
          <ThemedText key={index}>{item}</ThemedText>
        ))
      ) : (
        <ThemedText>No items in the cart.</ThemedText>
      )}
      <ThemedText>Subtotal: ${subtotal.toFixed(2)}</ThemedText>
      <ThemedText>Tax: ${tax.toFixed(2)}</ThemedText>
      <ThemedText type="defaultSemiBold">Total: ${total.toFixed(2)}</ThemedText>

      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <ThemedText style={styles.closeButtonText}>X</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={closeAndNavigate} style={styles.navigateButton}>
        <ThemedText style={styles.navigateText}>Checkout</ThemedText>
      </TouchableOpacity> 
    </ThemedView>
  );
};


// Array to hold the cart items
const [selectedItems, setSelectedItems] = useState([]);

const [isSidebarVisible, setIsSidebarVisible] = useState(false);
const sidebarWidth = 400;

const [cart, setCart] = useState([]);

const Divider = () => (
  <View style={styles.divider} />
);

const handleQuantityChange = (item, change) => {
  setQuantities((prev) => {
    const newQuantities = {
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    };
    // Test to see the items added to cart (uses variable itemName)
    const updatedSelectedItems = [];
      for (const [key, value] of Object.entries(newQuantities)) {
        for (let i = 0; i < value; i++) {
          updatedSelectedItems.push(key);
        }
      }

    setSelectedItems(updatedSelectedItems);

    return newQuantities;
  });
};

const handleAddToCart = () => {
  const updatedCart = [...cart];

  for (const [item, qty] of Object.entries(quantities)) {
    if (qty > 0) {
      const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.name === item);

      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex].quantity += qty;
      } else {
        updatedCart.push({ name: item, quantity: qty, price: priceLookup[item] });
      }
    }
  }
  setCart(updatedCart);

  console.log("Items added to cart:", updatedCart);

  setQuantities({
    samosa: 0,
    pakoras: 0,
    chickenCurry: 0,
    veggieStew: 0,
    mangoLassi: 0,
    gulabJamun: 0,
  });

  setIsSidebarVisible(true);
};

const handleCloseSidebar = () => {
    setIsSidebarVisible(false);
  };

const hasItemsInCart = Object.values(quantities).some(q => q > 0);

  return (
    <View style={styles.container}>
      {isSidebarVisible && (
        <Sidebar selectedItems={selectedItems} onClose={handleCloseSidebar} />
      )}
      <View style={[styles.contentContainer, { marginRight: isSidebarVisible ? sidebarWidth : 0 }]}>
        <ParallaxScrollView
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
          headerImage={
            <Image
              source={require('@/assets/images/Trans_TMC_Logo.png')}
              style={styles.restaurantLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Today's Menu</ThemedText>
          </ThemedView>

          <Divider />

          {/* Visuals for the testing labeled Selected Items */}
          <ThemedView style={styles.selectedItemsContainer}>
          <ThemedText type="subtitle">Selected Items:</ThemedText>
          <ThemedText>{selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}</ThemedText>
          </ThemedView>

          {/* Appetizers Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Appetizers</ThemedText>
            <MenuItem
              itemName="samosa"
              itemTitle="Samosa Delight"
              itemDescription="Delicious fried pastries stuffed with spiced potatoes, peas, and herbs."
              itemPrice="$5.99"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
            <MenuItem
              itemName="pakoras"
              itemTitle="Crispy Vegetable Pakoras"
              itemDescription="Crunchy, deep-fried vegetable fritters served with chutney."
              itemPrice="$6.99"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
          </ThemedView>

          <Divider />

          {/* Main Dishes Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Main Dishes</ThemedText>
            <MenuItem
              itemName="chickenCurry"
              itemTitle="Thunder Chicken Curry"
              itemDescription="A fiery chicken curry that packs a punch of heat and flavor."
              itemPrice="$14.99"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
            <MenuItem
              itemName="veggieStew"
              itemTitle="Mountain Coconut Veggie Stew"
              itemDescription="Slow-cooked vegetables in a rich, creamy coconut sauce."
              itemPrice="$13.99"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
          </ThemedView>

          <Divider />

          {/* Desserts Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Desserts</ThemedText>
            <MenuItem
              itemName="mangoLassi"
              itemTitle="Mango Lassi"
              itemDescription="A sweet, refreshing yogurt-based mango drink."
              itemPrice="$4.99"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
            <MenuItem
              itemName="gulabJamun"
              itemTitle="Gulab Jamun"
              itemDescription="Soft doughnuts soaked in a fragrant syrup."
              itemPrice="$5.49"
              onQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
          </ThemedView>
        </ParallaxScrollView>

        {hasItemsInCart && (
          <TouchableOpacity style={styles.fixedButton} onPress={handleAddToCart}>
            <ThemedText>Add to Cart</ThemedText>
          </TouchableOpacity>
        )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'relative',
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    transition: 'margin-right 0.3s',
  },
  titleContainer: {
    marginBottom: 20
  },
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  divider: {
    height: 3, 
    backgroundColor: '#ccc', 
    marginVertical: 10, 
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between', 
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 8,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 17,
    padding: 15,
    backgroundColor: '#FFA726',
    alignItems: 'center',
  },
  sidebarContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 400,
    height: '100%',
    backgroundColor: '#D88A3C',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
  sidebarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  // For Sidebar
  closeButton: {
    position: 'absolute',
    marginTop: 5,
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  },
  navigateButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#F54302',
    alignItems: 'center',
  },
  navigateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  }

});
