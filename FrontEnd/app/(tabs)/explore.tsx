import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Modal, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000';

// MenuItem object
const MenuItem = ({ itemId, itemName, itemDescription, itemPrice, itemImage, itemAllergen, onQuantityChange, quantities }) => (
  <ThemedView style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <ThemedText type="defaultSemiBold">{itemName}</ThemedText>
      <ThemedText>{itemDescription}</ThemedText>
      {itemAllergen && <ThemedText>Allergens: {itemAllergen}</ThemedText>}
      <ThemedText>Price: ${Number(itemPrice).toFixed(2)}</ThemedText>
      
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
    <Image
      source={itemImage ? { uri: itemImage } : require('@/assets/images/icon.png')}
      style={styles.foodImage}
    />
  </ThemedView>
);

// The components of the MenuScreen
export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState([]);
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
        const response = await axios.get(`${BACKEND_URL}/menuItems`);
        const items = Array.isArray(response.data) ? response.data : [];
        setMenuItems(items);
        
        // Initialize quantities state with all items set to 0
        const initialQuantities = {};
        items.forEach(item => 
        {
          initialQuantities[item.name] = 0;
        });
        setQuantities(initialQuantities);

        // Categorize items
        const categorized = 
        {
          appetizers: items.filter(item => item.category === 'appetizer'),
          mainDishes: items.filter(item => item.category === 'main'),
          desserts: items.filter(item => item.category === 'dessert')
        };
        setCategorizedItems(categorized);
      } 
      
      catch (error) 
      {
        console.error('Error fetching menu items:', error);
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

// Sidebar component in MenuScreen
const Sidebar = ({ cart, isVisible, onClose }) => 
{
  const navigation = useNavigation();
  
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
          <ThemedText style={styles.sidebarTitle}>Your Cart</ThemedText>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cart.length > 0 ? (
              cart.map((item) => (
                <View key={item._id} style={styles.itemContainer}>
                  <View style={styles.cartItemDetails}>
                    <ThemedText style={styles.item}>
                      {item.quantity}x {item.name}
                    </ThemedText>
                    <ThemedText style={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </ThemedText>
                  </View>
                </View>
              ))
            ) : (
              <ThemedText>No items in the cart.</ThemedText>
            )}

            <View style={styles.divider} />
            
            <View style={styles.totalsContainer}>
              <ThemedText>Subtotal: ${subtotal.toFixed(2)}</ThemedText>
              <ThemedText>Tax: ${tax.toFixed(2)}</ThemedText>
              <ThemedText type="defaultSemiBold">
                Total: ${total.toFixed(2)}
              </ThemedText>
            </View>
            
            <View style={styles.bottomPadding} />
          </ScrollView>

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
  fixedButtonContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'column',
  alignItems: 'center',
  },
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
  iconContainer: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  },
  cartIcon: {
  textAlign: 'center',
  textAlignVertical: 'center',
  alignSelf: 'center',
  right: 0.5,
  bottom: 1,
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
  // For Sidebar
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  sidebarTitle: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  item: {
    top: 20,
  },
  // For Sidebar
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
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  },
  // Only used to right justify the prices in sidebar
  itemPrice: {
    top: 20,
    textAlign: 'right',
  },
  bottomPadding: {
    height: 60,
  },
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
  navigateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e5dccf',
  }

});
