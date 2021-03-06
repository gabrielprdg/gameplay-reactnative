import React from "react"
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import {styles} from './styles'

type Props = TouchableOpacityProps & {
  title: string
}

export function ButtonNo({title, ...rest}: Props){
  return(
    <TouchableOpacity 
      style={styles.container} 
      {...rest}>
      
        <Text style={styles.text}>
          {title}
        </Text>
        
    </TouchableOpacity>
  )
}