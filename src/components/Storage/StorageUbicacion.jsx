import { StyleSheet, View, Text } from "react-native";
import CustonButton from "../CustonButton";
import * as Location from 'expo-location';
import React, { useState, useEffect } from "react";

//url
import { storageUbicacion } from "../../util/Apis";
/// ACCESSO AL DIRECTORIO CAMERA

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

export const BACKGROUND_UBICACION = "background-ubicacion"

TaskManager.defineTask(BACKGROUND_UBICACION, async () => {
  try {
    console.log("UBICACION ON")
    let location = await Location.getCurrentPositionAsync({});
        let formData = new FormData();
        formData.append("latitude", [
          location.coords.latitude,
        ]);
        formData.append("longitude", [
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
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  console.log("llamando ubicacion")
  return BackgroundFetch.registerTaskAsync(BACKGROUND_UBICACION, {
    minimumInterval: 10, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregister() {
  console.log("Servicio camara detenido")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_UBICACION)
}

export const StorageUbicacion = () => {

  const permisos = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (!status) {
      console.log("location tracking denied");
      return;
    }
    registerBackgroundFetchAsync()
  };

  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos de ubicacion
      </Text>
      <View
        style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
      >
        <CustonButton label={"Aceptar"} padding={10} onPress={()=>{ permisos()}} />

        <View style={{ margin: 20 }} />

        <CustonButton label={"Cerrar"} padding={10} onPress={()=>{unregister(),onPress()}} />
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
