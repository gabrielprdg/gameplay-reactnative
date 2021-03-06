import React, { useState } from 'react'
import { FlatList, View,Text } from 'react-native'
import { Profile } from '../../components/Profile'
import { styles } from './styles'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Background } from '../../components/Background'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { Load } from '../../components/Load'

export function Home () {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [appointment, setAppointment] = useState<AppointmentProps[]>([])
  
  const navigation = useNavigation()

  function handleAppointmentDetails () {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointment(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storage: AppointmentProps[] = response ? JSON.parse(response) : []
    

    if(category) {
      setAppointment(storage.filter(item => item.category === category))
    }else{ 
      setAppointment(storage)
    }

    setLoading(false)
  }

  function handleCategorySelected(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  return(
    <Background>
      <View style={styles.header}>
        <Profile/>
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect
        hasCheckBox={false}
        categorySelected ={category}
        setCategory={handleCategorySelected}
      />

      {
        loading ? <Load/>:
        <>
          <ListHeader title="Partidas agendadas" subtitle="Total 6"/>

          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Appointment 
                data={item}
                onPress={handleAppointmentDetails}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider/> }
            contentContainerStyle={{paddingBottom: 69}}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      }
      
    </Background>
  )
} 