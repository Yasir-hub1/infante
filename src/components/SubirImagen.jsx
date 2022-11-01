import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';

//El siguiente componente debe ser descargado de la página de expo
import * as ImagePicker from 'expo-image-picker';

//Función que contiene el componente para seleccionar imagenes de la galería
//************************************* */
function ImagePickerChoose(props) {
  // console.log("desde los props ",props);
  const [image, setImage] = useState(null);
  const [photoStatus, setPhotoStatus] = useState('No se ha seleccionado ninguna imágen');
  //controla que los permisos para acceder a la galería hayan sido dados
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Lo sentimos, se necesitan permisos para acceder a la galería');
        }
      }
    })();
  }, []);
  //Selecciona una imágen de manera asincrina desde la galeria y cuando se carga
  //manda a llamar a la función parentCallBack para enviarle el uri al componente padre
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("PICK IMAGE ",result);
    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoStatus('Listo!, imágen cargada correctamente')
    }
    props.parentCallBack(result)
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Button
        title="Seleccionar imágen"
        onPress={pickImage}
      />
      <Text style={{ fontSize: 12, marginBottom: 20, color: "#888888" }}>{photoStatus}</Text>
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
    </View>
  );
}


//Clase principal
class SubirImagen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',//obtiene la imagen del componente ImagePickerChoose
    }
  }
  setImageState = (img) => {
    this.setState({
      image: img.uri
    })
  }

  //función para subir imagen al server, en este caso es un servidor en PHP
  uploadImage = async () => {
      let localUri = this.state.image;
    let filename = localUri.split('/').pop();
    console.log ("filename ",filename);
    const file={
         uri: localUri,
         name:filename,
         type:'image/jpg'
    }

    let formData = new FormData();
    formData.append('fotos',file);

    return await fetch('http://192.168.100.184:8000/api/control', {
      method: 'POST',
      body:formData,
      header: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
        // 'Content-Type': 'application/x-amz-json-1.1'
      },
    }).then(res =>res.json())
      .catch(error => console.error('Error', error))
      .then(response => {
        console.log('DESDE EL RESPONSE ',response.data)
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Subir imágen a server</Text>
        <ImagePickerChoose parentCallBack={this.setImageState}></ImagePickerChoose>
        <Button
          title="Subir imágen"
          onPress={this.uploadImage}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

}
export default SubirImagen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});