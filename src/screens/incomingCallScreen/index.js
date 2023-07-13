import { Image, ImageBackground, StyleSheet, Text, View ,Pressable} from 'react-native'
import React, { useState } from 'react'
import bg from '../../../assets/images/ios_bg.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import {Voximplant} from 'react-native-voximplant';
import useNavigation from '@react-navigation/native'
const IncomingCallScreen = () => {
    const [caller,setCaller] = useState('');
    const voximplant = Voximplant.getInstance();
    const routes = useRoute();
    const call = route.params;
    const navigation = useNavigation();
    useEffect(()=>{
        setCaller(call.getEndpoints()[0].displayName)
        call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
            navigation.navigate('Contacts')
        });
        return ()=>{
            call.off(Voximplant.CallEvents.Disconnected);
        }
    },[])
    const onDecline = ()=>{
        call.decline();
    }
    const onAccept = ()=>{
        navigation.navigate('Calling',{
            call,
            isIncomingCall:true
        })
    }
  return (
    <View style={styles.root}>
        <ImageBackground source={bg} style={styles.bg} resizeMode='cover'>
      <Text style={styles.name}>{caller}</Text>
      <Text style = {styles.phoneNumber}>WhatsApp Video...</Text>
      <View style={[styles.row,{marginTop:'auto'}]}>
        <View style = {styles.iconContainer}>
            <Ionicons name="alarm" color="white" size={30}/>
            <Text style = {styles.iconText} >Remind Me</Text>
        </View>
        <View style = {styles.iconContainer}>
            <Entypo name="message" color="white" size = {30}/>
            <Text style = {styles.iconText} >Message</Text>
        </View>
      </View>
      <View style = {styles.row}>
        <Pressable onPress={onDecline} style = {styles.iconContainer}>
            <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40}/>
            </View>
            <Text style = {styles.iconText}>Decline</Text>
        </Pressable>
        <Pressable onPress={onAccept} style = {styles.iconContainer}> 
        <View style={[styles.iconButtonContainer,{backgroundColor:'blue'}]}>
            <Feather name="check" color="white" size = {40}/>
        </View>
            <Text style = {[styles.iconText]} >Accept</Text>
        </Pressable>
      </View>
        </ImageBackground>
    </View>
  )
}

export default IncomingCallScreen

const styles = StyleSheet.create({
    root:{
        height:'100%',  
    },
    name:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        marginTop:100,
        marginBottom:15
    },
    phoneNumber:{
        fontSize:20,
        color:'white'
    },
    bg:{
        flex:1,
        alignItems:'center',
        padding:10,

    },
    row:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
    },
    iconContainer:{
        alignItems:'center',
        marginVertical:20
    },
    iconText:{
        color:'white',
        marginTop:10
    },
    iconButtonContainer:{
        backgroundColor:'red',
        padding:20,
        borderRadius:50
    }
})