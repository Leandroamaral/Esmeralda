import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { Rating } from 'react-native-elements';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function Agendar({navigation}) {
  return (

    <View>
      <View style={styles.tituloView}>
        <Text style={styles.tituloTexto}>Agendar </Text>
      </View>
      
      <View>
        <WeeklyCalendar style={styles.calendario}
          startWeekday={7}
          locale = 'pt-br'
          titleStyle = {styles.calendarioTitulo}
          dayLabelStyle = {styles.calendarioLabel}
         />
      </View>
      
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione a especialista</Text>
      </View>

      <SafeAreaView>
        <ScrollView horizontal={true}>
      
          <View style={styles.espMainView}>
            <View style={styles.espView}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp1.png')}
                  style={styles.espImg}
                    />
              </TouchableOpacity>
              
              <Text style={styles.espTexto}>Regiane Liberato</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={4.5}
                style={styles.espRating}
              />
            </View>
            <View style={styles.espView}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp2.png')}
                  style={styles.espImg}
                    />
              </TouchableOpacity>
              
              <Text style={styles.espTexto}>Nome Especialista</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={3}
                style={styles.espRating}
              />
            </View>
            <View style={styles.espView}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp3.png')}
                  style={styles.espImg}
                    />
              </TouchableOpacity>
              
              <Text style={styles.espImg}>Nome Especialista</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={4}
                style={styles.espRating}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
      </View>

      <View style={styles.horarioView}>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>09:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>10:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>11:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>13:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>14:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>15:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>16:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>17:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>18:00</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.reservarView}>
        <TouchableOpacity style={styles.reservarBotao}>
              <Text style={styles.reservarTexto}>Reservar Horário</Text>
        </TouchableOpacity>
      
      </View>



    </View>


  );
}