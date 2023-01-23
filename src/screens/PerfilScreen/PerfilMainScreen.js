import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditarPerfil from './EditarPerfilScreen';
import Perfil from './PerfilScreen';
import EditarCampanha from './EditarCampanhaScreen';
import EditarServicoView from './EditarServicosViewScreen';
import VisualizarUsuarioView from './UsersView/VisualizarUsuariosViewScreen';
import EditarServico from './EditarServicosScreen';

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
         <RootStack.Screen 
          name="Visualizar Usuarios" 
          component={VisualizarUsuarioView}
          options={{headerTitle: 'Visualizar Usuarios'}}  
        />
        <RootStack.Screen 
          name="EditarServicoView" 
          component={EditarServicoView}
          options={{headerTitle: 'Editar Serviço'}}  
        />
        <RootStack.Screen 
          name="EditarServico" 
          component={EditarServico}
          options={{headerTitle: 'Editar Serviço'}}  
        />
      </RootStack.Group>
    </RootStack.Navigator>
      
    );
  }