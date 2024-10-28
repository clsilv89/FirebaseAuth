import ChatBubbleComponent from "@/components/ChatBubbleComponent"
import { database } from "@/components/Firebase"
import { Message } from "@/models/Message.interface"
import { UserFromDatabase } from "@/models/UserFromDatabase.interface"
import { useEffect, useRef, useState } from "react"
import { Button, FlatList, Text, TextInput, View } from "react-native"

export default function Chat({navigation, route}) {
    const { senderUid = '' } = route.params
    const { receiverUid = '' } = route.params

    const [receiver, setReceiver] = useState<UserFromDatabase>()
    const [messages, setMessages] = useState<Array<Message>>([])
    const messageRef = useRef(null)

    useEffect(() => {
        function getUserDetails() {
            database
                .ref(`usuario/${receiverUid}`)
                .on('value', snapshot => {
                    setReceiver(snapshot.val())
                    console.log(snapshot.val())
                })
        }

        function getMessagesFromDatabase() {
            database
                .ref(`usuario/${receiverUid}/messages`)
                .on('value', snapshot => {
                    const list = Array<Message>()
                    snapshot.forEach((child) => 
                        {
                            list.push(child.val())
                        }
                    )
                    setMessages(list)
                })
        }

        getUserDetails()
        getMessagesFromDatabase()
    }, [senderUid, receiverUid])

    navigation.setOptions({
        title: `${receiver?.name}`
    })

    function sendMessage(message: string) {
        database
            .ref(`usuario/${senderUid}/messages`)
            .push({
                message: message,
                senderUid: senderUid,
                receiverUid: receiverUid
            })
        database
            .ref(`usuario/${receiverUid}/messages`)
            .push({
                message: message,
                senderUid: senderUid,
                receiverUid: receiverUid
            })  
    }

    return(
        <View>
            <Text>{senderUid}, {receiverUid}</Text>
            <Text>{receiver?.name}, {receiver?.uid}</Text>
            
            <View>
                <FlatList 
                    data={messages}
                    renderItem={((item) => {
                        const MessageBubble = {
                            message: item?.item.message,
                            isReceived: item?.item.senderUid === receiverUid
                        }
                        return (
                            <ChatBubbleComponent {...MessageBubble} />
                        )
                    })}
                />
                <TextInput 
                    ref={messageRef}
                    onChangeText={(text) => messageRef.current.value = text}
                    placeholder="Digite sua mensagem aqui..."
                />
                <Button
                    title="Enviar"
                    onPress={() => sendMessage(messageRef.current.value)}
                />
            </View>
        </View>
    )
}