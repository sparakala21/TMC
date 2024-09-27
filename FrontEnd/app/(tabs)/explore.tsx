import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MenuScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.menuLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Our Menu</ThemedText>
      </ThemedView>

      {/* Appetizers Section */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Appetizers</ThemedText>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Samosa Delight</ThemedText>
          <ThemedText>Delicious fried pastries stuffed with spiced potatoes, peas, and herbs. $5.99</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Crispy Vegetable Pakoras</ThemedText>
          <ThemedText>Crunchy, deep-fried vegetable fritters served with chutney. $6.99</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Main Dishes Section */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Main Dishes</ThemedText>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Thunder Chicken Curry</ThemedText>
          <ThemedText>A fiery chicken curry that packs a punch of heat and flavor. $14.99</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Mountain Coconut Veggie Stew</ThemedText>
          <ThemedText>Slow-cooked vegetables in a rich, creamy coconut sauce. $13.99</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Desserts Section */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Desserts</ThemedText>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Mango Lassi</ThemedText>
          <ThemedText>A sweet, refreshing yogurt-based mango drink. $4.99</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.foodImage}
          />
          <ThemedText type="defaultSemiBold">Gulab Jamun</ThemedText>
          <ThemedText>Soft doughnuts soaked in a fragrant syrup. $5.49</ThemedText>
        </ThemedView>
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
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  foodImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  menuLogo: {
    height: 200,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
