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

export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  function handleOpenGuilds(){
    setOpenGuildsModal(true)
  }

  function handleOpenGuildSelected(guildSelected: GuildProps){
    setGuild(guildSelected)
    setOpenGuildsModal(false)
  }

  return(
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
        <ScrollView>
          <Header
            title="Appointment Create"
          />

          <Text style={[styles.label, {marginLeft: 24, marginTop: 36, marginBottom: 18}]}>
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={setCategory}
            categorySelected={category}
          />

          <View style={styles.form}> 
            <RectButton onPress={handleOpenGuilds}>

              <View style={styles.select}>
                {
                  guild.icon ? <GuildIcon/> : <View style={styles.image}/>      
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.nome ? guild.nome : 'Selecione um servidor'}  
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
                <Text style={styles.label}>
                  Dia e m??s
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />

                  <Text style={styles.divider}>
                    /
                  </Text>

                  <SmallInput maxLength={2} />
                </View>
            </View>

              <View>
      
                <Text style={styles.label}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />

                  <Text style={styles.divider}>
                    :
                  </Text>

                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, {marginBottom: 12}]}>
              <Text style={styles.label}>
                Descri????o
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
            />

            <View style={styles.footer}>
              <Button title="Agendar"/>
            </View>

          </View>
        </ScrollView>

        <ModalView visible={openGuildsModal}>
          <Guilds handleGuildSelected={handleOpenGuildSelected}/>
        </ModalView>
    </KeyboardAvoidingView>
  )
}