import * as React from 'react';
import { Text, View, Button, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var laskuri = 0;

const Muistio = ({ navigation, route }) => {
  const [muistioState, setMuistioState] = useState([{ "note": "Muistiinpano 1", "id": 1 },{ "note": "Muistiinpano 2", "id": 2 }]);

  useEffect(() => {
    console.log("useEffect aktivoitu")
    if (route.params?.uusiNote) {
      onPressButton()    
    }
  }, [laskuri]);

  const onPressButton = () => {
    console.log("onPressButton aktivoitu")
    if (muistioState.some(e => e.note === route.params?.uusiNote)) {
      showAlert()
    } else {
      setMuistioState(muistioState => [...muistioState, { "note": route.params?.uusiNote, "id": getRandomInt(5000) }]);
    }
  }

  return (
    <><ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
      {muistioState.map(e => <Muistiinpano
        key={e.id}
        note={e.note} />)}
    </ScrollView>
      <View>
        <Button color="#ff4081" title="Uusi muistiinpano" fontSize="30" onPress={() => { navigation.navigate('NewNote') }} />
      </View></>
  );
}

const NewNote = ({ navigation }) => {
  const [inputText, setText] = useState("");
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita tähän!"
        placeholderTextColor="white"
        onChangeText={newText => setText(newText)}
        defaultValue={""}
      />
      <Button
        color="#ff4081"
        title="Tallenna muistiinpano"
        onPress={() => {
          laskuri++; console.log("Count kasvatettu")
          navigation.navigate({
            name: 'Muistio',
            params: { uusiNote: inputText },
            merge: true,
          });
        }}
      />
    </View>
  );
}

const Muistiinpano = (props) => {
  return (
    <View>
      <Text style={styles.muistioteksti}>{props.note}</Text>
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

  muistioteksti: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#ff4081',
    margin: 5
  },
  input: {
    height: 50,
    margin: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10,
    backgroundColor: '#ff4081'
  },
});
