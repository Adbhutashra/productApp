import React, {useState, useEffect, useRef} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';

const ProductDetailScreen = ({route}) => {
  const {product} = route.params;
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let mapRef = useRef(null);

  async function requestGPSLocation() {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        requestLocationPermission();
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'We need access to your location to provide better services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getLocation = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          console.log('error geolocation', error);
          reject(error);
        },
        {enableHighAccuracy: false},
      );
    });
  }, []);

  useEffect(() => {
    (async () => {
      await requestGPSLocation();
      getLocation()
        .then(async U => {
          await setRegion({
            latitude: U.coords.latitude,
            longitude: U.coords.longitude,
          });
          await mapRef.current.animateToRegion({
            latitude: U.coords.latitude,
            longitude: U.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        })
        .catch(e => {
          console.log(e);
        });
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>{product?.title}</Text>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
    </View>
  );
};

export default ProductDetailScreen;
