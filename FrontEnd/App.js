import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

// You can create multiple screens as separate components
const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Welcome to My Expo App!</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
  </SafeAreaView>
);

const DetailsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>This is the Details Screen</Text>
  </SafeAreaView>
);

// Main App component
export default function App() {
  // Set up a simple navigation container
  const [currentScreen, setCurrentScreen] = React.useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Details':
        return <DetailsScreen />;
      default:
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
