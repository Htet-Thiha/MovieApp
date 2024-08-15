import { View,StyleSheet ,Text,Image} from 'react-native';
import { BlurView } from 'expo-blur';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function MovieCardHorizontal({item}){

    return(
        <View style={styles.container}>

            <View style={[styles.cardContainer, styles.shadow]} >
                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={[styles.image, styles.shadow]}/>
                <BlurView style={[styles.info]} intensity={50} >
                    <Text style={styles.headText}>{item.title}</Text>
                    <Text style={styles.releaseDate} >
                        <FontAwesomeIcon icon={faStar} size={15} color='yellow' />
                        Release Date - {item.release_date}</Text>
                </BlurView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    releaseDate:{
        color:"yellow",
    },
    info:{
        width:250,
        height:120,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
        position:"absolute",
        bottom:-50,
        overflow: 'hidden', 
    }
    ,shadow:{
        shadowColor: 'black', // iOS shadow color
        shadowOffset: { width:0, height: 5 }, // iOS shadow offset
        shadowOpacity: .5, // iOS shadow opacity
        shadowRadius: 3, // iOS shadow radius
        elevation: 5, // android shadow 
    }
    ,cardContainer:{
        justifyContent:"center",
        alignItems:"center",
    }
    ,image:{
        width:200,
        height:250,
        borderRadius:25,
        borderColor:"gray",
        borderWidth:.5,

    },
    container:{
        paddingBottom:30,
        marginHorizontal:30,
        marginBottom:30,
        justifyContent:"center",
        alignItems:"center",
    },
    headText:{
        color:"black",
        fontSize:30,
        fontWeight:"700",
        textAlign:"center",
        overflow:"scroll",
    }
})