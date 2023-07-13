import { View, Text, StyleSheet, Pressable,Platform,PermissionsAndroid, Alert } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CallActionBox from '../../components/callActionBox'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useEffect } from 'react'
import { useState } from 'react'
import {Voximplant} from 'react-native-voximplant'
import { useRef } from 'react'
const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA
];
const CallingScreen = () => {
    const {user,call:incomingCall,isIncomingCall} = route?.params;
    let call = useRef();
    const [callStatus,setCallStatus] = useState('Initializing...')
    const voximplant = Voximplant.getInstance();
    const [permissionGranted,setPermissionGranted] = useState(false);
    const navigation  = useNavigation();
    const route = useRoute();
    const [localVideoStreamId,setLocalVideoStreamId] = useState('');
    const [remoteVideoStreamId,setRemoteVideoStreamId] = useState('');
    const goBack = ()=>{
        navigation.pop();
    }
    useEffect(()=>{
        const requestPermissions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted =
            granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] = 'granted';
            const cameraGranted =
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] = 'granted';
            if (!cameraGranted | !recordAudioGranted) {
            Alert.alert('Permissions not granted');
            } else {
            setPermissionGranted(true);
            }
            };
            if(Platform.OS==='android'){
                requestPermissions();
            }else{
                setPermissionGranted(true);
            }
    },[])
    useEffect(()=>{
        if(!permissionGranted){
            return;
        }
        const callSettings = {
            video: {
            sendVideo: true,
            receiveVideo: true,
            },
            };
        const makeCall = async ()=>{
             call.current = await voximplant.call(user.user_name, callSettings);
             subscribeToCallEvents();
        }
        const answerCall = async ()=>{
            subscribeToCallEvents();
            call.current.answer(callSettings);
        }
        const subscribeToCallEvents = ()=>{
            call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
                showError(callEvent.reason);
                });
            call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
                setCallStatus('Ringing .');
                    });
            call.current.on(Voximplant.CallEvents.Connected, callEvent => {
                setCallStatus('Connected .');
                        });
            call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
                            navigation.navigate('Contacts')
                            });
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
                                setLocalVideoStreamId(callEvent.videoStream.id);
                                });
        }
        const showError = (reason)=>{
            Alert.alert('Call failed',`Reason:${reason}`,[
                {
                    text:'OK',
                    onPress:navigation.navigate('Contacts')
                }
            ])
        }
        if(isIncomingCall){
            answerCall();
        }else{
            makeCall();
        }
        return ()=>{
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
        }
    },[permissionGranted])
    const onHangUpPress = ()=>{
        call.current.hangup();
    }

  return (
    <View style={styles.page}>
        <Pressable onPress={goBack}>
        <Ionicons name="chevron-back" style={styles.backButton} size = {30}/>
        </Pressable>
        <Voximplant
        style = {styles.localVideo}
        videoStreamId={localVideoStreamId}/>
        <View style={styles.cameraPreview}>
      <Text style={styles.name}>{user?.user_display_name}</Text>
            <Text style = {styles.phoneNumber}>{callStatus}</Text>
        </View>
        <CallActionBox onHangUpPress={onHangUpPress}/>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        page:{
            height:'100%',
            backgroundColor:'#7b4e80',
        },
        cameraPreview:{
            flex:1,
            backgroundColor:'#7b4e80',
            paddingTop:10,
            paddingHorizontal:10,
            alignItems:'center',
        },
        name:{
            fontSize:30,
            fontWeight:'bold',
            color:'white',
            marginTop:50,
            marginBottom:15
        },
        phoneNumber:{
            fontSize:20,
            color:'white'
        },
        buttonContainer:{
            backgroundColor:'#333333',
            padding:15,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            flexDirection:'row',
            justifyContent:'space-between',
            paddingBottom:30
        },
        iconButton:{
            backgroundColor:'#4a4a4a',
            padding:10,
            borderRadius:50,
        },
        backButton:{
            marginTop:10,
            color:'white'
        },
        localVideo:{
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
    }
)
export default CallingScreen