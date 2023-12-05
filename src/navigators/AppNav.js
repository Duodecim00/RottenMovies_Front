import {View, Text} from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import RootStack from './RootStack';

const AppNav =() => {

    return (
<NavigationContainer>
    <RootStack></RootStack>
</NavigationContainer>
    );
};

export default AppNav;