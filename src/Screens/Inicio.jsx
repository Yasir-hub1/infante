import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

  ScrollView,

} from "react-native";
import CustonModal from "../components/CustonModal";
import { StorageAccessFramework } from "expo-file-system";

import LottieView from "lottie-react-native";
//Metodos para la vista

import StorageCamara from "../components/Storage/Storage";



export default Inicio = () => {
  /* funciones para abrir el modal */
  const [visible, setVisible] = useState(false);

  const AbrirModal = () => {
    setVisible(true);
  };

  const CerrarModal = () => {
    setVisible(false);
  };



  return (
    <ScrollView  >
      <View style={styles.container}>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#45aaf2" }]}>

          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/114459-download-file-icon-animation.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Descarga</Text>
            </View>
          </View>

        </TouchableOpacity>


        <TouchableOpacity style={[styles.card, { backgroundColor: "#18dcff" }]} onPress={AbrirModal} >
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/108979-image-scanning-finding-searching.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Cámara</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#2e86de" }]}>
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/114129-browsing.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Documento</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#0abde3" }]}>
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/71618-telegram-message-transp-bkg.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Telegram</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#2e86de" }]}>
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/74919-facebook-3d-button.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Facebook</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#be2edd" }]}>
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/86513-location-forked.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Localización</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#f19066" }]}>
          <LottieView
            resizeMode={"contain"}
            style={styles.cardImage}
            source={require("../Image/lottie/Inicio/98306-contacts-book.json")}
            autoPlay
          />
          <View style={styles.cardHeader}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Contactos</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#546de5" }]}>
          <LottieView
            resizeMode={"contain"}
            style={{ height: 190, width: 190, alignSelf: 'center' }}
            source={require("../Image/lottie/Inicio/5383-loading-16-camera.json")}
            autoPlay
          />
          <View style={{ marginTop: -35, }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.title, { color: "#333" }]}>Captura de pantalla</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>

      <View style={{ marginTop: 30 }} />

      <ModalCamara
        visible={visible}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModal}
        altoModal={200}
      />

    </ScrollView>
  );
};

function ModalCamara(props) {


  const { visible, options, duration, onClose, altoModal } = props;
  return (
    <CustonModal
      visible={visible}
      options={options}
      duration={duration}
      altoModal={altoModal}
      onClose={onClose}
    >
      <View>
        <View style={styles.headerModal}>
          <Text style={styles.headerText}>Acceder a la camara</Text>
        </View>

        <StorageCamara onPress={onClose} />


      </View>


    </CustonModal>
  );
}

const styles = StyleSheet.create({
  //ESTILOS PARA EL MODAL
  headerModal: {
    marginBottom: 10,
  },
  headerText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: "#41D0D1",

  },
  container: {
    paddingTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 10.5,
    shadowRadius: 10.49,
    marginLeft: 25,
    elevation: 12,
    marginVertical: 17,
    marginHorizontal: 10,
    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'

  },
  cardHeader: {
    /*  paddingVertical: 17,
     paddingHorizontal: 16,
     borderTopLeftRadius: 1,
     borderTopRightRadius: 1,
     flexDirection: 'row',
     alignItems:"center", 
     justifyContent:"center" */

    marginTop: -15,

  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 150,
    width: 150,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,

    alignSelf: 'center',
    fontWeight: 'bold'
  },
});
