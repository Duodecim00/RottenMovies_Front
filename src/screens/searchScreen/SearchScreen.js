import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, searchMovies } from '../../api/moviedb';
import { debounce } from 'lodash';
import Loading from '../components/loading';

const {width, height} =  Dimensions.get('window');


export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = search=>{
        if(search && search.length>2){
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data=>{
                console.log('got search results');
                setLoading(false);
                if(data && data.results) setResults(data.results);
            });
        }else{
            setLoading(false);
            setResults([]);
        }
      };
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);    

  return (
    <SafeAreaView style={styles.container}>
    {/* search input */}
    <View style={styles.searchInputContainer}>
      <TextInput
        onChangeText={handleTextDebounce}
        placeholder="Search Movie"
        placeholderTextColor={'lightgray'}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.searchButton}>
        <XMarkIcon size="25" color="white" />
      </TouchableOpacity>
    </View>

    {/* search results */}
    {loading ? (
      <Loading />
    ) : results.length > 0 ? (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.resultsText}>Results ({results.length})</Text>
        <View style={styles.resultsWrapper}>
            {results.map((item, index) => {
            return (
                <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                    <View style={styles.movieItem}>
                        <Image
                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                        // source={require('../assets/images/moviePoster2.png')}
                        style={styles.movieImage}/>
                        <Text style={styles.movieTitle}>
                        {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        })}
        </View>
    </ScrollView>
    ) : (
      <View style={styles.noResultsContainer}>
        <Image source={require('../../../assets/images/movieTime.png')} style={styles.noResultsImage} />
      </View>
    )}
  </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
    },
    searchInputContainer: {
      margin: 4,
      marginBottom: 3,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#262626',
      borderRadius: 999,
    },
    searchInput: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 6,
      flex: 1,
      fontSize: 24,
      fontWeight: '600',
      color: 'white',
      letterSpacing: 1,
    },
    searchButton: {
      borderRadius: 999,
      padding: 3,
      margin: 1,
      backgroundColor: '#262626',
    },
    resultsContainer: {
      paddingHorizontal: 15,
    },
    resultsText: {
      color: 'white',
      fontWeight: '600',
      marginLeft: 1,
    },
    resultsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    movieItem: {
      marginVertical: 4,
      flexDirection: 'column',
      alignItems: 'center',
    },
    movieImage: {
      borderRadius: 12,
      width: width * 0.44,
      height: height * 0.3,
    },
    movieTitle: {
      color: 'white',
      marginLeft: 1,
    },
    noResultsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    noResultsImage: {
      height: 300,
      width: 300,
    },
  });