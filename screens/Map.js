import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ location, markers, addMarker }) {
  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    addMarker(coords);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
        mapType='standard'
        onLongPress={showMarker}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={`Marker ${index + 1}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
