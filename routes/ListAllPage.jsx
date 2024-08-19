import { useContext } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import MovieLapCard from '../components/MovieLapCard';
import { ThemeContext } from '../libs/Theme';
import { useInfiniteQuery } from 'react-query';

export default function ListAllPage({ route, navigation }) {
    const { api } = route.params;
    const { theme } = useContext(ThemeContext);

    // Fetch function
    const fetchMovies = async ({ pageParam = 1 }) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${api}?language=en-US&page=${pageParam}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2I3N2U5M2Q3Y2RmNzRkNTRmNWVlNWYxZmE1M2MxYiIsIm5iZiI6MTcyMjkxNjk0Ni42NDIzMzQsInN1YiI6IjY2OTBkZDFlMzk3ZDdlNmRhODgwOTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y8B_L1rwvOuVJIeWoNV5TUCOHrQ3XVIRvjgyu6zpVOU'
              }
        });
        const data = await response.json();
        return {
            results: data.results,
            nextPage: data.page + 1,
        };
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
        isError
    } = useInfiniteQuery(
        `${api}`,
        fetchMovies,
        {
            getNextPageParam: (lastPage) => lastPage.nextPage, 
        }
    );

    if (isLoading) return <ActivityIndicator size="large" color="green" />;
    if (isError) return <Text>Error loading data...</Text>;

    // Combine all pages into one array
    console.log("data->",data);
    console.log("dataPage",data.pages);
    const items = data.pages.flatMap(page => page.results);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { name: item.title, key: item })}>
                        <MovieLapCard
                            title={item.title}
                            releaseDate={item.release_date}
                            image={item.poster_path}
                            overview={item.overview}
                            vote_average={item.vote_average}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id} 
                onEndReached={() => {
                    if (hasNextPage && !isFetching) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.7}
                ListFooterComponent={isFetching ? <ActivityIndicator size="large" color="white" /> : null}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});
