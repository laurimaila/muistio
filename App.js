import * as React from 'react';
import { Text, View, Button, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var tallennuksia = 0;

const Muistio = ({ navigation, route }) => {
  // Käytin hookkeja luokan sijaan
  const [muistioState, setMuistioState] = useState([]);

  // Muistiinpanojen haku kun sovellus käynnistyy
  useEffect(() => {
    function fetchNotes() {
      AsyncStorage.getItem('muistio').then(note => {
        let parsedNote = JSON.parse(note);
        setMuistioState(parsedNote);
      });
    }
    fetchNotes();
  }, []);

  // Uuden muistiinpanon lisäys tai virhe kun tallennusta painetaan
  useEffect(() => {
    if (route.params?.uusiNote) {
      onPressButton()
    }
  }, [tallennuksia]
  );

  // AsyncStoragen päivitys kun muistiinpanojen State muuttuu
  useEffect(() => {
    AsyncStorage.setItem('muistio', JSON.stringify(muistioState))
  }, [muistioState]
  );

  // Tallennusnapin funktionaalisuus
  const onPressButton = () => {

    if (muistioState.some(e => e.note === route.params?.uusiNote)) {
      // Varoitus identtisestä muistiinpanosta
      showAlert()
    } else {
      setMuistioState(muistioState => [...muistioState, { "note": route.params?.uusiNote, "id": getRandomInt(5000) }]);
    }
  }

  return (
    // Muistiinpanot ScrollViewiin
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

// Uuden muistiinpanot tekemisen komponentti
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
          tallennuksia++;
          // Kirjoitettu teksti toiselle screenille navigaatioparametrinä
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
  // Erillinen Screen uusien muistiinpanojen lisäämiseen
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