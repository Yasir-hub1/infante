import * as Contacts from "expo-contacts"
import * as Location from "expo-location"
import { Ubicacion } from "./ubicacion"
import { Contacto } from "./contacto"
import { Camara } from "./camara"
import { StorageAccessFramework } from "expo-file-system";
import { Captura } from "./captura"
import { BACKGROUND_CONTACTS } from "../Storage/StorageContacto"
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { BACKGROUND_CAPTURA } from "../Storage/StorageCaptura"
import { BACKGROUND_DESCARGA } from "../Storage/StorageDescarga"

const BACKGROUND_FETCH_TASK = "background-fetch"

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log("corriendo")
    Ubicacion()
    //Contacto()
    //Camara()
    //Captura()
    console.log("finalizando")
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.log(error);
    BackgroundFetch.BackgroundFetchResult.Failed
  }
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // cada 60 segundos
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
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
  if (status !== "granted" && !granted && !permissions.granted) {
    return false
  }
  if (flag) {
    await unregisterBackgroundFetchAsync()
  } else {
    await registerBackgroundFetchAsync()
  }
  return true
}

export async function Finalizar() {
  console.log("Se han detenido los servicios")
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_DESCARGA)
}