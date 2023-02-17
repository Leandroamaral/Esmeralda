import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditarPerfil from './EditarPerfilScreen';
import Perfil from './PerfilScreen';
import EditarCampanha from './CampanhasScreen/EditarCampanhaScreen';
import InfEmpresa from './InfEmpresaScreen/EditarInfEmpresaScreen';
import EspecialistasMain from './EspecialistasScreen/EspecialistaMain';
import ServicosMain from './ServicosScreen/ServicosMain';
import UserMain from './UsersScreen/UsersMain';

export default function PerfilMain() {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Perfil" component={Perfil} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{headerShown: false}}>

        <RootStack.Screen
          name="EspecialistasMain"
          component={EspecialistasMain}
          options={{headerTitle: 'Especialistas'}}
          screenOptions={{headerShown: false}}
        />

        <RootStack.Screen
          name="Visualizar Usuarios"
          component={UserMain}
          options={{headerTitle: 'Visualizar Usuarios'}}
        />
        <RootStack.Screen
          name="ServicoView"
          component={ServicosMain}
          options={{headerTitle: 'Editar Serviço'}}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name="Editar Perfil"
          component={EditarPerfil}
          options={{headerTitle: 'Editar Minha Conta'}}
        />
        <RootStack.Screen
          name="Criar Campanha"
          component={EditarCampanha}
          options={{headerTitle: 'Editar Campanha'}}
        />
        <RootStack.Screen
          name="InfEmpresa"
          component={InfEmpresa}
          options={{headerTitle: 'Informações da Empresa '}}
        />
      </RootStack.Group>
    </RootStack.Navigator>

  );
}
