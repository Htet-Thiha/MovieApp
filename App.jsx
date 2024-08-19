import {View , Text ,StyleSheet ,SafeAreaView} from 'react-native';

export default function App(){
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.item2}><Text>a</Text></View>
                <View style={styles.item}><Text>b</Text></View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{

    },

    item2:{
        width:"100%",
        height:150,
        backgroundColor:"blue",
        // borderRadius:20,
        position:"absolute",
    },
    item:{
        width:"100%",
        height:500,
        backgroundColor:"red",
        borderRadius:30,
        position:"absolute",
        top:80,
    },
    container:{
        flex:1,
        backgroundColor:"black",

    }
})