import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
  // State to track quantities of menu items
  const [quantities, setQuantities] = useState({
    samosa: 0,
    pakoras: 0,
    chickenCurry: 0,
    veggieStew: 0,
    mangoLassi: 0,
    gulabJamun: 0,
  });

  // Change quantities
  const handleQuantityChange = (item, change) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change), // Ensure quantity doesn't go below 0
    }));
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
        <ThemedText type="title">Our Menu</ThemedText>
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
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
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
  subtitle: {
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'space-between', 
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10, // Space between text and image
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
    marginHorizontal: 8, // Space between buttons
    width: 30, // Set a fixed width for uniformity
    alignItems: 'center', // Center text inside the button
    justifyContent: 'center',
  },
});