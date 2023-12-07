import { View, Text, Image, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();

    const handleClick = item=>{
        navigation.navigate('Movie', item);
    };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
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
                className="rounded-3xl" 
            />
        </TouchableWithoutFeedback>
    );
};