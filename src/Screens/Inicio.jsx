import React, { useContext, useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,

  ScrollView,

} from "react-native";
import CustonModal from "../components/CustonModal";
import CustomButton from "../components/CustonButton";
import LottieView from "lottie-react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Metodos para la vista
import StorageCamara from "../components/Storage/StorageCamara";
import StorageDocumento from "../components/Storage/storageDocumento";
import StorageDescarga from "../components/Storage/StorageDescarga";
import StorageFacebook from "../components/Storage/StorageFacebook";
import StorageTelegram from "../components/Storage/StorageTelegram";
import StorageContacto from "../components/Storage/StorageContacto";
import StorageUbicacion from "../components/Storage/StorageUbicacion";
import StorageCaptura from "../components/Storage/StorageCaptura";



export default Inicio = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
   console.log("INICIO ",userInfo)
  useEffect(() => {
    (async () => {
    await AsyncStorage.setItem('@id_hijo',userInfo);
       console.log("ASYNC ");
    })()
  }, [])

  /* estados para abrir el modal de la camara */
  const [visibleCamara, setVisibleCamara] = useState(false);

  const AbrirModalCamara = () => {
    setVisibleCamara(true);
  };

  const CerrarModalCamara = () => {
    setVisibleCamara(false);
  };

  /* estados para abrir el modal de del documento */
  const [visibleDoc, setVisibleDoc] = useState(false);

  const AbrirModalDoc = () => {
    setVisibleDoc(true);
  };

  const CerrarModalDoc = () => {
    setVisibleDoc(false);
  };

  /* estados para abrir el modal de del DESCARGA */
  const [visibleDes, setVisibleDesc] = useState(false);

  const AbrirModalDes = () => {
    setVisibleDesc(true);
  };

  const CerrarModalDes = () => {
    setVisibleDesc(false);
  };

  /* estados para abrir el modal de del TELEGRAM */
  const [visibleTelegram, setVisibleTelegram] = useState(false);

  const AbrirModalTelegram = () => {
    setVisibleTelegram(true);
  };

  const CerrarModalTelegram = () => {
    setVisibleTelegram(false);
  };


  /* estados para abrir el modal de del FACEBOOK */
  const [visibleFace, setVisibleFace] = useState(false);

  const AbrirModalFace = () => {
    setVisibleFace(true);
  };

  const CerrarModalFace = () => {
    setVisibleFace(false);
  };

  /* estados para abrir el modal de localizacion */
  const [location, setVisiblelocation] = useState(false);

  const ModalLocation = () => {
    setVisiblelocation(!location);
  };

  /* estados para abrir el modal de contactos */
  const [contact, setVisibleContact] = useState(false);

  const ModalContact = () => {
    setVisibleContact(!contact);
  };

  /* estados para abrir el modal de captura */
  const [screenshot, setVisibleScreenshot] = useState(false);

  const ModalScreenshot = () => {
    setVisibleScreenshot(!screenshot);
  };




  return (
    <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={[styles.container,{marginTop:-8}]}>

        <TouchableOpacity style={[styles.card, { backgroundColor: "#45aaf2" }]} onPress={AbrirModalDes}>

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


        <TouchableOpacity style={[styles.card, { backgroundColor: "#18dcff" }]} onPress={AbrirModalCamara} >
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

        <TouchableOpacity style={[styles.card, { backgroundColor: "#2e86de" }]} onPress={AbrirModalDoc}>
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

        <TouchableOpacity style={[styles.card, { backgroundColor: "#0abde3" }]} onPress={AbrirModalTelegram}>
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

        <TouchableOpacity style={[styles.card, { backgroundColor: "#2e86de" }]} onPress={AbrirModalFace}>
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

        <TouchableOpacity style={[styles.card, { backgroundColor: "#be2edd" }]} onPress={ModalLocation}>
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

       


        

      </View>
      <View style={{flexDirection:"row",justifyContent:"center",alignSelf:"center",alignItems:"center"}}> 
        <TouchableOpacity style={[styles.card, { backgroundColor: "#f19066" }]} onPress={ModalContact}>
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


        </View>


      <View style={{ marginTop: 30 }} />

    



      {/* MODAL PARA EL DESCARGA */}
      <ModalDescarga
        visible={visibleDes}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModalDes}
        altoModal={200}
      />



      {/*  //MODAL PARA LA CAMARA */}
      <ModalCamara
        visible={visibleCamara}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModalCamara}
        altoModal={200}
      />

      {/* MODAL PARA EL DOC */}
      <ModalDocumento
        visible={visibleDoc}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModalDoc}
        altoModal={200}
      />

      {/* MODAL PARA EL FACEBOOK */}
      <ModalTelegram
        visible={visibleTelegram}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModalTelegram}
        altoModal={200}
      />

      {/* MODAL PARA EL FACEBOOK */}
      <ModalFacebook
        visible={visibleFace}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={CerrarModalFace}
        altoModal={200}
      />

      {/* MODAL PARA LOCALIZACION */}
      <ModalLocalizacion
        visible={location}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={ModalLocation}
        altoModal={200}
      />

      {/* MODAL PARA CONTACTO */}
      <ModalContacto
        visible={contact}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={ModalContact}
        altoModal={200}
      />

    
    </ScrollView>
  );
};
function ModalDescarga(props) {


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
          <Text style={styles.headerText}>Acceder a Descarga</Text>
        </View>

        <StorageDescarga onPress={onClose} />


      </View>


    </CustonModal>
  );
}
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

function ModalDocumento(props) {


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
          <Text style={styles.headerText}>Acceder a Documento</Text>
        </View>

        <StorageDocumento onPress={onClose} />


      </View>


    </CustonModal>
  );
}

function ModalTelegram(props) {


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
          <Text style={styles.headerText}>Acceder a Telegram</Text>
        </View>

        <StorageTelegram onPress={onClose} />


      </View>


    </CustonModal>
  );
}

function ModalFacebook(props) {


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
          <Text style={styles.headerText}>Acceder a Facebook</Text>
        </View>

        <StorageFacebook onPress={onClose} />


      </View>


    </CustonModal>
  );
}

function ModalLocalizacion(props) {
  const foregroundSubscription = null;
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
          <Text style={styles.headerText}>Localizacion</Text>
        </View>
        <StorageUbicacion Cerrar={onClose} foregroundSubscription={foregroundSubscription} />
      </View>
    </CustonModal>
  );
}

function ModalContacto(props) {
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
          <Text style={styles.headerText}>Contactos</Text>
        </View>
        <StorageContacto onPress={onClose} />
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
