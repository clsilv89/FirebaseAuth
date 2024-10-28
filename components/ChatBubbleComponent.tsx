import { MessageBubble } from "@/models/MessageBubble.interface";
import { StyleSheet, Text, View } from "react-native";

export default function ChatBubbleComponent(props: MessageBubble) {

    const styleList = []
    if (props.isReceived) {
        styleList.push(styles.isReceived)
    } else {
        styleList.push(styles.isSent)
    }

    return (
        <View style={styles.container}>
            <Text style={styleList}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    isReceived: {
        width: 250,
        backgroundColor: '#babaca',
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    isSent: {
        width: 250,
        backgroundColor: '#25D366',
        margin: 10,
        borderRadius: 10,
        padding: 10
    }
})