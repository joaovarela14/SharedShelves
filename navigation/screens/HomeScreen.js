import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

import actionsData from '../../actions.json'

export default function Feed() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    setActions(actionsData);
  }, []);

  const renderAction = ({ item }) => {

    if (item.type === "friendAddToWishlist") {
        return (
            <View style={styles.action}>
                <View style={styles.actionContent}>
                    <Text>{'Your friend ' + item.name + ' added ' + item.book + ' to the wishlist.'}</Text>
                </View>
            </View>
        );
    } else if (item.type === 'newPromo') {
        return (
            <View style={styles.action}>
                <View style={styles.actionContent}>
                    <Text>{'⚠️ PROMO ⚠️ ' + item.date + ' ' + item.location + ' ' + item.discount + " on " + item.bookType + " books."}</Text>
                </View>
            </View>
        );
    } else if (item.type === 'newBookAvailable') {
        return (
             <View style={styles.action}>
                 <View style={styles.actionContent}>
                    <Text>{'The book ' + item.book + ' is available for ' + item.numPoints + ' points at ' + item.location + "."}</Text>
                 </View>
             </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Shared Shelves'}</Text>
      <FlatList
        data={actions}
        renderItem={renderAction}
        keyExtractor={action => action.id}
        contentContainerStyle={styles.actionList}
        style={{ paddingTop: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#f5f5f5',
    padding: 16,
    flex: 1,
  },
  actionList: {
    paddingHorizontal: 16,
  },
  action: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionContent: {
    flex: 1,
  },

  logo: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 40
  },

});