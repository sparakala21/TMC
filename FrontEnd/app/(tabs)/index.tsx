import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.restaurantLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Thunder Mountain Curry!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Our Story</ThemedText>
        <ThemedText>
          At Thunder Mountain Curry, we bring you the bold and spicy flavors of authentic curries,
          freshly prepared with the finest ingredients.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Our Menu</ThemedText>
        <ThemedText>
          Discover a variety of mouthwatering dishes, from the fiery Thunder Chicken Curry to the
          mellow Mountain Coconut Veggie Stew.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Visit Us</ThemedText>
        <ThemedText>
          We're located in the heart of downtown, offering a cozy atmosphere to enjoy your meal.
          Drop by or order online for the ultimate curry experience!
        </ThemedText>
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
  },
  stepContainer: {
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  restaurantLogo: {
    height: 200,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
