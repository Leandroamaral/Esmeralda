import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditarPerfil from './EditarPerfilScreen';
import Perfil from './PerfilScreen';
import EditarCampanha from './EditarCampanhaScreen';
import EditarServicoView from './EditarServicosViewScreen';
import VisualizarUsuarioView from './VisualizarUsuariosViewScreen';
import EditarServico2 from './EditarServicosScreen2';

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
          name="Editar Servico" 
          component={EditarServicoView}
          options={{headerTitle: 'Editar Serviço'}}  
        />
        <RootStack.Screen 
          name="Editar Servico2" 
          component={EditarServico2}
          options={{headerTitle: 'Editar Serviço2'}}  
        />
      </RootStack.Group>
    </RootStack.Navigator>
      
    );
  }