import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import * as Contacts from 'expo-contacts'
import * as Location from 'expo-location'  
import { captureScreen, releaseCapture } from "react-native-view-shot"

export default function Permisos() {
  const [location, setLocation] = useState('')
  const [contacts, setContacts] = useState('')

  const permisos = async() => {
      const { contact } = await Contacts.requestPermissionsAsync()
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted' && contact !== 'granted') {
        setLocation('Debe aceptar los permisos para poder empezar')
        return
      }
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
      })
      //data contiene todos los contactos, la constante i se usa para seleccionar el contacto de esa posicion para el ejemplo
      const i = 30
      let location = await Location.getCurrentPositionAsync()
      //location contiene las coordenadas
      console.log(location)
      let coordenadas = 'Longitud: '+location.coords.longitude+' Latitud: '+location.coords.latitude
      let contacto = data[i].firstName+': '+data[i].phoneNumbers[0].number
      setLocation(coordenadas)
      setContacts(contacto)
      captureRef()
    }

    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => console.log("Imagen guardada en: ", uri),
      (error) => console.error("Oops, no se pudo capturar la pantalla", error)
    )
      //se toma la captura y se guarda en un archivo temporal, la ruta se guarda en uri
    // releaseCapture(uri) -> metodo para borrar el archivo temporal

  return (
    <View style={{ alignItems: 'center', marginTop: '50%' }}>
      <Button
        title="Permisos"
        onPress={permisos}
      />
      <Text>{location}</Text>
      <Text>{contacts}</Text>
    </View>
  );
}
