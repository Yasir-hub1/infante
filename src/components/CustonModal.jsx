import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from 'react-native';


export default function CustonModal(props) {
  const { visible, options, duration, onClose, children,altoModal } = props;
  const { height } = Dimensions.get('screen');
  const startPointY = options?.from === 'top' ? -height : height;
  const transY = useRef(new Animated.Value(startPointY));

  useEffect(() => {
    if (visible) {
      startAnimation(0);
    } else {
      startAnimation(startPointY);
    }
  }, [visible]);

  const startAnimation = toValue => {
    Animated.timing(transY.current, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    onClose();
  };

  const generateBackgroundOpacity = () => {
    if (startPointY >= 0) {
      return transY.current.interpolate({
        inputRange: [0, startPointY],
        outputRange: [0.8, 0],
        extrapolate: 'clamp',
      });
    } else {
      return transY.current.interpolate({
        inputRange: [startPointY, 0],
        outputRange: [0, 0.8],
        extrapolate: 'clamp',
      });
    }
  };

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.outerContainer,
          { opacity: generateBackgroundOpacity() },
        ]}
      />
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: transY.current }] },
        ]}
      >
        <View style={[styles.innerContainer,{height:altoModal}]}>{children}</View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  ViewToken: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  outerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dff9fb',
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '95%',
    height: '30%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor:"#41D0D1",
  },
});
