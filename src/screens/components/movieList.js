import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { moviesData } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, image342, poster342 } from '../../api/moviedb';
// import { styles } from '../../theme';
const {width, height} =  Dimensions.get('window');

export default function MovieList({title, hideSeeAll, data}) {
  const navigation = useNavigation();
  return (
       <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          )
        }
        
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                style={styles.image}
              />
              <Text style={styles.itemTitle}>
                {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create( {
  container: {
    marginBottom: 8,
    marginTop: 25,
  },
  header: {
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:5
  },
  seeAll: {
    color: 'white',
    fontSize: 26,
    paddingLeft:10,
    paddingRight:10,
    marginBottom:5
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginRight: 10,
    marginTop: 25,
  },
  image: {
    width: 180,
    height: 280,
    borderRadius: 20,
  },
  itemTitle: {
    color: '#ccc',
    fontSize:24,
    marginLeft: 1,
  },
});