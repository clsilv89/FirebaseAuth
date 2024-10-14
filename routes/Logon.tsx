import { Button, StyleSheet, TextInput, View } from 'react-native';
import { auth, database } from '@/components/Firebase'
import { useState, useEffect} from 'react'
import { User } from '@/models/User.interface';

export default function Logon({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [dtNasc, setDtNasc] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [user, setUser] = useState<User>()

    useEffect(() => {
      if (user?.uid) {
        navigation.navigate('Landing', { uid: user?.uid })
        saveUserOnDatabase()
      }
    })

    async function saveUserOnDatabase() {
      database.ref(`usuario/${user?.uid}`).set({
        name: name,
        email: email,
        birthDate: dtNasc,
        uid: user?.uid
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
    async function createUser() {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          setUser(response.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return (
      <View style={{ margin: 24 }}>
        <TextInput 
          placeholder='Nome'
          onChangeText={(text) => setName(text)}
        />
        <TextInput 
          placeholder='Data de Nascimento'
          onChangeText={(text) => setDtNasc(text)}
        />
        <TextInput 
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
          onChangeText={(text) => setPassword(text)}
          placeholder='Senha'
          secureTextEntry={true}
        />
        <TextInput 
          onChangeText={(text) => setRepeatPassword(text)}
          placeholder='Repita a sua Senha'
          secureTextEntry={true}
        />
        <Button title='Criar Usuário'
          onPress={() => createUser()}
        />
      </View>
    );
}