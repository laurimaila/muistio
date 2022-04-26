import * as React from 'react';
import { Text, View, Button, ActivityIndicator, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Muistio = ({ navigation }) => {
  const [muistioState, setMuistiostate] = useState([{ "note": "Muistiinpano", "id": 1 }]);
  
  const onPressButton = () => {
    console.log("Nappia painettiin!")
    if (muistioState.some(e => e.note === inputText)) {
      showAlert()
    } else {
      setMuistiostate(muistioState => [...muistioState, { "note": inputText, "id": getRandomInt(5000) }]);
      console.log("Nappia painettu!");
    }
  }

  <NewNote onClick={onPressButton}/> 

  return (
    <><ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
      {muistioState.map(e => <Muistiinpano
        key={e.id}
        note={e.note} />)}
        <Button title="Lisää uusi muistiinpano" onPress={() => navigation.navigate('NewNote')} />
    </ScrollView>
    
      {/* <View>
        <TextInput
          style={styles.input}
          onChangeText={newText => setText(newText)}
          defaultValue={""}
        />
        <Button
          color="#c60055"
          onPress={onPressButton}
          title="Tallenna muistiinpano"
        />
      </View></>  */}</>
  );
}

const NewNote = ({onClick}) => {
  const [inputText, setText] = useState("");
  return(
  <View>
        <TextInput
          style={styles.input}
          onChangeText={newText => setText(newText)}
          defaultValue={""}
        />
        <Button
          color="#c60055"
          //onPress={onClick}
          title="Tallenna muistiinpano"
        />
      </View>
  );   
}


const Muistiinpano = (props) => {
  return (
    <View>
      <Text style={styles.ebin}>{props.note}</Text>
    </View>
  )
}



const showAlert = () => {
  Alert.alert(
    "Virhe",
    "Kyseinen muistiinpano on jo lisätty!",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
  );
}



const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Muistio">
        <Stack.Screen name="Muistio" component={Muistio} />
        <Stack.Screen name="NewNote" component={NewNote} options={{ title: 'Uusi muistiinpano' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  ebin: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: '#ff79b0'
  },
  input: {
    height: 50,
    margin: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#ff4081'
  },
});
