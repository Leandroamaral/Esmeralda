import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EspecialistasViewScreen from './EspecialistaViewScreen';
import EspecialistasEditScreen from './EspecialistaEditScreen';
import TimetableScreen from './TimetableScreen';
import EspecialistaServicos from './EspecialistaServicos';


export default function EspecialistasMain({navigation}) {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="EditarEspecialistas"
          component={EspecialistasViewScreen}
          options={{headerTitle: 'Especialistas '}}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="EditarEspecialista"
          component={EspecialistasEditScreen}
          options={{headerTitle: 'Editar Especialista '}}
        />
        <RootStack.Screen
          name="Timetable"
          component={TimetableScreen}
          options={{headerTitle: 'Editar Timetable '}}
        />
        <RootStack.Screen
          name="EspecialistaServicos"
          component={EspecialistaServicos}
          options={{headerTitle: 'Editar Serviços '}}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
