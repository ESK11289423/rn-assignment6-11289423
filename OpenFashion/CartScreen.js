import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try{
                const cart = await AsyncStorage.getItem('cart');
                if(cart) {
                    setCartItems(JSON.parse(cart));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCartItems();
    }, []);


    const removeFromCart = async (removeItem) => {
        try{
            const updatedCart = cartItems.filter(item => item.id !== removeItem.id);
            setCartItems(updatedCart);
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };

    const Cart = ({item}) => {
        return (
            <View style={styles.imgRow}>
                <Image source={item.image} style={{height: 170, width: 130}}/>
                <View style={styles.cartItem}>
                    <Text style={{fontWeight:'600'}}>{item.title}</Text>
                    <Text style={{fontSize:13}}>{item.description}</Text>
                    <Text style={{color:'#dd8560', fontWeight:'bold', fontSize:17, marginTop:3}}>{item.price}</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeBtn}>
                        <Image source={require('./assets/remove.png')} style={{height: 25, width:25}}/>
                    </TouchableOpacity>
                </View>
                     
            </View>
        )
    };

  return (
    <View style={styles.container}>
        <View style={styles.row}>
          <View style={{ marginLeft: '30%' }}>
            <Image source={require('./assets/Logo.png')} style={{ marginLeft: 20, width: 100, height: 40, alignSelf: 'center' }} />
          </View>
          <View style={{ marginLeft: '30%' }}>
            <TouchableOpacity>
              <Image source={require('./assets/Search.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginLeft: '30%' }}>
          <Image source={require('./assets/checkout.png')} style={{ marginRight: 100, marginTop: 30, width: 250, height: 60, alignSelf: 'center' }} />
        </View>

        <ScrollView>

        <FlatList
            data={cartItems}
            renderItem={Cart}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />

      </ScrollView>

        <View style={styles.row}>
            <Text style={styles.totalText}>EST. TOTAL</Text>
            <Text style={styles.amountText}>$240</Text>
        </View>

        <View>

        <View style={[styles.row, {marginTop: 40}]}>
            <Text style={styles.totalText}>EST. TOTAL</Text>
            <Text style={styles.amountText}>$240</Text>
        </View>

        <View style={styles.checkoutContainer}>
            <TouchableOpacity>
                <Image source={require('./assets/shoppingBag.png')} style={{tintColor: '#fff', position: 'absolute'}}/>
                <Text style={[styles.checkout, {marginLeft: 38, marginTop: 4}]}>CHECKOUT</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    marginLeft: 20,
    marginRight: 20
  },
  checkoutContainer: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: -20,
    marginRight: -20
  },
  totalText: {
    color: '#000',
    fontSize: 18,
    marginTop: 16
  },
  amountText: {
    color: '#f25a41',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkout: {
    color: '#fff',
    fontSize: 18,
  },
  imgRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cartItem: {
    justifyContent: 'center',
    marginLeft: -20
  },
  removeBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default CartScreen;
