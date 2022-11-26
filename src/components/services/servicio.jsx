import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Contacts from "expo-contacts"
import * as Location from "expo-location"
import { Ubicacion } from "./ubicacion"
import { Contacto } from "./contacto"
import { Camara } from "./camara"
import { StorageAccessFramework } from "expo-file-system";
import { Captura } from "./captura"

const BACKGROUND_FETCH_TASK = "background-fetch"

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log("corriendo")
    Contacto()
    //Camara()
    //Captura()
    //Ubicacion()
    console.log("finalizando")
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 10, // cada 60 segundos
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

export default async function SegundoPlano(flag) {
  const { status } = await Contacts.requestPermissionsAsync()
  const { granted } = await Location.getForegroundPermissionsAsync()
  if (status !== "granted" && !granted) {
    return false
  }
  if (flag) {
    await unregisterBackgroundFetchAsync()
  } else {
    await registerBackgroundFetchAsync()
  }
  return true
}
