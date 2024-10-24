import { auth } from '@/components/Firebase';
import { User } from '@/models/User.interface';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function Login({ navigation }) {

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
        <View style={styles.container}>
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
            <TouchableHighlight style={styles.buttonLogin}
                onPress={() => login()}>
                <Text style={styles.textButtonLogin}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate('Logon')}>
                <Text style={styles.textCreateUser}>Não possui usuário? {"\n"} Fazer cadastro</Text>
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
    buttonLogin: {
        backgroundColor: '#128C7E',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButtonLogin: {
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