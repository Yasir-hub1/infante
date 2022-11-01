import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";


/// ACCESSO AL DIRECTORIO CAMERA 
export default function StoragePrueba() {

  const [uriFoto, setUriFoto] = useState(null);
  const [Permiso, setPermiso] = useState(
    // "content://com.android.externalstorage.documents/tree/primary%3ADCIM%2FBNBMovil"
  "content://com.android.externalstorage.documents/tree/primary%3ADCIM%2FCamera"
    );

  const PermisoStorage = async () => {
    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync().catch(
        (err) => console.error("DESDE PermisoStorage ", err)
      );

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;
      console.log("Permisos ", `"${uri}"`);
      setPermiso(uri);
    }
  };

  const obtenerFotoCamara = async () => {
    // console.log("DESDE EL OFICIAL URI ", JSON.stringify(Permiso));
    // Gets all files inside of selected directory
    const files = await StorageAccessFramework.readDirectoryAsync(
      Permiso
    ).catch((err) => console.error("DESDE obtenerFotoCamara ", err));

    // console.log(`Files inside ${Permiso}:\n\n${JSON.stringify(files.length)}`);
    setUriFoto(files[files.length - 1]);

    console.log("MOSTRANDO LA FOTO ", files[files.length - 1]);
  };

  // funcion  de intervalo de tiempo para reescanear la ultima foto
  const actualizarFotoConIntervalo = async () => {
     await setInterval(obtenerFotoCamara, 60000);
    // Promise.resolve(setInterval(obtenerFotoCamara, 10000)).catch(console.error);

    // Promise.all(setInterval(obtenerFotoCamara, 10000));
    // console.log("DESDE EL INTERVALO");
  };

  useEffect(() => {
    (async () => {
      PermisoStorage().catch(console.error, "desde el PermisoStorage");
      if (Permiso !== "") {
        await obtenerFotoCamara().catch(console.error, "desde el obtenerFotoCamara");
      }
    })();
  }, [Permiso]);

  //useEffect de intervalo para reeviar la imagen cada cierto tiempo
  useEffect(() => {
    // funcion  de intervalo de tiempo para reescanear la ultima foto

    actualizarFotoConIntervalo();
    console.log("deade actualizarFotoConIntervalo");
  }, []);


 //funcion para subir imagen a la API
 const uploadImage = async () => {
  let localUri = uriFoto;
let filename = localUri.split('/').pop();
console.log("FILENAME ",filename);
const file={
     uri: localUri,
     name:filename,
     type:'image/jpg',

}

let formData = new FormData();
formData.append('fotos',file);
console.log("FormData",JSON.stringify(formData));
return await fetch('http://192.168.100.180:8000/api/control', {
  method: 'POST',
  body:formData,
  header: {
    'Accept': 'application/json',
    // 'Content-Type':'application/json'
    'Content-Type': 'application/x-amz-json-1.1'
  }, 
}).then(res =>res.json())
  .catch(error => console.error('Error', error))
  .then(response => {
    console.log('DESDE EL RESPONSE ',response.data)
  });
}

  useEffect(() => {
    if (uriFoto!==null) {
      
      uploadImage().catch(console.error, "desde el uploadImage")
    }
  }, [uriFoto])
  



  return (
    <View>
      <Text>HJas</Text>

      <Image
        style={{
          marginTop:25,
          width: "50%",
          height: "50%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        source={{ uri: uriFoto }}
      />
    </View>
  );
}
