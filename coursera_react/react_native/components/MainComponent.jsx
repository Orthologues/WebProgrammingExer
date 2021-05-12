import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Favorites from './FavoriteComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Login from './LoginComponent';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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

const LoginNavigator = createStackNavigator({
  Login: Login
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  })
})

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.navigate('DrawerToggle') } />    
  })
})

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={{uri: baseUrl + 'images/logo.png'}} style={styles.drawerImage} />
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
    Login: 
      { screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
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
    Reservation:
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
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
      },
    Favorites:
      { screen: FavoritesNavigator,
        navigationOptions: {
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
}, { drawerBackgroundColor: '#D1C4E9',
     initialRouteName: 'Home',
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

    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
      NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', If connected: ' + connectionInfo.isConnected,
                ToastAndroid.LONG)
        });
      NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
      NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
      switch (connectionInfo.type) {
        case 'none':
          ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
          break;
        case 'wifi':
          ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
          break;
        case 'cellular':
          ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
          break;
        case 'unknown':
          ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
          break;
        default:
          break;
      }
    }

    render() {
        return ( 
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);