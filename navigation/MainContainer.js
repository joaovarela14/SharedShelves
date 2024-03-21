import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BooksScreen';
import ProfileScreen from './screens/ProfileScreen';

// Screen names
const HomeScreenName = 'Home';
const BookScreenName = 'Book';
const ProfileScreenName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === HomeScreenName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === BookScreenName) {
              iconName = focused ? 'book' : 'book-outline';
            }
            else if (route.name === ProfileScreenName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Return an Ionicons component with the correct icon name and styles
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name={HomeScreenName} component={HomeScreen} />
        <Tab.Screen name={BookScreenName} component={BookScreen} />
        <Tab.Screen name={ProfileScreenName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
