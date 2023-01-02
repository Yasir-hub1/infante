import {
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";


import { StorageAccessFramework } from "expo-file-system";
import CustonButton from "../CustonButton";

//url
import { storageTelegram } from "../../util/Apis";

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

/* IDE DE INFANTE */
import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";



export const BACKGROUND_TELEGRAM = "background-telegram"

TaskManager.defineTask(BACKGROUND_TELEGRAM, async () => {
  try {
    console.log("TELEGRAM ON")

    const rutaTelegram = await AsyncStorage.getItem('@telegram')
    console.log("TELEGRAM ", rutaTelegram)

    const files = await StorageAccessFramework.readDirectoryAsync(rutaTelegram).catch((err) => console.error("DESDE obtenerFotoCamara telegram ", err));

    // console.log(`Files inside ${Permiso}:\n\n${JSON.stringify(files.length)}`);
    const uriFoto = files[files.length - 1]
    const id_hijo = await AsyncStorage.getItem('@id_hijo');
    console.log("get telegram ", id_hijo);

    console.log("MOSTRANDO LA FOTO telegram", files[files.length - 1]);
    let localUri = uriFoto;
    let filename = localUri.split("/").pop();
    console.log("FILENAME ", filename);
    const file = {
      uri: localUri,
      name: filename,
      type: "image/jpg",
    };

    let formData = new FormData();
    formData.append("fotos", file);
    formData.append("id_hijo", parseInt(id_hijo));
    console.log("FormData", JSON.stringify(formData));
    await fetch(storageTelegram, {
      method: "POST",
      body: formData,
      header: {
        Accept: "application/json",
        // 'Content-Type':'application/json'
        "Content-Type": "application/x-amz-json-1.1",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error", error))
      .then((response) => {
        console.log("DESDE EL RESPONSE telegram", response);
      });
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  console.log("llamando telegram")
  return BackgroundFetch.registerTaskAsync(BACKGROUND_TELEGRAM, {
    minimumInterval: 1, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregister() {
  console.log("Servicio telegram detenido")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_TELEGRAM)
}

/// ACCESSO AL DIRECTORIO Telegram
export const StorageTelegram = ({ onPress }) => {


  const PermisoStorage = async () => {
    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync().catch(
        (err) => console.error("DESDE PermisoStorage ", err)
      );

    if (permissions.granted) {

      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      console.log("Permisos telegram", `"${uri}"`);
      await AsyncStorage.setItem('@telegram', uri);
      registerBackgroundFetchAsync()
    }
  };

  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos del dispositivo para acceder a la carpeta
        de Telegram
      </Text>

      <View
        style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
      >
        <CustonButton label={"Aceptar"} padding={10} onPress={() => { PermisoStorage(), onPress() }} />

        <View style={{ margin: 20 }} />

        <CustonButton label={"Cerrar"} padding={10} onPress={() => { unregister(), onPress() }} />

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

export default StorageTelegram;
