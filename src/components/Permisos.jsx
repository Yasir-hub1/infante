import React, { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import * as Contacts from 'expo-contacts'
import * as Location from 'expo-location'

export default function Permisos() {
  const [location, setLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [contacts, setContacts] = useState('')

  const permisos = async() => {
      const { contact } = await Contacts.requestPermissionsAsync()
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted' && contact!=='granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }
      const {data} = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
      })
      const i = 30
      let location = await Location.getCurrentPositionAsync()
      console.log(location)
      let coordenadas = 'Longitud: '+location.coords.longitude+' Latitud: '+location.coords.latitude
      let contacto = data[i].firstName+': '+data[i].phoneNumbers[0].number
      setLocation(coordenadas)
      setContacts(contacto)
    }

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location)
  }

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