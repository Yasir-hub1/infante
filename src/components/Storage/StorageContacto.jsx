import {
    StyleSheet,
    View,
    Text,
  } from "react-native";
  import CustonButton from "../CustonButton";
  import * as Contacts from 'expo-contacts'
  
  
  //url
  import {storageContacto} from "../../util/Apis";
  
  /// ACCESSO AL DIRECTORIO CAMERA
  export const StorageContacto = ({ onPress }) => {

  const permisos = async() => {
      const { data } = await Contacts.requestPermissionsAsync()
      console.log(data)
      if(data !== 'granted') {return}
      const { contact } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
      })
      console.log("contact")
      let formData = new FormData();
      formData.append("contactos", contact);
      await fetch(storageContacto, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          // 'Content-Type':'application/json'
          "Content-Type": "application/x-amz-json-1.1",
        },
      })
    }
    return (
      <View style={[styles.card, { marginBottom: -20 }]}>
        <Text style={styles.text}>
          Necesita aceptar los permisos de Contactos
        </Text>
  
        <View
          style={[styles.card, { marginTop: 12, padding: 5, marginLeft: 15 }]}
        >
          <CustonButton label={"Aceptar"} padding={10} onPress={permisos} />
  
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
  
  export default StorageContacto;
  