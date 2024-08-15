import { View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function MovieCard({ item }) {
    const handlePlayNowPress = () => {
        const searchQuery = encodeURIComponent(item.title); // Encodes the movie title for use in the URL
        const url = `https://www.youtube.com/results?search_query=${searchQuery}`;
        Linking.openURL(url).catch(err => console.error("Failed to open URL", err));
    };
    return (
        <View style={styles.movieCard}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.movieName}>{item.title}</Text>
                <Text style={styles.rating}>
                    <FontAwesomeIcon icon={faStar} size={15} color='yellow' />
                    Release Date-{item.release_date}
                </Text>
                <TouchableOpacity style={styles.button} onPress={handlePlayNowPress}>
                    <Text style={styles.movieName}>Play Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        justifyContent:"center",
        alignItems:"center",
        width:150,
        height:50,
        backgroundColor:"#3e4491",
        borderRadius:15,
    },
    overview: {
        color: "white",
        fontSize: 20,
    },
    scrollableOverview: {
        height: 150,
    },
    rating: {
        color: "yellow",
        fontSize: 15,
    },
    movieName: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
    infoWrapper: {
        gap: 15,
        height: 200,
        width: 230,
        // backgroundColor:"red",
        justifyContent:"flex-end",
        // paddingVertical:10,
        // marginRight:30,
    },
    movieCard: {
        width: 400,
        height:250,
        // backgroundColor: "gray",
        borderRadius: 25,
        shadowColor: 'white', // iOS shadow color
        shadowOffset: { width: 3, height: 5 }, // iOS shadow offset
        shadowOpacity: .5, // iOS shadow opacity
        shadowRadius: 3, // iOS shadow radius
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // gap: 20,
        marginVertical:10,
        marginHorizontal:15,
    },
    image: {
        width: 150,
        height: 220,
        borderRadius: 20,
    }
});
