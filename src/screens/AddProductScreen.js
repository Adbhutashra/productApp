import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const AddProductScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const addProduct = () => {
    const payload = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data);
        navigation.navigate('ProductDetail', {product: data});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={{padding: 20}}>
      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      <Text>Price:</Text>
      <TextInput
        value={price}
        keyboardType="number-pad"
        onChangeText={setPrice}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      <Text>Image URL:</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      <Text>Category:</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
      />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

export default AddProductScreen;
