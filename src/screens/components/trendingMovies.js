import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/moviedb';


var {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();

    const handleClick = item=>{
        navigation.navigate('Movie', item);
    };

    const styles = StyleSheet.create({
        container:{
            marginBottom:32,
            marginTop:24,
        },
        textTitle:{
            color:'white',
            fontSize:35,
            fontWeight: 'bold',
            paddingLeft:10,
            paddingRight:10,
            marginBottom:20
        }
    });
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Trending</Text>
        <View style={{ paddingLeft: 10, borderRadius:10 }}>
        <ScrollView horizontal>
            {data.map((item) => (
            <MovieCard key={item.id} handleClick={handleClick} item={item} />
            ))}
        </ScrollView>
        </View>
    </View>
  );
}

const MovieCard = ({item, handleClick})=>{

    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image 
                // source={require('../assets/images/moviePoster1.png')} 
                source={{uri: image500(item.poster_path)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 18,
                    marginRight: 10,
                }}
            />
        </TouchableWithoutFeedback>
    );
};