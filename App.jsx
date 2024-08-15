import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './libs/AuthContext';
import { useContext } from 'react';
import ListAllPage from './routes/ListAllPage';
import MovieDetail from './routes/MovieDetail';
import HomeScreen from './routes/HomeScreen';
import LogIn from './routes/LogIn';
import {Button ,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { ThemeContext, ThemeProvider  } from './libs/Theme';

// const MyTheme = {
//     dark: false,
//     colors: {
//       primary: 'rgb(255, 45, 85)',
//       background: 'white',
//       card: 'rgb(255, 255, 255)',
//       text: 'red',
//       border: 'rgb(199, 199, 204)',
//       notification: 'rgb(255, 69, 58)',
//     },
//   };

const AuthenticatedStack = createNativeStackNavigator();
function AuthenticatedNavigator({navigation}) {
    const { logout } = useContext(AuthContext);
    const { theme , toggleTheme} = useContext(ThemeContext)
    // const handleLogout = () => {
    //     logout();
    // };
    return (
        <AuthenticatedStack.Navigator
        screenOptions={{
            // headerShown: false,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'slide_from_bottom',
            headerRight:()=>(
                <View style={{flexDirection:"row"}}>
                    <Button
                    onPress={() =>logout()}
                    title="Logout"
                    color={theme.colors.text}
                    />
                     <Button
                    onPress={() =>toggleTheme()}
                    title="theme"
                    color={theme.colors.text}
                    />
                </View>
            )
          }}>
            <AuthenticatedStack.Screen name="Home" component={Home} options={{ title: '' }}/>
            <AuthenticatedStack.Screen 
                name="ListAllPage" 
                component={ListAllPage} 
                options={({ route }) => ({ title: (route.params.api).toUpperCase() })}
            />
            <AuthenticatedStack.Screen 
                name="MovieDetail" 
                component={MovieDetail} 
                options={{ title: '' }}            
            />
            
        </AuthenticatedStack.Navigator>
    );
}

const UnauthenticatedStack = createNativeStackNavigator();
function UnauthenticatedNavigator() {

    return (
        <UnauthenticatedStack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
            <UnauthenticatedStack.Screen 
                name="LogIn" 
                component={LogIn} 
                options={{ title: 'Log In' }} 
            />
        </UnauthenticatedStack.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <AuthWrapper />
                </NavigationContainer>
            </ThemeProvider>
        </AuthProvider>
    );
}

// const Stack = createNativeStackNavigator();

function AuthWrapper() {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator/>;
}

const Tab = createBottomTabNavigator();
function Home(){
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
                        iconName = 'home'; // Change to desired icon name
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={'white'} />;
                },
                tabBarStyle: {
                    backgroundColor: '#f4511e', // Background color of the tab bar
                },
                tabBarActiveTintColor: 'black', // Font color when the tab is active
                tabBarInactiveTintColor: '#888',
                 headerShown: false,
            })}
        >
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
        </Tab.Navigator>
      );
}

