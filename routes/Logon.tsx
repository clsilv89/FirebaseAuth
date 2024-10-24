import { auth, database, storage } from '@/components/Firebase';
import { User } from '@/models/User.interface';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';

export default function Logon({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [dtNasc, setDtNasc] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [user, setUser] = useState<User>()
  const [imageSelected, setImageSelected] = useState<ImagePickerResponse>()

  useEffect(() => {
    if (user?.uid) {
      navigation.navigate('Landing', { uid: user?.uid })
      saveUserOnDatabase()
    }
  })

  async function openCamera() {
    const options = {
      mediaType: 'photo'
    }

    try {
      const response = await launchCamera(options)
      setImageSelected(response)
      await saveImage(response.assets[0].uri)
    } catch (e) {
      console.log(e)
    }
  }

  async function saveImage(uri: string) {
    const ref = storage.ref('usuarios/avatar')
    await ref.putFile(uri)
  }

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
    if (password === repeatPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          setUser(response.user)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      Alert.alert('Atenção!', 'As senhas não coincidem! Favor verificar!', [
        { text: 'Ok' }
      ])
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Nome'
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Data de Nascimento'
        onChangeText={(text) => setDtNasc(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        placeholder='Senha'
        secureTextEntry={true}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setRepeatPassword(text)}
        placeholder='Repita a sua Senha'
        secureTextEntry={true}
      />
      <Image source={{ uri: imageSelected?.assets[0].uri }} style={{ width: 100, height: 100 }} />
      <TouchableHighlight
        style={styles.buttonCriarUsuario}
        onPress={() => openCamera()}>
        <Text style={styles.textButtonCriarUsuario}>Selecionar foto</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonCriarUsuario}
        onPress={() => createUser()}>
        <Text style={styles.textButtonCriarUsuario}>Criar Usuário</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#075E54',
    flex: 1
  },
  buttonCriarUsuario: {
    backgroundColor: '#128C7E',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonCriarUsuario: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18
  },
  textCreateUser: {
    alignSelf: 'center',
    color: '#34B7F1',
    margin: 16
  },
  textInput: {
    borderColor: '#25D366',
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
  }
})