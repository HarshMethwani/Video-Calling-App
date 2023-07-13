import { View, Text,StyleSheet,Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const CallActionBox = ({onHangUpPress}) => {
    const [isCameraOn,setIsCameraOn] = useState(true);
    const [isMicrophoneOn,setIsMicrophoneOn] = useState(true);
    const onReverseCamera = ()=>{

    }
    const onToggleCamera = ()=>{
        setIsCameraOn(currentValue => !currentValue)
    }
    const onToggleMicrophone = ()=>{
        setIsMicrophoneOn(currentValue => !currentValue)
    }

  return (
    <View style={styles.buttonContainer}>
            <Pressable onPress={onReverseCamera}style={styles.iconButton}>
            <Ionicons name="ios-camera-reverse" size={30} color={'white'}/>
            </Pressable>
            <Pressable onPress={onToggleCamera}style={styles.iconButton}>
            <MaterialIcons name={isCameraOn?"camera-off":"camera"} size={30} color={'white'}/>
            </Pressable>
            <Pressable onPress={onToggleMicrophone}style={styles.iconButton}>
            <MaterialIcons name={isMicrophoneOn?"microphone-off":"microphone"} size={30} color={'white'}/>
            </Pressable>
            <Pressable onPress={onHangUpPress}style={[styles.iconButton,{backgroundColor:'red'}]}>
            <MaterialIcons name="phone-hangup" size={30} color={'white'}/>
            </Pressable>
        </View>
  )
}
const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'#333333',
        padding:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:30,
        marginTop:'auto'
    },
    iconButton:{
        backgroundColor:'#4a4a4a',
        padding:10,
        borderRadius:50,
    },
})
export default CallActionBox