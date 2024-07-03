import React, { useState } from "react"
import {View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity, FlatList } from "react-native-gesture-handler";
import {Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";




const HomeScreen = ({navigation}) => {

    const addToCart = async (item) => {
        try {
            const cartItems = await AsyncStorage.getItem('cart');
            let cart = cartItems ? JSON.parse(cartItems) : [];
            cart.push(item);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error(error);
        }
    };

    const products = [
        {
          id: '1',
          image: require('./assets/dress1.png'),
          title: 'Office Wear',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
          id: '2',
          image: require('./assets/dress2.png'),
          title: 'Black',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
          id: '3',
          image: require('./assets/dress3.png'),
          title: 'Church Wear',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
          id: '4',
          image: require('./assets/dress4.png'),
          title: 'Lamerei',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
          id: '5',
          image: require('./assets/dress5.png'),
          title: '21WN',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
          id: '6',
          image: require('./assets/dress6.png'),
          title: 'Lopo',
          description: 'reversible angora cardigan',
          price: '$120',
        },
        {
            id: '7',
            image: require('./assets/dress7.png'),
            title: 'Lopo21WN',
            description: 'reversible angora cardigan',
            price: '$120',
          },
          {
            id: '8',
            image: require('./assets/dress3.png'),
            title: 'lame',
            description: 'reversible angora cardigan',
            price: '$120',
          },
      ];

    const ProductCard = ({item}) => {
        return(
            <View  style={{marginRight:20, marginTop:10}}>
                
                    <View>
                        <Image 
                        source={item.image}
                        />

                        <TouchableOpacity style={styles.add} onPress={() => addToCart(item)}>
                            <Image source={require('./assets/add_circle.png')}/>
                        </TouchableOpacity>
                       
                    </View>
                    
                    <View>
                        <Text style={{fontWeight:'bold',fontSize:20,}}>{item.title}</Text>
                        <Text style={{marginTop:3}}>{item.description}</Text>
                        <Text style={{color:'#dd8560', fontSize:20,marginTop:2}}>{item.price}</Text>
                    </View>
                    

            </View>

        )
    }      

    return(
            <View style={styles.container}>

                <View style={styles.row}>
                    <View>
                        <TouchableOpacity>
                            <Image
                            source={require('./assets/Menu.png')}/>
                        </TouchableOpacity>
                    </View>
                
                    <View>
                        <TouchableOpacity>
                            <Image
                            source={require('./assets/Logo.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style ={styles.row}>
                        <TouchableOpacity>
                            <Image
                            source={require('./assets/Search.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => navigation.navigate('Cart')}>
                            <Image
                            source={require('./assets/shoppingBag.png')}
                            style={{marginLeft:15,}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
    

            <ScrollView>
            
                <View style={[styles.row, {marginTop:35,}]}>
                    <Text style={styles.text}>OUR STORY</Text>

                    <View style ={styles.row}>
                        <TouchableOpacity style={styles.circle}>
                            <Image
                            source={require('./assets/Listview.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.circle, {marginLeft:15}]}>
                            <Image
                            source={require('./assets/Filter.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                

            <FlatList
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                    <ProductCard
                    item={item}
                    />
                )}
                />
            </ScrollView>            
            
            </View>
            
    );
};
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 90,
        marginRight:20,
        marginLeft:20,
    },
    text:{
        fontSize:27,
        fontWeight:'bold',
        marginRight:10,
    },
    row: {
        flexDirection: 'row',
    justifyContent: 'space-between'
    },
    add: {
        position: 'absolute',
        top: -28,
        left: 135,
    },
    circle: {
        height: 45,
        width: 45,
        borderRadius: 30,
        backgroundColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
    },
 });


 export default HomeScreen;

