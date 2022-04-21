import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class MuistioList extends React.Component {
  state = {
    loading: true,
    error: false,
    muistiinpanot: []
  }

  componentDidMount() {
    fetch('https://jastpa.utugit.fi/lunch-api/restaurants')
      .then(res => res.json())
      .then(muistiinpanot => this.setState({ loading: false, muistiinpanot: muistiinpanot }))
      .catch(e => this.setState({ error: true, loading: false }));
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
          <Text>Failed to load restaurants!</Text>
        </View>
      )
    }

    return (
      <><ScrollView>
        {this.state.muistiinpanot.map(restaurant => <Muistiinpano
          key={restaurant.id}
          name={restaurant.name}
          id={restaurant.id}
          navigation={this.props.navigation} />)}
      </ScrollView>
        <View>
          <TextInput placeholder="Kirjoita muistiinpano tähän" />
          <Button title="Send" onPress={() => alert('No saving action implemented in this example')} />
        </View></>
    );
  }
}

const Muistiinpano = (props) => {
  return (
    <Button
      title={props.name}
      onPress={() => props.navigation.navigate('Menus', { id: props.id, name: props.name })}
    />
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
        <Stack.Screen name="Menus" component={MenuScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;