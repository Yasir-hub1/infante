import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { captureScreen } from "react-native-view-shot";
import * as Contacts from "expo-contacts";
import * as Location from "expo-location";

const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log("first");
  try {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => console.log("Imagen guardada en: ", uri),
      (error) => console.error("Oops, no se pudo capturar la pantalla", error)
    );
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
      ],
    });
    //data contiene todos los contactos, la constante i se usa para seleccionar el contacto de esa posicion para el ejemplo
    const i = 30;
    let location = await Location.getCurrentPositionAsync();
    //location contiene las coordenadas
    let coordenadas =
      "Longitud: " +
      location.coords.longitude +
      " Latitud: " +
      location.coords.latitude;
    let contacto = data[i].firstName + ": " + data[i].phoneNumbers[0].number; //para todos los contactos poner en bucle
    console.log(coordenadas, contacto);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 30, // cada 30 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    const { contact } = await Contacts.requestPermissionsAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted" && contact !== "granted") {
      return "Debe aceptar los permisos para poder empezar";
    }
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          <Text style={styles.boldText}>
            {isRegistered
              ? BACKGROUND_FETCH_TASK
              : "Inicie y acepte los permisos"}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? "Detener Servicio" : "Iniciar servicio"}
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
