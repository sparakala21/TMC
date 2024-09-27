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
          source={require('@/assets/images/TMC_Logo.png')}
          style={styles.restaurantLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Thunder Mountain Curry!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Our Story</ThemedText>
        <ThemedText>
          From our beginnings out of a hot dog cart to the RPI Student Union, the Troy Waterfront Farmer's Market, and our Pandemic Pop-Ups, TMC has never wavered from our mission - to bring the Troy, NY community a mouth-watering culinary adventure straight from the streets. Our new journey takes us back to our roots as a true street food experience. Follow us on Instagram and FaceBook to see where we're serving today!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Our Food</ThemedText>
        <ThemedText>
          Thunder Mountain Curry focuses on quality ingredients and authentic Pan-Asian recipes with our own twist.  
          TMC is a unique street food experience for those seeking a delicious and satisfying culinary adventure.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Visit Us</ThemedText>
        <ThemedText>
          Now at the Troy Waterfront Farmers Market and in front of the RPI Student Union - follow us to find out when!
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
    width: '100%', 
    resizeMode: 'contain',
    marginBottom: 20, 
  },
});
