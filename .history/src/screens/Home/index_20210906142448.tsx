import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { Background } from '../../components/Background'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader'
import { Load } from '../../components/Load'
import { Profile } from '../../components/Profile'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { styles } from './styles'

export function Home () {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  
  const navigation = useNavigation()

  function handleAppointmentDetails () {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storage: AppointmentProps[] = response ? JSON.parse(response) : []
    

    if(category) {
      setAppointments(storage.filter(item => item.category === category))
    }else{ 
      setAppointments(storage)
    }

    setLoading(false)
  }

  useEffect(useCallback(() => {
    loadAppointments()
  },[category]))

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