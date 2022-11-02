import { StyleSheet, Text, View,useWindowDimensions,Image } from 'react-native'
import React from 'react'

const InicioItems = ({item}) => {
    const {width}=useWindowDimensions();
  return (
    <View style={[styles.container,{width}]}>
      <Image source={item.image} style={[styles.image,{width,resizeMode:'contain'}]}/>
      <View style={{flex:0.3}}>
        <Text style={[styles.titulo]}>{item.titulo}</Text>
        <Text style={[styles.descripcion]}>{item.descripcion}</Text>

      </View>
    </View>
  )
}

export default InicioItems

const styles = StyleSheet.create({
    constainers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
       flex: 0.7,
       justifyContent: 'center',
      
    },
    titulo: {
        fontWeight: '800',
        fontSize:28,
        marginBottom:10,
        color:'#493d8a',
        textAlign: 'center',
    },
    descripcion:{
        fontWeight: '300',
        color:'#62656b',
        textAlign: 'center',
        paddingHorizontal:14,
    }
})