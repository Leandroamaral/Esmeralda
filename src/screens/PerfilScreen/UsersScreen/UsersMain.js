import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsuariosViewScreen from './UsersViewScreen';



export default function UserMain ({ navigation }) {
    
    const RootStack = createStackNavigator();
    
    return (
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{ headerShown: true }}>
                <RootStack.Screen 
                name="UserView" 
                component={UsuariosViewScreen}
                options={{headerTitle: 'Usuários '}}  
                />
            </RootStack.Group>

        </RootStack.Navigator>
    );


};