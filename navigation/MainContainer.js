import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BooksScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ShelfScreen from './screens/ShelfScreen';
import SettingsScreen from './screens/Settings';

// Screen names
const HomeScreenName = 'Home';
const BookScreenName = 'Book';
const ProfileScreenName = 'Profile';
const SearchScreenName = 'Search';
const ShelfScreenName = 'Shelf';
const SettingsScreenName = 'Settings';


const Stack = createStackNavigator();

export function MainTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === HomeScreenName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === SearchScreenName) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === BookScreenName) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === ShelfScreenName) {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === ProfileScreenName) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={28} color={'black'} />;
        },
        tabBarStyle: {
          backgroundColor: '#9F8772',
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          elevation: 0,
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name={HomeScreenName} component={HomeScreen} />
      <Tab.Screen name={SearchScreenName} component={SearchScreen} />
      <Tab.Screen name={BookScreenName} component={BookScreen} />
      <Tab.Screen name={ShelfScreenName} component={ShelfScreen} />
      <Tab.Screen name={ProfileScreenName} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,


        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
