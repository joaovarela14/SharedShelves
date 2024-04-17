import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BooksScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ShelfScreen from './screens/ShelfScreen';
import SettingsScreen from './screens/Settings';
import DonateScreen from './screens/Donate';
import FirstPage from './screens/FirstPage';
import Login from './screens/Login';
import Register from './screens/Register';

// Screen names
const HomeScreenName = 'Home';
const BookScreenName = 'Book';
const ProfileScreenName = 'Profile';
const SearchScreenName = 'Search';
const ShelfScreenName = 'Shelf';





const Stack = createStackNavigator();

export function MainTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='FirstPage'
      
      screenOptions={({ route }) => ({
        headerShown: false,
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let sizeIcon = 28;
          let underlineStyle = {};

          if (route.name === HomeScreenName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === SearchScreenName) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === BookScreenName) {
            iconName = focused ? 'book' : 'book-outline';
            sizeIcon = 42;
          } else if (route.name === ShelfScreenName) {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === ProfileScreenName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          if (focused) {
            underlineStyle = {
                borderBottomWidth: 2,
                borderBottomColor: 'black'  // Adjust the color to match your tab bar's theme
            };
        }

        return (
          <View style={{ alignItems: 'center' }}>
              <Ionicons name={iconName} size={sizeIcon} color={'black'} />
              <View style={[{ width: sizeIcon }, underlineStyle]} />
          </View>
      );

        },
        tabBarStyle: {
          backgroundColor: '#3A8D5B',
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          elevation: 0,
          height: 60,
          position: 'absolute',
          bottom: 13,
          left: 17,
          right: 17,
          borderRadius: 10,
          
        },

        tabBarLabelStyle: {
          fontSize: 0,
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
      <Tab.Screen name="Donate" component={DonateScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarButton: () => null }} />
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
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Donate" component={DonateScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
