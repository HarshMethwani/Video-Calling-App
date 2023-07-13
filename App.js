import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View
} from 'react-native';
import contacts from './assets/data/contacts.json'
import ContactScreens from './src/screens/contactScreens';
import CallingScreen from './src/screens/callingScreen';
import IncomingCallScreen from './src/screens/incomingCallScreen';
import CallScreen from './src/screens/callScreen';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
const App = ()=>{
  return (
    < >
      {/* <ContactScreens/> */}
      {/* <CallingScreen/> */}
      <Navigation/>
      {/* <IncomingCallScreen/> */}
    </>
  );
}


export default App;
