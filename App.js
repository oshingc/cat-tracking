import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas
import HomeScreen from './src/screens/HomeScreen';
import TrackingScreen from './src/screens/TrackingScreen';
import RemindersScreen from './src/screens/RemindersScreen';
import JournalScreen from './src/screens/JournalScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddRecordScreen from './src/screens/AddRecordScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TrackingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TrackingMain" 
        component={TrackingScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddRecord" 
        component={AddRecordScreen}
        options={{ 
          title: 'Agregar Registro',
          headerStyle: { backgroundColor: '#FF6B9D' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#FF6B9D" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tracking') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'Reminders') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Journal') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'paw' : 'paw-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B9D',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tracking" component={TrackingStack} />
        <Tab.Screen name="Reminders" component={RemindersScreen} />
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
