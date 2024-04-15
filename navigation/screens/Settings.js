import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function SettingsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsContent}
        options={({ navigation }) => ({
          headerTitle: 'Settings',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

    </Stack.Navigator>
  );
}

function SettingsContent() {
  return (
    <View style={styles.container}>

      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch />
      </View>

      <View style={styles.setting}>
        <Text>Notifications</Text>
        <Switch />
      </View>

      <View style={styles.setting}>
        <Text>Language</Text>
        {/* Here you can add a dropdown or other input for language selection */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});
