import { View, Text, TextInput, Pressable,StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {Voximplant} from 'react-native-voximplant'
import { APP_NAME } from '../../Constants'
import { ACC_NAME } from '../../Constants'
import { useNavigation } from '@react-navigation/core'
const LoginScreen = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();
    useEffect(()=>{
        const connect = async ()=>{
            const status = await voximplant.getClientState();
            if(status === Voximplant.ClientState.DISCONNECTED){
                await voximplant.connect();
            }else if(status === Voximplant.ClientState.LOGGED_IN ){
                redirectHome();
            }
        }
        connect();
    },[])
    
    const redirectHome = ()=>{
        navigation.reset({
            index:0,
            routes:[{
                name:'Contacts'
            }]
        })
    }
    const signIn = async ()=>{
        try{
            const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUsername,password);
            redirectHome();
        }catch(e){
            Alert.alert(e.name,`Error Code:${e.code}`);
        }
    }
    
  return (
    <View style= {styles.page}>
      <TextInput 
      value={username}
      onChangeText={setUsername}
      style={styles.input} 
      placeholder='username'/>
      <TextInput 
      value={password}
      onChangeText={setPassword}
      style={styles.input} 
      placeholder='password'
      secureTextEntry
      />
      <Pressable style = {styles.button} onPress={signIn}>
        <Text style={{color:'white'}}>Sign in</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    page:{
        padding:10,
        alignContent:'stretch',
        flex:1,
        justifyContent:'center'
    },
    input:{
        backgroundColor:'white',
        padding:10,
        marginVertical:10,
        borderRadius:10
    },
    button:{
        backgroundColor:'dodgerblue',
        padding:10,
        marginVertical:10,
        borderRadius:5,
        alignItems:'center'
    }
})
export default LoginScreen