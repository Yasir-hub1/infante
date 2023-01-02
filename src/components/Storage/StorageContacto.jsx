import { StyleSheet, View, Text, Alert } from "react-native";
import CustonButton from "../CustonButton";
import * as Contacts from "expo-contacts";

/* import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications */
//url
import { storageContacto } from "../../util/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
  /* IDE DE INFANTE */




/// ACCESSO AL DIRECTORIO CONTACTO
export const StorageContacto = ({ onPress }) => {
  
  
  const permisos = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const id_hijo = await AsyncStorage.getItem('@id_hijo');
   
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
      ],
    });
  
    
    data.forEach(async (element) => {
      let xd = element;
      const { phoneNumbers } = element;
      // console.log("contact", alert(JSON.stringify(phoneNumbers[0].number)));

      // console.log("firstName",JSON.stringify(file.PhoneNumbers.slice(0,3)));

       let formData = new FormData();

      formData.append("contactos[]", xd.firstName);
      formData.append("number[]", JSON.stringify(phoneNumbers[0].number));
      formData.append("id_hijo",id_hijo);
     

      await fetch(storageContacto, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-amz-json-1.1",
        },
      });
    });  
    console.log("desde status ", status);
    console.log("desde id_hijo ", id_hijo);
  };
  return (
    <View style={[styles.card, { marginBottom: -20 }]}>
      <Text style={styles.text}>
        Necesita aceptar los permisos de Contactos
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

export default StorageContacto;
