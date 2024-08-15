import * as React from 'react';
import { View, Text,Button,StyleSheet,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { api } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(api)}</Text>
        <Text>{api}</Text>

      </View>
    );
  }
  
  