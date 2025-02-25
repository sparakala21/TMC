import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Modal, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused, useNavigation, NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const BACKEND_URL = 'https://tmc-85hb.onrender.com';

// MenuItem object
const MenuItem = ({ itemId, itemName, itemDescription, itemPrice, itemImage, itemAllergen, onQuantityChange, quantities }) => (
  <ThemedView style={styles.itemContainer}>
    {/* Menu Item text */}
    <View style={styles.textContainer}>
      <ThemedText type="defaultSemiBold">{itemName}</ThemedText>
      <ThemedText>Description: {itemDescription}</ThemedText>
      {itemAllergen && <ThemedText>
      <Text style={{ textDecorationLine: 'underline' }}>Allergens:</Text> {itemAllergen} 
      </ThemedText>}
      <ThemedText type="defaultSemiBold">${Number(itemPrice).toFixed(2)}</ThemedText>
      
      {/* Menu Item quantity buttons and counter */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(itemId, -1)}>
          <ThemedText>-</ThemedText>
        </TouchableOpacity>
        <ThemedText>{quantities[itemId] || 0}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(itemId, 1)}>
          <ThemedText>+</ThemedText>
        </TouchableOpacity>
      </View>
    </View>

    {/* Menu Item image */}
    <Image
      source={itemImage ? { uri: itemImage } : require('@/assets/images/icon.png')}
      style={styles.foodImage}
    />
  </ThemedView>
);

// The components of the MenuScreen
export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [categorizedItems, setCategorizedItems] = useState({
    appetizers: [],
    mainDishes: [],
    desserts: []
  });

  // Used to connect to backend database
  useEffect(() => {
    const loadMenuItems = async () => {
      try 
      {
        console.log('Fetching from:', `${BACKEND_URL}/menuItems`);
        const response = await axios.get(`${BACKEND_URL}/menuItems`);
        console.log('Response data:', response.data);
        const items = Array.isArray(response.data.foundItems) ? response.data.foundItems : [];
        setMenuItems(items);
        
        // Initialize quantities state with all items set to 0
        const initialQuantities = {};
        items.forEach(item => 
        {
          initialQuantities[item._id] = 0;
        });
        setQuantities(initialQuantities);

        // Categorize items
        const categorized = 
        {
          appetizers: items.filter(item => item.category === 'Appetizer'),
          mainDishes: items.filter(item => item.category === 'Main'),
          desserts: items.filter(item => item.category === 'Dessert')
        };
        console.log('Categorized items:', categorized);
        setCategorizedItems(categorized);
      } 
      
      catch (error) 
      {
      console.error('Error fetching menu items:', 
      {
        message: error.message,
        responseData: error.response?.data,
        fullError: error
        });
      }
    };

    loadMenuItems();
  }, []);

  // Function that updates an item's quantity when the counter actually changes
  const handleQuantityChange = (itemId, change) => 
  {
    setQuantities(prev => 
    {
      const newQuantities = 
      {
        ...prev,
        [itemId]: Math.max(0, (prev[itemId] || 0) + change)
      };

      // Update selected items
      const updatedSelectedItems = [];
      Object.entries(newQuantities).forEach(([key, value]) => 
      {
        for (let i = 0; i < value; i++) 
        {
          updatedSelectedItems.push(key);
        }
      });
      setSelectedItems(updatedSelectedItems);

      return newQuantities;
    });
  };

  // Function to add items to the cart
  const handleAddToCart = () => 
  {
    const updatedCart = [...cart];
    menuItems.forEach(menuItem => 
    {
      const qty = quantities[menuItem._id] || 0;
      if (qty > 0) 
      {
        const existingItemIndex = updatedCart.findIndex(cartItem => cartItem._id === menuItem._id);
        if (existingItemIndex >= 0) 
        {
          updatedCart[existingItemIndex].quantity += qty;
        } 
        else 
        {
          updatedCart.push({
            _id: menuItem._id,
            name: menuItem.name,
            quantity: qty,
            price: menuItem.price
          });
        }
      }
    });

    setCart(updatedCart);

    // Reset quantities
    const resetQuantities = {};
    menuItems.forEach(item => {
      resetQuantities[item._id] = 0;
    });
    setQuantities(resetQuantities);
    setIsSidebarVisible(true);
  };

  // Function that handles removing entire items from the cart
  const handleRemoveFromCart = (itemId) => 
  {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  };

// Sidebar component in MenuScreen
const Sidebar = ({ cart, isVisible, onClose, navigation }) => 
{ 
  // Navigation to cart/checkout page
  const closeAndNavigate = () => 
  {
    onClose();
    navigation.navigate('cart');
  };

  // Calculate totals from cart data
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08875; // NYS 8.875% tax rate
  const total = subtotal + tax;

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.sidebarContainer}>

        {/* Sidebar text */}
          <ThemedText style={styles.sidebarTitle}>Your Cart</ThemedText>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <View key={item._id} style={styles.cartItemContainer}>
                  <View style={styles.cartItemDetails}>
                    <ThemedText style={styles.item}>
                      {item.quantity}x {item.name}
                    </ThemedText>
                    <ThemedText style={styles.cartItemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveFromCart(item._id)}
                  >
                    <Icon name="trash" size={20} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <ThemedText>No items in the cart.</ThemedText>
            )}

            <View style={styles.divider} />
            
            {/* Sidebar calculations for the total */}
            <View style={styles.totalsContainer}>
              <ThemedText>Subtotal: ${subtotal.toFixed(2)}</ThemedText>
              <ThemedText>Tax: ${tax.toFixed(2)}</ThemedText>
              <ThemedText style={styles.totalText}>
                Total: ${total.toFixed(2)}
              </ThemedText>
            </View>
            
            <View style={styles.bottomPadding} />
          </ScrollView>

          {/* Sidebar buttons */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>X</ThemedText>
          </TouchableOpacity>

          {cart.length > 0 && (
            <TouchableOpacity onPress={closeAndNavigate} style={styles.navigateButton}>
              <ThemedText style={styles.navigateText}>Checkout</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
  
  // Divider component (just a bold horizontal line)
  const Divider = () => (
  <View style={styles.divider} />
  );

  // Format frontend
  return (
    // Sidebar status
    <View style={styles.container}>
      {isSidebarVisible && (
        <Sidebar 
          selectedItems={selectedItems} 
          onClose={() => setIsSidebarVisible(false)}
          isVisible={isSidebarVisible}
          cart={cart}
          navigation={navigation}
        />
      )}

      {/* Menu Section */}
      <View style={[styles.contentContainer, { marginRight: isSidebarVisible }]}>
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

          {/* Appetizers Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Appetizers</ThemedText>
            {categorizedItems.appetizers.map((item) => (
              <MenuItem
                key={item._id}
                itemId={item._id}
                itemName={item.name}
                itemDescription={item.description}
                itemPrice={item.price}
                itemAllergen={item.allergen}
                onQuantityChange={handleQuantityChange}
                quantities={quantities}
              />
            ))}
          </ThemedView>

          <Divider />

          {/* Main Dishes Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Main Dishes</ThemedText>
            {categorizedItems.mainDishes.map((item) => (
              <MenuItem
                key={item._id}
                itemId={item._id}
                itemName={item.name}
                itemDescription={item.description}
                itemPrice={item.price}
                itemAllergen={item.allergen}
                onQuantityChange={handleQuantityChange}
                quantities={quantities}
              />
            ))}
          </ThemedView>

          <Divider />

          {/* Desserts Section */}
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.subtitle} type="subtitle">Desserts</ThemedText>
            {categorizedItems.desserts.map((item) => (
              <MenuItem
                key={item._id}
                itemId={item._id}
                itemName={item.name}
                itemDescription={item.description}
                itemPrice={item.price}
                itemAllergen={item.allergen}
                onQuantityChange={handleQuantityChange}
                quantities={quantities}
              />
            ))}
          </ThemedView>
        </ParallaxScrollView>

        {/* View Cart button and Sidebar access */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.viewCartButton} onPress={() => setIsSidebarVisible(true)}>
            <View style={styles.iconContainer}>
              <Icon name="shopping-cart" size={36} color="#FFF" style={styles.cartIcon}/>
            </View>
          </TouchableOpacity>
          {Object.values(quantities).some(q => q > 0) && (
            <TouchableOpacity style={styles.fixedButton} onPress={handleAddToCart}>
              <ThemedText>Add to Cart</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// CSS Styles
const styles = StyleSheet.create({
  // Container for everything on MenuScreen
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'relative',
    flexDirection: 'row',
  },
  // Container for the entire menu section
  contentContainer: {
    flex: 1,
    transition: 'margin-right 0.3s',
  },
  // Container for the MenuScreen title
  titleContainer: {
    marginBottom: 20
  },
  // For the TMC logo
  restaurantLogo: {
    height: 200, 
    width: '100%', 
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20, 
  },
  // Container for each menu category
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  // A bold horizontal line
  divider: {
    top: 5,
    height: 3, 
    backgroundColor: '#ccc', 
    marginVertical: 10, 
  },
  // Subtitles in the menu section
  subtitle: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Container for the menu items
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between', 
  },
  // Formatting for menu item images
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  // Container for menu item text
  textContainer: {
    flex: 1,
    paddingRight: 10,
    marginBottom: 20,
  },
  // Container for the menu item quantity counter
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  // Quantity buttons
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
  // Trash can button for removing items from cart
  removeButton: {
    bottom: 3,
  },
  // Container for view cart and add to cart buttons
  fixedButtonContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'column',
  alignItems: 'center',
  },
  // Formatting for view cart button
  viewCartButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#FFA726',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: 60, 
  right: 25, 
  elevation: 5, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  },
  // Container for the shopping cart icon in view cart button
  iconContainer: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  },
  // Formatting of the shopping cart icon
  cartIcon: {
  textAlign: 'center',
  textAlignVertical: 'center',
  alignSelf: 'center',
  right: 0.5,
  bottom: 1,
  },
  // Formatting for the add to cart button
  fixedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 17,
    padding: 15,
    backgroundColor: '#FFA726',
    alignItems: 'center',
  },

  // For Sidebar
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Container for the sidebar component
  sidebarContainer: {
    width: '70%',
    height: '70%',
    backgroundColor: '#D88A3C',
    borderRadius: 10,
    padding: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  // Formatting for the title of the sidebar
  sidebarTitle: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  // Formatting for each item's counter and name in sidebar
  item: {
    top: 20,
    left: 20,
  },
  // Button that closes the sidebar
  closeButton: {
    position: 'absolute',
    marginTop: 5,
    top: 0,
    right: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  // The 'X' in the close button
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  },
  // Formatting of the total text in the sidebar
  totalText: {
    fontWeight: 'bold',
  },
  // Container for all the items in sidebar
  cartItemContainer: {
    marginBottom: 15,
  },
  // Formatting of each item's text in sidebar
  cartItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  // Formatting of each item's price in sidebar
  cartItemPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    width: 100,
    top: 17,
  },
  // Some space/padding
  bottomPadding: {
    height: 60,
  },
  // Formatting for the checkout buton
  navigateButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F54302',
    alignItems: 'center',
  },
  // The text for the checkout button
  navigateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  }

});
