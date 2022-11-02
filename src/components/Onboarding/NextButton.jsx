import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
  } from "react-native";
  import Svg, { G, Circle } from "react-native-svg";
  import React, { useEffect, useRef } from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  
  export default NextButton = ({ percentage,scrollTo }) => {
  
  
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumFerencia = 2 * Math.PI * radius;
  
    const progressAnimation = useRef(new Animated.Value(0)).current;
  
    const progressRef = useRef(null);
  
    const animation = (toValue) => {
      return Animated.timing(progressAnimation, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  
    useEffect(() => {
      animation(percentage);
    }, [percentage]);
  
    useEffect(() => {
      progressAnimation.addListener(
        (value) => {
          const strokeDashoffset = circumFerencia - (circumFerencia * value.value) / 100;
  
          if (progressRef?.current) {
            progressRef.current.setNativeProps({
              strokeDashoffset,
            })
          }
        },[percentage]);
        return () => {
          progressAnimation.removeAllListeners();
        };
    },[]);
  
    return (
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle
              stroke="#E6E7E8" /* color de la circunferencia externa */
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
  
            <Circle
              ref={progressRef}
              stroke="#33d9b2" /* color de la circunferencia del centro */
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumFerencia}
               /*  strokeDashoffset={circumFerencia - (circumFerencia * 60) / 100} */
            />
          </G>
        </Svg>
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
          <AntDesign name="arrowright" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      position: "absolute",
      backgroundColor: "#33d9b2" /* btn de flecha */,
      borderRadius: 100,
      padding: 20,
    },
  });
  