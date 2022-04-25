import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class MuistioList extends React.Component {
  state = {
    loading: true,
    error: false,

    notesArray: [{
      "note": "Note 1",
      "id": "1"
    },
    {
      "note": "Note 2",
      "id": "2"
    },
    {
      "note": "Note 3",
      "id": "3"
    },
    {
      "note": "Note 4",
      "id": "4"
    },
    {
      "note": "Note 5",
      "id": "5"
    },
    {
      "note": "Note 6",
      "id": "6"
    },
    {
      "note": "Note 7",
      "id": "7"
    }
    ]
  }

  // componentDidMount() {
  //   fetch('https://jastpa.utugit.fi/lunch-api/restaurants')
  //     .then(res => res.json())
  //     .then(muistiinpanot => this.setState({ loading: false, muistiinpanot: muistiinpanot }))
  //     .catch(e => this.setState({ error: true, loading: false }));
  // }

  render() {
    return (
      <><ScrollView>
        {this.state.notesArray.map(e => <Muistiinpano
          key={e.id}
          note={e.note}
        // navigation={this.props.navigation} 
        />)}
      </ScrollView>
        <View>
          <TextInput placeholder="Kirjoita muistiinpano tähän" />
          <Button title="Tallenna muistiinpano" onPress={() => alert('No saving action implemented in this example')} />
        </View></>
    );
  }
}

const Muistiinpano = (props) => {
  return (
    <View>
      <Text>{props.note}</Text>

    </View>
  )
}

class MenuScreen extends React.Component {
  state = {
    menu: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    fetch(`https://jastpa.utugit.fi/lunch-api/restaurant/${this.props.route.params.id}`)
      .then(res => res.json())
      .then(menu => this.setState({ menu: menu, loading: false }))
      .catch(e => this.setState({ error: true, loading: false }))
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if (this.state.error) {
      return (
        <View>
          <Text>Failed to load menu!</Text>
        </View>
      )
    }
    return (
      <ScrollView>
        {this.state.menu.map(weekday => <Weekday key={weekday.id} weekday={weekday} />)}
      </ScrollView>
    );
  }
}

const Weekday = (props) => {
  return (
    <View>
      <Text>{props.weekday.name}</Text>
      {props.weekday.menuitems.map(meal => <Meal key={meal.id} meal={meal} />)}
    </View>
  )
}

const Meal = (props) => {
  return (
    <Text>{props.meal.name}</Text>
  )
}

const AdminScreen = (props) => {
  return (
    <View>
      <TextInput placeholder="Write the name of the menuitem" />
      <Button title="Send" onPress={() => alert('No saving action implemented in this example')} />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Muistio">
        <Stack.Screen name="Muistio" component={MuistioList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const inputComponent = () => {
  const [text, setText] = React.useState("");

  return (
    <><TextInput
      label="Kirjoita muistiinpano tähän"
      value={text}
      onChangeText={text => setText(text)} /><Button
        onPress={pushArray}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button" /></>

  );
};

export default App;
