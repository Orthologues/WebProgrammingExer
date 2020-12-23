import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MenuNavigator = createAppContainer(createStackNavigator( {
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
},
{
    initialRouteName: 'Menu',
}));


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
            <MenuNavigator />
        </View>
        );
    }
}

export default Main;