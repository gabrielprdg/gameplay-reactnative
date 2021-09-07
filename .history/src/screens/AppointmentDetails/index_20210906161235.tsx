import React, { useEffect, useState } from 'react'
import { Fontisto } from '@expo/vector-icons'
import { Alert, FlatList, ImageBackground, Text, View } from 'react-native'
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { BorderlessButton } from 'react-native-gesture-handler'
import { theme } from '../../global/styles/theme'
import BannerImg from '../../assets/banner.png'
import { styles } from './styles'
import { ListHeader } from '../../components/ListHeader'
import { Member, MemberProps } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { useRoute } from '@react-navigation/core'
import { AppointmentProps } from '../../components/Appointment'
import { api } from '../../services/api'


type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string
  name: string
  instant_invite: string
  members: MemberProps[]
  presence_count: number
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)
  const route = useRoute()
  const { guildSelected } = route.params as Params

  async function fetchGuildWidget(){
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data)
      setLoading(false)
    }catch{
      Alert.alert("Verifique as configurações do servidor. O widget está habilitado ?")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuildWidget()
  })

  return(
    <Background>
      <Header 
        title="Details"
        action={
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}  
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3"/>
      
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Member data={item}/>
        )}
        ItemSeparatorComponent={() => (
          <ListDivider/>
        )}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida"/>
      </View>
    </Background>
  )
}