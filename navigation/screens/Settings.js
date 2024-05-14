import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

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
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function SettingsContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [location, setLocation] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: 'green' }}

        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#767577', true: 'green' }}

        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Location Services</Text>
        <Switch
          value={location}
          onValueChange={setLocation}
          trackColor={{ false: '#767577', true: 'green' }}  // Change track color here

        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Auto-update</Text>
        <Switch
          value={autoUpdate}
          onValueChange={setAutoUpdate}
          trackColor={{ false: '#767577', true: 'green' }}  // Change track color here
        />
      </View>


      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Change Password</Text>
        {/* Add navigation to change password screen */}
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Language</Text>
        <Picker
          selectedValue={language}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Support</Text>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Help Center</Text>
        {/* Add navigation to help center screen */}
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>About</Text>
        {/* Add navigation to about screen */}
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Log Out</Text>
        {/* Add log out functionality */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    color: '#000',
  },
  settingText: {
    fontSize: 16,
  },
});

