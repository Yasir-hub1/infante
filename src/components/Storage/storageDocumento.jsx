import {
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";


import { StorageAccessFramework } from "expo-file-system";
import CustonButton from "../CustonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
//url
import { storageDocumento } from "../../util/Apis";

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"


/* IDE DE INFANTE */
import React from "react";



export const BACKGROUND_DOCUMENTO = "background-documento"
TaskManager.defineTask(BACKGROUND_DOCUMENTO, async () => {
  try {
    console.log("DOCUMENTO ON")

    const rutaDocumento=await AsyncStorage.getItem('@documento');
    console.log("Get ruta ",rutaDocumento);

    const files = await StorageAccessFramework.readDirectoryAsync(rutaDocumento).catch((err) => console.error("DESDE obtenerFotoDOCUMENTO ", err));

    // console.log(`Files inside ${Permiso}:\n\n${JSON.stringify(files.length)}`);
    const uriFoto = files[files.length - 1]
    const id_hijo = await AsyncStorage.getItem('@id_hijo');
    console.log("get ", id_hijo);

    console.log("MOSTRANDO LA FOTO CAMARA", files[files.length - 1]);
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
    await fetch(storageDocumento, {
      method: "POST",
      body: formData,
      header: {
        Accept: "application/json",
        // 'Content-Type':'application/json'
        "Content-Type": "application/x-amz-json-1.1",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error DOCUMENTO", error))
      .then((response) => {
        console.log("DESDE EL RESPONSE DOCUMENTO ", response);
      })
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error)
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  console.log("llamando DOCUMENTO")
  return BackgroundFetch.registerTaskAsync(BACKGROUND_DOCUMENTO, {
    minimumInterval: 1, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregister() {
  console.log("Servicio DOCUMENTO detenido")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_DOCUMENTO)
}

/// ACCESSO AL DIRECTORIO Documento
export const StorageDocumento = ({ onPress }) => {

  const PermisoStorage = async () => {
    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync().catch(
        (err) => console.error("DESDE PermisoStorage ", err)
      );

    if (permissions.granted) {
     
      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      console.log("Permisos DOCUMENTO", `"${uri}"`);
      await AsyncStorage.setItem('@documento',uri);
   
      registerBackgroundFetchAsync()
    }
  };
  

  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos del dispositivo para acceder a la carpeta
        de documentos
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

export default StorageDocumento;
