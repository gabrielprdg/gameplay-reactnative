import React from "react";
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from "../../utils/categories";
import { GuildIcon } from "../GuildIcon";
import { styles } from './styles';
import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'
import { theme } from "../../global/styles/theme";
import { GuildProps } from '../Guild'

export interface AppointmentProps {
  id: string
  guild: GuildProps
  category: string
  date: string
  description: string
}

type Props = RectButtonProps & {
  data: AppointmentProps
}

export function Appointment({ data, ...rest}: Props) {
    const [category] = categories.filter(categoriesData => categoriesData.id === data.category)
    const { primary, on } = theme.colors
    const { owner } = data.guild

    return (
      <RectButton {...rest}
      >
        <View style={styles.container}>
          <GuildIcon/>

          <View style={styles.content}>
            <View style={styles.header}>

              <Text style={styles.title}>
                {data.guild.name}
              </Text>

              <Text style={styles.category}>
                {category.title}
              </Text>
            </View>
            
            <View style={styles.footer}>
              <View style={styles.dateInfo}>
                <CalendarSvg/>

                <Text style={styles.date}>
                  {data.date}
                </Text>
              </View>
            

              <View style={styles.playersInfo}>
                <PlayerSvg fill={data.guild.owner ? primary: on }/>

                <Text 
                  style={[
                    styles.players,
                    {color: owner ? primary: on} 
                  ]}>
                    {owner ? 'Anfitrião' : 'Visitante'}
                </Text>
              </View>

            </View>
          </View>
        </View>
      </RectButton>
    )
}