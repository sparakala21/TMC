import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
  

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAdmin = true;

  if(isAdmin){
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
              title: 'Cart',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
              ),
            }}
          />
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
        </Tabs>
      </ThemeProvider>
    );
  }else{
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
              title: 'Cart',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemeProvider>
    );
  }

}
