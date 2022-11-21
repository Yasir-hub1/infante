import { StyleSheet, View, Text } from "react-native";
import CustonButton from "../CustonButton";
import * as Location from "expo-location";
import React, { useState,useEffect } from "react";

//url
import { storageUbicacion } from "../../util/Apis";
/// ACCESSO AL DIRECTORIO CAMERA

export const StorageUbicacion = ({ onPress, foregroundSubscription }) => {
  const [Coord, setCoord] = useState(null);

  const permisos = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Asegúrese de que el seguimiento de la ubicación en primer plano no se esté ejecutando
    foregroundSubscription?.remove();

    // Empezar a ver la posición en tiempo real
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // Para obtener mejores registros, establecemos la precisión en la opción más sensible
        accuracy: Location.Accuracy.High,
        /* distanceInterval: 5  /* actualización de coordenadas cada 5 metros */
        timeInterval: 5000 /* intervalo de tiempo de espera en cada actualización */,
        /* mayShowUserSettingsDialog:true, */
      },
      async (location) => {
        setCoord({
         latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        console.log("location: " + JSON.stringify(location));

        let formData = new FormData();
        formData.append("coordenadas", [
          location.coords.latitude,
          location.coords.longitude,
        ]);
        await fetch(storageUbicacion, {
          method: "POST",
          body: formData,
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-amz-json-1.1",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error", error))
          .then((response) => {
            console.log("DESDE EL RESPONSE ", response);
          });
      }
    );
  };

  //Enviando coordenadas cada cierto tiempo
  // funcion  de intervalo de tiempo para reescanear la ultima foto
  const actualizarFotoConIntervalo = async () => {
    await setInterval(permisos, 5000);
  };
  useEffect(() => {
    actualizarFotoConIntervalo
  }, [Coord])
  
  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos de ubicacion
      </Text>
      <View
        style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
      >
        <CustonButton label={"Aceptar"} padding={10} onPress={permisos} />

        <View style={{ margin: 20 }} />

        <CustonButton label={"Cerrar"} padding={10} onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  btn: {},
});

export default StorageUbicacion;
