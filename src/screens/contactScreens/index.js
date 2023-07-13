import React,{useEffect, useState} from "react";
import { View,FlatList,Text,StyleSheet,TextInput, Pressable } from "react-native";
import dummyContacts from '../../../assets/data/contacts.json'
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/core";
const ContactScreens = (user)=>{
  const navigation = useNavigation();
  const callUser = (user)=>{
    navigation.navigate("Calling",{user});
  }
    const [searchTerm,setSearchTerm] = useState("");
    const [filteredContacts,setFilteredContacts] = useState(dummyContacts);
    useEffect(()=>{
        const newContacts = dummyContacts.filter(
            contact=>contact.user_display_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredContacts(newContacts);
    },[searchTerm])
    return (
        <View style={styles.page}>
            <TextInput placeholder="Search..." style={styles.searchInput} onChangeText={setSearchTerm}/>
      {/* <Text>Hello World!</Text> */}
      <FlatList data={filteredContacts} 
      renderItem={({item})=>
      <Pressable onPress={()=>callUser(item)}>
        <Text style={styles.contactName}>{item.user_display_name}</Text>
      </Pressable>}
      ItemSeparatorComponent={()=><View style={styles.seperator}></View>}
      />
      </View>
    )
}
const styles = StyleSheet.create({
    page:{
      padding:10,
      backgroundColor:'white',
      flex:1
    },
    contactName:{
      fontSize:18,
      marginVertical:10,
  
    },
    seperator:{
      width:'100%',
      height:1,
      backgroundColor:'#f0f0f0'
    },
    searchInput:{
        backgroundColor:'#f0f0f0',
        padding:10,
        borderRadius:5
    }
  });

  export default ContactScreens;