import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const HomeNavigator = createStackNavigator( {
  Home: { screen: Home, 
          navigationOptions: ({ navigation }) => 
          ({ headerLeft: () => (<Icon name="menu" size={24} color= 'white' 
                      onPress={ () => navigation.toggleDrawer() } /> ) 
          }) 
        }
} );

const AboutNavigator = createStackNavigator({
    About: { screen: Aboutus }
});

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
    navigationOptions: ({ navigation }) => (
  { headerLeft: () => <Icon name="menu" size={24} color='white' 
                      onPress={ () => navigation.toggleDrawer() } />          
  })  
},
    DishDetail: { screen: DishDetail }
},
{
    initialRouteName: 'Menu',
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Aboutus: 
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About us',
          drawerLabel: 'About us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Contact: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact us',
          drawerLabel: 'Contact us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      }
}, { drawerBackgroundColor: '#D1C4E9',
     contentComponent: CustomDrawerContentComponent }));


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        })
    }

    render() {
        return ( 
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
        );
    }
}

export default Main;