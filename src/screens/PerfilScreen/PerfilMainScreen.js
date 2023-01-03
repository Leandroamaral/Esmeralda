import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditarPerfil from './EditarPerfilScreen';
import Perfil from './PerfilScreen';
import EditarCampanha from './EditarCampanhaScreen';

export default function PerfilMain() {

  const RootStack = createStackNavigator();
    
    return (
      <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Perfil" component={Perfil} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen 
          name="Criar Campanha" 
          component={EditarCampanha}
          options={{headerTitle: 'Editar Campanha'}}  
        />
        <RootStack.Screen 
          name="Editar Perfil" 
          component={EditarPerfil}
          options={{headerTitle: 'Editar Minha Conta'}}  
        />
      </RootStack.Group>
    </RootStack.Navigator>
      
    );
  }