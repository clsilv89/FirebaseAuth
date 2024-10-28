import { UserFromDatabase } from "@/models/UserFromDatabase.interface";
import { View, Text, Image, StyleSheet } from "react-native";

export default function UserItemListComponent(props: UserFromDatabase) {
    return(
        <View style={ styles.container }>
            <Image source={{ uri: props.downloadURL }} style={ styles.avatar }/>
            <Text style={styles.userName}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 12,
        height: 72,      
    },
    userName: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    avatar: {
        margin: 10, 
        width: 60,
        height: 60,
        borderRadius: 60,
        alignSelf: 'baseline',
    }
})