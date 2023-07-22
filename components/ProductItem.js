import * as React from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";


const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth * 1) / 2;

export function ProductItem({ itemData }) {

  return (
    <View style={styles.productContainer}>
      <Image
        // source={require("../../../assets/main/png/organisation.png")}
        style={styles.image}
        source={{ uri: itemData.item.productImage }}
      />
      <View style={styles.contentStyle}>
        <View>
          <Text style={styles.title}>
            {itemData.item.name}
          </Text>

        </View>
        <View style={styles.price}>
          <Text style={styles.text}>
            {itemData.item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
    marginBottom: 35,
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 5,
    // tintColor: "transparent",
  },
  price: {
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 5,
    // backgroundColor: '#e4d0ff',
    // borderRadius: 5,
    // padding: 7
    alignItems: 'flex-start'
  },
  contentStyle: {
    marginTop: 7,
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'capitalize'
  },
  text: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
    backgroundColor: '#e4d0ff',
    borderRadius: 5,
    padding: 7
  },
})