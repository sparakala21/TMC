import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useAuth } from '../components/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loggedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user exists and has admin role
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', // Black in dark mode, white in light mode
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Checkout',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
            ),
          }}
        />
        {isAdmin && (
          <Tabs.Screen
            name="adminpage"
            options={{
              title: 'Admin',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
              ),
              lazy: true,
            }}
          />
        )}
      </Tabs>
    </ThemeProvider>
  );
}