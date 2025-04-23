import { Image, StyleSheet, Platform, TouchableOpacity, Linking } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const Links = require("links.json");
const Text = require("websiteContentText.json");

export default function HomeScreen() {
  
  // Function to handle the clickable image
  const handleInstaImagePress = () => {
    Linking.openURL(Links.Instagram);  // Replace with your actual link
  };

  const handleFaceBookImagePress = () => {
    Linking.openURL(Links.FaceBook);  // Replace with your actual link
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFA726', dark: '#FF7043' }}
      headerImage={
        <Image
          source={require('@/assets/images/'+Links.tranparent_logo)}
          style={styles.restaurantLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{Text.index.title}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{Text.index.subtitle}</ThemedText>
        <ThemedText>
          {Text.index.description}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{Text.index.Subsection}</ThemedText>
        <ThemedText>
          {Text.index.SubsectionDescription}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{Text.index.Subsection2}</ThemedText>
        <ThemedText>
          {Text.index.SubsectionDescription2} </ThemedText>
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
