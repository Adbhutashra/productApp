import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

const ProductsScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        const total = data.reduce((sum, product) => sum + product.price, 0);
        setTotalPrice(total);
      });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {product: item})}
      style={{padding: 10, borderBottomWidth: 1}}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{padding: 20}}>
          <Text>Total Price of All Products: ${totalPrice.toFixed(2)}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AddProduct')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6711/6711415.png',
            }}
            style={{height: 40, width: 40}}
          />
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ProductsScreen;
