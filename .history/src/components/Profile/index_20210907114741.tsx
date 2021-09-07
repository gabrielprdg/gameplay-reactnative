import React from 'react'
import { View, Text, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useAuth } from '../../hooks/auth'
import { Avatar } from '../Avatar'
import { ModalSignOut } from '../ModalSignOut'
import { styles } from './styles'

type ProfileProps = {
  modalSignOut: () => void
}

export function Profile({modalSignOut}: ProfileProps) {
  const {user, signOut} = useAuth()

  function handleSignOut(){
    modalSignOut()
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar}/>
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>
        
        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>
    </View>
  )
}