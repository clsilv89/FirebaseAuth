import { Button, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "@/components/Firebase"
import { database } from "@/components/Firebase"
import { UserFromDatabase } from "@/models/UserFromDatabase.interface"

export default function LandingPage({navigation, route}) {
    const [user, setUser] = useState<UserFromDatabase>()
    const { uid = '' } = route.params

    async function getUser() {
        database
            .ref(`usuario/${uid}`)
            .once('value')
            .then((snapshot) => {
                setUser(snapshot.val())
                console.log(snapshot)
            })
    }

    getUser()

    return(
        <View>
            <Text>Usuário Logado!!!</Text>
            <Text>{user?.name}</Text>
            <Button 
                title="Fazer logoff"
                onPress={() => 
                    {
                        navigation.navigate('Login')
                        auth.signOut() 
                    }
                }
            />
        </View>
    )
}