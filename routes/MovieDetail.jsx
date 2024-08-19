import { useEffect, useState ,useContext} from 'react';
import { View, StyleSheet, ScrollView, Image, Text,FlatList,ActivityIndicator} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MovieCard from '../components/MovieCard';
import { ThemeContext } from '../libs/Theme';

export default function MovieDetail({ navigation ,route}) {
    const { name , key } = route.params;
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);



    const url = `https://api.themoviedb.org/3/movie/${key.id}/credits?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2I3N2U5M2Q3Y2RmNzRkNTRmNWVlNWYxZmE1M2MxYiIsIm5iZiI6MTcyMzUzMzcxNi4wNDEyNzcsInN1YiI6IjY2OTBkZDFlMzk3ZDdlNmRhODgwOTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FEzVvyGwmEILBbrsgZqYwOTcNpdPnyfC4Dju4uJiT4M'
      }
    };

    const fetchCredit = async()=>{
        try{

            const res = await fetch(url, options);
            const jsonRes =await res.json();
            setData(jsonRes.cast);
        }catch(error){
            console.error('Failed to fetch data:', error);
        } finally {
           setLoading(false);
       }
    }

    useEffect(()=>{
        fetchCredit();
    },[])

    return (
        <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
        {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" style={{flex:1,justifyContent:"center",alignItems:"center",}} />
            </View>
            ) :
            (<View style={{backgroundColor:theme.colors.backgroundColor}}>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `https://image.tmdb.org/t/p/w500${key.poster_path}` }}
                    />
                    <BlurView intensity={5} style={styles.blurOverlay} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,1)']}
                        style={styles.gradientOverlay}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <View style={styles.movieCard}>
                        <MovieCard item={key}/>
                    </View>
                </View>
                <View style={styles.overView}>
                    <Text style={[styles.headText,{color:theme.colors.text}]}>
                        Story Line
                    </Text>
                    <Text style={[styles.text,{color:theme.colors.text}]}>
                        {key.overview}
                    </Text>
                </View>
                
                <View style={styles.overView1}>
                    <Text style={[styles.headText,{color:theme.colors.text}]}>
                        Cast
                    </Text>

                    <View style={styles.castWrapper}>

                        <FlatList
                            horizontal
                            data={data} 
                            renderItem={({item,index})=>{
                            return (
                                    <View style={styles.castCard}>
                                        <Image style={styles.castImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}/>
                                        <Text style={[styles.text,{color:theme.colors.text}]}>{item.name}</Text>
                                    </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                        />

                    </View>
                    
                </View>
            </View>)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    castWrapper:{
        flexDirection:"row",
        gap:20,
    },
    castImage:{
        width:100,
        height:100,
        borderRadius:5,

    },
    overView1:{
        marginHorizontal:15,
        marginBottom:20,
    },
    overView:{
        marginHorizontal:15,
        marginTop:50,
        marginBottom:20,
    },
    headText:{
        fontSize:30,
        // color:'white',
    },
    container: {
        flex: 1,
        // backgroundColor: 'black',
    },
    imageContainer: {
        position: 'relative',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    image: {
        width: '100%',
        height: 300,
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 300,
    },
    text: {
        // color: 'white',
        paddingVertical: 10,
    },
    movieCard:{

        position:'absolute',
        bottom:-50,
    },
    castCard:{
        marginTop:10,
        marginHorizontal:10,
        alignItems:"center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"red",
      },
});
