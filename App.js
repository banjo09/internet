import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, FlatList, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import CreateProductModal from './components/CreateProductModal';
import { ProductItem } from './components/ProductItem';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [modelIsVisible, setmodelIsVisible] = useState(false);

  function addProductHandler(productDetails) {
    setProducts((products) => [...products, { ...productDetails, id: Math.random().toString() }])
  }

  function openModalHandler() {
    setmodelIsVisible(true);
  }

  function closeModalHandler() {
    setmodelIsVisible(false);
  }

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Internet Pages',
        body: 'Maximum number of products added.',
      },
      trigger: {
        seconds: 2,
      },
    });
  }

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED');
        console.log(notification);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(()=>{
    if (products?.length === 5)(scheduleNotificationHandler() )
  }, [products?.length])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.topic}>My Products</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Add product info'
            color="#5e0acc"
            onPress={openModalHandler}
          />
        </View>
        <CreateProductModal
          visible={modelIsVisible}
          onAddProduct={addProductHandler}
          onCancel={closeModalHandler}
          products={products}
        />
        <View style={styles.List}>
          <FlatList
            data={products}
            renderItem={(itemData) => <ProductItem itemData={itemData} />}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          >
          </FlatList>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e085a',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20
  }
});
