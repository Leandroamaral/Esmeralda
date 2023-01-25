import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServicosEdit from './ServicosEditScreen';
import ServicosView from './ServicosViewScreen';


export default function ServicosMain ({ navigation }) {
    
    const RootStack = createStackNavigator();
    
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen 
                name="ServicosView" 
                component={ServicosView}
                options={{headerTitle: 'Serviços '}}  
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen 
                name="ServicosEdit" 
                component={ServicosEdit}
                options={{headerTitle: 'Editar Especialidade '}}  
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );


};