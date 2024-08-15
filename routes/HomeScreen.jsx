import * as React from 'react';
import { View, Text,Button,StyleSheet,ScrollView,SafeAreaView } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AuthContext, AuthProvider } from '../libs/AuthContext';
import { useContext } from 'react';

import HorizontalMovieList  from '../components/HorizontalMovieList';
import { ThemeContext } from '../libs/Theme';

export default function HomeScreen({navigation}) {

    const { logout } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);


    const popularApi = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const topRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const upcoming ='https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
     
    return (
        <SafeAreaView style={[styles.containerWrapper,{ backgroundColor: theme.colors.background }]}>
            <ScrollView style={styles.container}>
                <View style={styles.headwrapper}>
                    <View>
                        <Text style={[styles.headText,{color:theme.colors.text}]}>Popular</Text>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Button
                            title="View all"
                            onPress={() => navigation.navigate('ListAllPage',{api:'popular'})}
                        />
                        <ChevronRight style={styles.viewLink} size={30}/>
                    </View>
                </View>
                <HorizontalMovieList api={popularApi} onhandle={(item) => navigation.navigate('MovieDetail',{name:item.title,key:item})}/>

                <View style={styles.headwrapper}>
                    <View>
                        <Text style={[styles.headText,{color:theme.colors.text}]}>Now Playing</Text>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Button
                            title="View all"
                            onPress={() => navigation.navigate('ListAllPage',{api:'now_playing'})}
                        />
                        <ChevronRight style={styles.viewLink} size={30}/>
                    </View>
                </View>
                <HorizontalMovieList api={nowPlaying} onhandle={(item) => navigation.navigate('MovieDetail',{name:item.title,key:item})}/>

                <View style={styles.headwrapper}>
                    <View>
                        <Text style={[styles.headText,{color:theme.colors.text}]}>Top Rated</Text>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Button
                            title="View all"
                            onPress={() => navigation.navigate('ListAllPage',{api:'top_rated'})}
                        />
                        <ChevronRight style={styles.viewLink} size={30}/>
                    </View>
                </View>
                <HorizontalMovieList api={topRated} onhandle={(item) => navigation.navigate('MovieDetail',{name:item.title,key:item})}/>

                <View style={styles.headwrapper}>
                    <View>
                        <Text style={[styles.headText,{color:theme.colors.text}]}>Up Coming</Text>
                    </View>
                    <View style={styles.linkWrapper}>
                        <Button
                            title="View all"
                            onPress={() => navigation.navigate('ListAllPage',{api:'upcoming'})}
                        />
                        <ChevronRight style={styles.viewLink} size={30}/>
                    </View>
                </View>
                <HorizontalMovieList api={upcoming} onhandle={(item) => navigation.navigate('MovieDetail',{name:item.title,key:item})}/>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headwrapper:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
    }
    ,linkWrapper:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
    ,text:{
        color:"white",
        fontSize:20,
        justifyContent:"center",
        alignItems:"center",
}   
    ,viewLink:{
        color:"gray",
    }
    ,
    headText:{
        fontSize:40,
        fontWeight:"900",
    }
    ,container:{
        // backgroundColor:"black",
        flex:1,
        paddingHorizontal:10,
    }
    ,containerWrapper:{
        // backgroundColor:"black",
        flex:1,
    },
})