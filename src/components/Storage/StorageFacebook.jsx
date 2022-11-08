import {
    StyleSheet,
    View,
    Image,
    Text,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  
  import { StorageAccessFramework } from "expo-file-system";
  import CustonButton from "../CustonButton";
  
  //url
  import {storageFacebook} from "../../util/Apis";
  
  /// ACCESSO AL DIRECTORIO CAMERA
  export const StorageFacebook = ({ onPress }) => {
  
  
    const [PermisoActivo, setPermisoActivo] = useState(false);
    const [uriFoto, setUriFoto] = useState(null);
    const [Permiso, setPermiso] = useState(
      "content://com.android.externalstorage.documents/tree/primary%3ADCIM%2FFacebook"
    );
  
    const PermisoStorage = async () => {
      // Requests permissions for external directory
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync().catch(
          (err) => console.error("DESDE PermisoStorage ", err)
        );
  
      if (permissions.granted) {
        setPermisoActivo(true);
        // Gets SAF URI from response
        const uri = permissions.directoryUri;
        console.log("Permisos ", `"${uri}"`);
        setPermiso(uri);
      }
    };
  
    const obtenerFotoCamara = async () => {
      // Gets all files inside of selected directory
      const files = await StorageAccessFramework.readDirectoryAsync(
        Permiso
      ).catch((err) => console.error("DESDE obtenerFotoCamara ", err));
  
      // console.log(`Files inside ${Permiso}:\n\n${JSON.stringify(files.length)}`);
      setUriFoto(files[files.length - 1]);
  
      console.log("MOSTRANDO LA FOTO FACEBOOK", files[files.length - 1]);
    };
  
    // funcion  de intervalo de tiempo para reescanear la ultima foto
    const actualizarFotoConIntervalo = async () => {
      await setInterval(obtenerFotoCamara, 30000);
    };
  
    /*     useEffect(() => {
      (async () => {
        PermisoStorage().catch(console.error, "desde el PermisoStorage");
         if (Permiso !== "") {
          await obtenerFotoCamara().catch(console.error, "desde el obtenerFotoCamara");
        } 
      })();
    }, [Permiso]); */
  
    //useEffect de intervalo para reeviar la imagen cada cierto tiempo
    useEffect(() => {
      // funcion  de intervalo de tiempo para reescanear la ultima foto
      console.log("PermisoActivo ", PermisoActivo);
      if (PermisoActivo) {
        actualizarFotoConIntervalo();
        obtenerFotoCamara().catch(console.error, "desde el obtenerFotoCamara");
        console.log("deade actualizarFotoConIntervalo");
      }
    }, [PermisoActivo]);
  
    //funcion para subir imagen a la API
    const uploadImage = async () => {
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
      console.log("FormData", JSON.stringify(formData));
      return await fetch(storageFacebook, {
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
          console.log("DESDE EL RESPONSE ", response);
        });
    };
  
    useEffect(() => {
      if (uriFoto !== null) {
        uploadImage().catch(console.error, "desde el uploadImage");
      }
    }, [uriFoto]);
  
    return (
      <View style={[styles.card, { marginBottom: -20 }]}>
        <Text style={styles.text}>
          Necesita aceptar los permisos del dispositivo para acceder a la carpeta
          de Facebook
        </Text>
  
        <View
          style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
        >
          <CustonButton label={"Aceptar"} padding={10} onPress={PermisoStorage} />
  
          <View style={{ margin: 20 }} />
  
          <CustonButton label={"Cerrar"} padding={10} onPress={onPress} />
  
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
  
  export default StorageFacebook;
  