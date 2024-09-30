import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './screens/Map';
import { useState, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppbar from './components/MainAppbar';
import * as Location from 'expo-location';

const settings = {
  backGround: '#00a484',
};

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps',
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know);
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  const getUserPosition = async () => {
    setIcon(icons.location_searching);
    let { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== 'granted') {
        console.log("Geolocation not granted");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setIcon(icons.location_found);
    } catch (error) {
      console.log(error);
    }
  };

  const addMarker = (coords) => {
    setMarkers((prevMarkers) => [...prevMarkers, coords]);
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <MainAppbar
        title="Map"
        backgroundColor={settings.backGround}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <Map location={location} markers={markers} addMarker={addMarker} />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
