import { useEffect, useRef, useState,useContext } from 'react';
import {View,FlatList,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator} from 'react-native';
import MovieLapCard from '../components/MovieLapCard';
import { ThemeContext } from '../libs/Theme';




export default function ListAllPage({ route, navigation }){
    const [loading, setLoading] = useState(true);
    const [data,setData] = useState([]);
    const [searchData , setSearchData ] = useState([]);
    const [page,setPage] = useState(1);
    const flashListRef = useRef();
    const { api } = route.params;
    const { theme } = useContext(ThemeContext);
    const fetchApi=async(api)=>{
      try{
        const res = await fetch(api,{
          method:'GET',
          headers:{
            accept:'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2I3N2U5M2Q3Y2RmNzRkNTRmNWVlNWYxZmE1M2MxYiIsIm5iZiI6MTcyMjkxNjk0Ni42NDIzMzQsInN1YiI6IjY2OTBkZDFlMzk3ZDdlNmRhODgwOTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y8B_L1rwvOuVJIeWoNV5TUCOHrQ3XVIRvjgyu6zpVOU'
          }
        });
  
        const resJ = await res.json();
  
        if (resJ && Array.isArray(resJ.results)) {
            setData(prevData => [...prevData, ...resJ.results]);
        } else {
            console.error("Unexpected data format:", resJ);
        }
      }catch(error){
        console.error('Failed to fetch data:', error);

       } finally {
          setLoading(false);
      }

    }
    useEffect(()=>{
      fetchApi(`https://api.themoviedb.org/3/movie/${api}?language=en-US&page=${page}`)
    },[page])

    useEffect(()=>{
      setSearchData(data);
    },[data])

    const handleEndReached = () => {
        setPage(prevPage => prevPage + 1);
    };

   
    return(

    <SafeAreaView style={[styles.container,{ backgroundColor: theme.colors.background }]}>
       {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) :
      (<FlatList
      ref={flashListRef}
      data={searchData} 
            renderItem={({item,index})=>{
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('MovieDetail',{name:item.title,key:item})}>
                <MovieLapCard
                title={item.title}
                releaseDate={item.release_date}
                image={item.poster_path}
                overview={item.overview}
                vote_average={item.vote_average}
                />
            </TouchableOpacity>
          )
      }}
      keyExtractor={item => item.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.7}
      />)}
    </SafeAreaView>
        
    )
}

const styles=StyleSheet.create({
  container:{
    // backgroundColor:'black',
    justifyContent:"center",
    alignItems:"center",
    flex:1
  }
})