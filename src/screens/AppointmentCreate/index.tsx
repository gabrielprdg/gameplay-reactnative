import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Text, View, ScrollView, Platform, KeyboardAvoidingView, Modal} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Background } from '../../components/Background'
import { CategorySelect } from '../../components/CategorySelect'
import { Header } from '../../components/Header'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Guilds } from '../Guilds'
import { ModalView } from '../../components/ModalView'
import { GuildProps } from '../../components/Guild'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENTS, COLLECTION_USER } from '../../configs/database'
import { useNavigation } from '@react-navigation/core'

export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation()

  function handleOpenGuilds(){
    setOpenGuildsModal(true)
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false)
  }

  function handleOpenGuildSelected(guildSelected: GuildProps){
    setGuild(guildSelected)
    setOpenGuildsModal(false)
  }

  function handleCategorySelected(categoryId: string) {
    setCategory(categoryId)
  }

  async function handleSave(){
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} ás ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const appointment = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointment, newAppointment])
    )

    navigation.navigate('Home')
  }

  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
              <Header
                title="Appointment Create"
              />

              <Text style={[styles.label, {marginLeft: 24, marginTop: 36, marginBottom: 18}]}>
                Categoria
              </Text>

              <CategorySelect
                hasCheckBox
                setCategory={handleCategorySelected}
                categorySelected={category}
              />

              <View style={styles.form}> 
                <RectButton onPress={handleOpenGuilds}>

                  <View style={styles.select}>
                    {
                      guild.icon ? 
                      <GuildIcon guildId={guild.id} iconId={guild.icon}/>:
                      <GuildIcon guildId={guild.id} iconId={null}/>
                    }

                    <View style={styles.selectBody}>
                      <Text style={styles.label}>
                        {guild.name ? guild.name : 'Selecione um servidor'}  
                      </Text>
                    </View>

                    <Feather 
                      name="chevron-right"
                      color={theme.colors.heading}
                      size={18}
                    />

                  </View>
                </RectButton>

                <View style={styles.field}>
                  <View>
                    <Text style={[styles.label, {marginBottom: 12}]}>
                      Dia e mês
                    </Text>

                    <View style={styles.column}>
                      <SmallInput 
                        maxLength={2}
                        onChangeText={setDay}
                      />

                      <Text style={styles.divider}>
                        /
                      </Text>

                      <SmallInput 
                        maxLength={2}
                        onChangeText={setMonth}
                      />
                    </View>
                </View>

                  <View>
          
                    <Text style={[styles.label, {marginBottom: 12}]}>
                      Hora e minuto
                    </Text>

                    <View style={styles.column}>
                      <SmallInput 
                        maxLength={2}
                        onChangeText={setHour}
                      />

                      <Text style={styles.divider}>
                        :
                      </Text>

                      <SmallInput 
                        maxLength={2}
                        onChangeText={setMinute}
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.field, {marginBottom: 12}]}>
                  <Text style={styles.label}>
                    Descrição
                  </Text>

                  <Text style={styles.caracteresLimit}>
                    Max 100 caracteres
                  </Text>
                </View>

                <TextArea
                  multiline
                  maxLength={100}
                  numberOfLines={5}
                  autoCorrect={false}
                  onChangeText={setDescription}
                />

                <View style={styles.footer}>
                  <Button 
                    title="Agendar"
                    onPress={handleSave}
                  />
                </View>

              </View>
          </ScrollView>
        </Background>

          <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
            <Guilds handleGuildSelected={handleOpenGuildSelected}/>
          </ModalView>
    </KeyboardAvoidingView>
  )
}