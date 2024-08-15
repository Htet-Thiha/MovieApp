import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { AuthContext } from '../libs/AuthContext';

export default function LogIn({ navigation }) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const { login } = useContext(AuthContext);

    const authHandle = () => {
        const success = login(username, pass);
        if(!success){
            setUsername('');
            setPass('');
        }
    };

    return (
        <View>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="User Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPass}
                value={pass}
                placeholder="Password"
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={authHandle}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        color: "black",
        textAlign: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
    },
    button: {
        backgroundColor: "gray",
        width: 150,
        height: 50,
        borderRadius: 10,
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 70,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        color: "black",
        fontSize: 20,
    },
});
