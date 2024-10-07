import { Button, StyleSheet, TextInput, View } from 'react-native';
import { auth } from '@/components/Firebase'
import { useState, useEffect} from 'react'
import React from 'react';
import { User } from '@/models/User.interface';

export default function HomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (user?.uid) {
      console.log('Navegar para a home')
    }
  })

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

  async function login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        console.log(response.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  return (
    <View style={{ margin: 24 }}>
      <TextInput 
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        onChangeText={(text) => setPassword(text)}
        placeholder='Senha'
        secureTextEntry={true}
      />
      <Button title='Criar'
        onPress={() => createUser()}
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
      <Button title='Fazer Login'
        onPress={() => login()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
