import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import InicioItems from "../components/Onboarding/InicioItems";
import InicioPaginacion from "../components/Onboarding/InicioPaginacion";
import NextButton from "../components/Onboarding/NextButton";

export default function Onboarding ({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setcurrentIndex] = useState(0);

  const viewItemsChanged = useRef(({ viewableItems }) => {
    setcurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  const DATA = [
    {
      id: "1",
      titulo: "Token",
      descripcion:"Habilita el dispositivo de tu niño con un codigo de verificacion",
      image: require("../Image/token.png"),
    },
    {
      id: "2",
      titulo: "Carpetas",
      descripcion:"Selecciona las carpetas que deseas inspeccionar para ver las imagenes de tu niño",
      image: require("../Image/folder.png"),
    },
    {
      id: "3",
      titulo: "Contactos",
      descripcion:
        "Descubre los contactos de tu niño y verifica que todo este en orden",
      image: require("../Image/contactos.png"),
    },
    {
      id: "4",
      titulo: "Ubicacion",
      descripcion:"Habilita los permisos de ubicacion del dispositivo de tu niño para saber en donde se encuentra",
      image: require("../Image/ubicacion.png"),
    },
  ];

  const scrollTo = () => {
    if (currentIndex < DATA.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("siguiente item");
      navigation.navigate("Login");
    }
  };
  return (
    
    <View style={styles.container}>
     
      <View style={{ flex: 3 }}>
      <StatusBar hidden />
        <FlatList
          data={DATA}
          renderItem={({ item }) => <InicioItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <InicioPaginacion data={DATA} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / DATA.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});