import { Button, StyleSheet, TextInput, View } from 'react-native';
import { auth } from '@/components/Firebase'
import { useState, useEffect} from 'react'
import { User } from '@/models/User.interface';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [user, setUser] = useState<User>()

    useEffect(() => {
        if (user?.uid) {
            navigation.navigate('Landing', { uid: user?.uid })
        }
    })
    
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
            <Button title='Fazer Login'
                onPress={() => login()}
            />

            <Button title='Não possui usuário? Fazer cadastro'
                onPress={() => navigation.navigate('Logon')}
            />
        </View>
    );
}