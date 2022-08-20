import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { 
  useEffect, 
  useState,
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [ character, setCharacter ] = useState<ICharacter[]>();
  const [ showModal, setShowModal ] = useState(false)
  const [ characterDetails, setCharacterDetails ] = useState<ICharacter>()
  
  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, []);

  const getDataCharacter = (id: Number) => {
    const value: ICharacter[] | any = character?.filter( item => item.id === id )
    
    let parsed: any = {}

    value.forEach(function (item: any) {
      for (var i in item) {
        parsed[i] = item[i];
      }
    });
    setCharacterDetails(parsed)
  }

  return(
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <ScrollView>
        <View
          style={styles.container}
        >
          { character?.map(
            (item, index) => (
              <View 
                style={styles.card}
                key={index}
              >
                <Modal
                  animationType='slide'
                  visible={showModal}
                  onRequestClose={
                    () => setShowModal(!showModal)
                  }
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#7B25F0'
                  }}>
                    <Text>
                      {characterDetails?.name}
                    </Text>
                    <Pressable
                      onPress={ () => setShowModal(!showModal) }
                    >
                      <Text >Fechar</Text>
                    </Pressable>
                  </View>
                </Modal>
                <Image 
                  style={{ width: 100, height: 100, borderRadius:10 }}
                  source={{ uri: item.image }}
                />
                <View
                  style={styles.textBox}
                >
                  <Text
                    style={styles.textName}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.species}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.gender}
                  </Text>
                  <Pressable
                    onPress={ () => {
                      getDataCharacter(item.id)
                      setShowModal(!showModal)
                    } }
                    style={{
                      backgroundColor:'#a498ed',
                      padding:3,
                      borderRadius:5,
                      maxWidth:'30%',
                      alignItems:'center',
                      marginTop:5
                    }}
                  >
                    <Text style={{color:'#fff'}}> Ver mais </Text>
                  </Pressable>
                </View>
              </View>
            )
          ) }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262a31',
    marginTop:20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0b0f13',
    width: Dimensions.get('window').width - 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    margin: 12
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 15
  },
  textName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff'
  },
})

export default RMCharacter