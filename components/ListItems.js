import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet, Image } from 'react-native';
export default function ListItems(props) {
    return (
        <View style={styles.listView}>
            <FlatList
                data={props.listItems}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={{
                                padding: 2,
                                backgroundColor: '#f8f8f8',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                                width: 250,
                                marginTop: 0,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                display: 'flex',
                                margin: 4,
                            }}
                        >
                            <Text style={{
                                padding: 10
                            }}> {item.task}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    props.deleteItem(item.id);
                                }}
                            >
                                <Text style={{
                                    padding: 0
                                }}></Text><Image
                                    source={require('../assets/trash-can.png')}
                                    style={styles.tinyLogo}
                                /></TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )}
            ></FlatList>
        </View>
    );


}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        padding: 0,
        marginTop: 0,
    },
    tinyLogo: {
        width: 20,
        height: 20,
        padding: 0,
        justifyContent: 'center',
        resizeMode: 'center',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 0
    },
    logo: {
        width: 66,
        height: 58,
    },
});
