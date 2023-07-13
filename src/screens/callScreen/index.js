import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import CallActionBox from '../../components/callActionBox'
const CallScreen = () => {
  return (
    <View style={styles.page}>
    <View style = {styles.cameraPreview}/>
      <CallActionBox/>
    </View>
  )
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'blue',
    },
    cameraPreview:{
        backgroundColor:'red',
        width:100,
        height:150,
        alignItems:'center',
        paddingTop:10,
        paddingHorizontal:15,
        position:'absolute',
        right:15,
        top:100,
        borderRadius:10
    }
})
export default CallScreen;