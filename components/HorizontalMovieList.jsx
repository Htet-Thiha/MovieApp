// import { useEffect, useState } from 'react';
import {FlatList,StyleSheet,SafeAreaView ,TouchableOpacity ,ActivityIndicator ,View} from 'react-native';
import MovieCardHorizontal from './MovieCardHorizontal';
import { useQuery } from "react-query";

export default function HorizontalMovieList({onhandle,api,qKey}){
    // const [data,setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const { isLoading, isError, error, data } = useQuery(`${qKey}`,
      async()=>{
        const res = await fetch(api,{
          method:'GET',
          headers:{
              accept:'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2I3N2U5M2Q3Y2RmNzRkNTRmNWVlNWYxZmE1M2MxYiIsIm5iZiI6MTcyMjkxNjk0Ni42NDIzMzQsInN1YiI6IjY2OTBkZDFlMzk3ZDdlNmRhODgwOTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y8B_L1rwvOuVJIeWoNV5TUCOHrQ3XVIRvjgyu6zpVOU'
          }
      });
      return res.json();
      }
    )
    
      if(isError){
        console.error('Failed to fetch data:', error);
      }
      // console.log(data.results);
    return(
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          horizontal
          data={data.results}
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