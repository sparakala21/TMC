import { Image, StyleSheet, Platform, TouchableOpacity, Linking } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  
  // Function to handle the clickable image
  const handleInstaImagePress = () => {
    Linking.openURL('https://www.instagram.com/thundermountaincurry/');  // Replace with your actual link
  };

  const handleFaceBookImagePress = () => {
    Linking.openURL('https://www.facebook.com/thundermountaincurry');  // Replace with your actual link
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
        <ThemedView style={styles.imageRowContainer}>
          <TouchableOpacity onPress={handleInstaImagePress}>
            <Image
              source={require('@/assets/images/Instagram_Glyph_Gradient.png')}  // Replace with your image path
              style={styles.clickableImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFaceBookImagePress}>
            <Image
              source={require('@/assets/images/Facebook_Logo_Primary.png')}  // Replace with your image path
              style={styles.clickableImage}
            />
          </TouchableOpacity>
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
  clickableImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  clickableImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  imageRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 20,
  },
});
