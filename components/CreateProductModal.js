import React, { useState } from 'react';
import { StyleSheet, Modal, TextInput, Button, View, Text, Image, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";

export default function CreateProductModal({
  onAddProduct,
  onCancel,
  visible,
  products
}) {

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageName, setImageName] = useState();
  const [productImage, setProductImage] = useState(null);

  function onAddProductHandler() {
    if (name === '' || price === '' || productImage === '') {
      Alert.alert(
        'Empty fields',
        'Please make sure that the name, price or image fields are filled.'
      );
      return;
    };
    onAddProduct({
      name,
      price,
      productImage
    });
    setName('');
    setPrice('');
    setImageName('');
    setProductImage('');
    onCancel();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
      var filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1,
        result.assets[0].uri.length
      );
      setImageName(filename);
    }
  };



  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Text style={styles.topic}>
          Product Details
        </Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
            placeholder='Enter your name'
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>
            Price
          </Text>
          <TextInput
            value={price}
            onChangeText={(text) => setPrice(text)}
            style={styles.textInput}
            placeholder='Enter your price'
            keyboardType='number-pad'
          />
        </View>
        <View style={styles.inputWrapper}>
          {
            productImage && <Image
              source={{ uri: productImage }}
              style={styles.image}
            />
          }
          <Text style={styles.text}>
            Upload Product Image
          </Text>

          <View style={styles.browseWrapper}>
            <View style={styles.fileStyle}>
              {!productImage ? (
                <Text style={styles.browseLabel}>
                  No file selected
                </Text>
              ) : (
                <Text fontSize='15'>{imageName}</Text>
              )}
            </View>
            <View style={styles.browseBtn}>
              <Button active title="Browse" textColor='#ffffff' onPress={pickImage} />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Button
              title='ADD PRODUCT'
              color='#5e0acc'
              onPress={onAddProductHandler}
              disabled={products?.length === 5}
            />
          </View>
          <View>
            <Button
              title='CANCEL'
              color='#f31282'
              onPress={onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    backgroundColor: '#311b6b'
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    padding: 5,
    marginRight: 4,
    marginTop: 5,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 6,
    marginBottom: 20,
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20
  },
  browseLabel: {
    fontSize: 15,
    color: '#808080',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  inputWrapper: {
    marginBottom: 20,
    width: "95%",
  },
  browseWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    borderColor: '#0f0f0f',
    marginTop: 5,
    backgroundColor: '#e4d0ff',
  },

  fileStyle: {
    width: "65%",
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  browseBtn: {
    width: "30%",
  },
})
