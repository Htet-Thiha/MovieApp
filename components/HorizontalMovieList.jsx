import { useEffect, useState } from 'react';
import {FlatList,StyleSheet,SafeAreaView ,TouchableOpacity ,ActivityIndicator ,View} from 'react-native';
import MovieCardHorizontal from './MovieCardHorizontal';

export default function HorizontalMovieList({onhandle,api}){
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiFetch = async(api)=>{
      try{

        const response = await fetch(api,{
            method:'GET',
            headers:{
                accept:'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2I3N2U5M2Q3Y2RmNzRkNTRmNWVlNWYxZmE1M2MxYiIsIm5iZiI6MTcyMjkxNjk0Ni42NDIzMzQsInN1YiI6IjY2OTBkZDFlMzk3ZDdlNmRhODgwOTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y8B_L1rwvOuVJIeWoNV5TUCOHrQ3XVIRvjgyu6zpVOU'
            }
        })
        const res = await response.json();
        setData([...data,...res.results]);
      }catch(error){
        console.error('Failed to fetch data:', error);

       } finally {
          setLoading(false);
      }
    }

    useEffect(()=>{
        apiFetch(`${api}`);
    },[])
   
    return(
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          horizontal
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onhandle(item)}>
              <MovieCardHorizontal key={index} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

    </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});