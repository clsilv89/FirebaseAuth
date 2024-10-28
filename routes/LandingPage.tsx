import { Button, FlatList, Text, TouchableHighlight, View } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "@/components/Firebase"
import { database } from "@/components/Firebase"
import { UserFromDatabase } from "@/models/UserFromDatabase.interface"
import UserItemListComponent from "@/components/UserItemListComponent"

export default function LandingPage({navigation, route}) {
    const [user, setUser] = useState<UserFromDatabase>()
    const [contacts, setContacts] = useState<Array<UserFromDatabase>>([])
    const { uid = '' } = route.params

    useEffect(() => {
        // function getUser() {
        //     database
        //         .ref(`usuario/${uid}`)
        //         .on('child_changed', (snapshot) => {
        //             snapshot.forEach((child) => {
        //                 console.log(child)
        //             })
        //             setUser(snapshot.val())
        //             console.log(snapshot)
        //         })
        // }

        function getUsers() {
            database
                .ref(`usuario`)
                .on('value', snapshot => {
                    const list = Array<UserFromDatabase>()
                    snapshot.forEach((child) => {
                        if (child.val().uid !== uid) {
                            list.push(child.val())
                        }
                        console.log(child, list)
                    })
                    setContacts(list)
                })
        }

        getUsers()
    }, [uid])

    return(
        <View>
            <Text>Usuário Logado!!!</Text>
            <FlatList
                data={contacts}
                renderItem={((item) => {
                    return (
                        <TouchableHighlight
                            onPress={() =>
                                navigation.navigate('Chat',
                                    {
                                        senderUid: uid,
                                        receiverUid: item?.item.uid
                                    }
                                )
                            }>
                            <UserItemListComponent {...item?.item} />
                        </TouchableHighlight>
                    )
                })}
            />
        </View>
    )
}