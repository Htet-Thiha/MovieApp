import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BlurView } from 'expo-blur';


export default function MovieLapCard({ title, image, releaseDate, overview ,vote_average}) {
    return (
        <View style={styles.movieCard}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }} style={styles.image} />
            </View>
            
            <BlurView style={styles.lapContainer}
                intensity={50}
            >
                <Text style={styles.movieName}>{title}</Text>
                <Text style={styles.rating}>
                    <FontAwesomeIcon icon={faStar} size={15} color='yellow' />
                    Release Date - {releaseDate}
                </Text>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    lapContainer:{
        width:380,
        height:150,
        // backgroundColor:"red",
        position:"absolute",
        // overflow:"hidden",
        // borderBlockColor:"black",
        // borderWidth:5,
        // backgroundColor: 'rgba(255, 255, 255, 0.2)',
        // borderRadius:50,
        bottom:5,
        justifyContent:"center",
        alignItems:"center",

    },
    rating: {
        color: "yellow",
        fontSize: 15,
    },
    movieName: {
        color: "white",
        fontSize: 40,
        textAlign:"center",
        fontWeight:"900",
    },
    movieCard: {
        width: 400,
        height: 500,
        // backgroundColor: "gray",
        borderRadius: 25,
        shadowColor: 'white', // iOS shadow color
        shadowOffset: { width:0, height: 5 }, // iOS shadow offset
        shadowOpacity: .5, // iOS shadow opacity
        shadowRadius: 3, // iOS shadow radius
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
        // gap: 20,
        marginVertical:10,
        marginHorizontal:15,
    },
    image: {
        width: 300,
        height: 400,
        borderRadius: 20,
    }
});
