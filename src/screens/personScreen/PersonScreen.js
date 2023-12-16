import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../../api/moviedb';
import Loading from '../components/loading';
// import { styles } from '../../theme';


var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
    const {params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item]);

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if(data) {
            setPerson(data);
        }
    };
    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        console.log('got person movies');
        if(data && data.cast){
            setPersonMovies(data.cast);
        }

    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* back button */}
      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.personImageContainer}>
            <View style={styles.personImageWrapper}>
              <Image
                // source={require('../assets/images/castImage2.png')}
                source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                style={styles.personImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.personDetails}>
            <Text style={styles.personName}>{person?.name}</Text>
            <Text style={styles.personPlaceOfBirth}>{person?.place_of_birth}</Text>
          </View>

          <View style={styles.personInfo}>
            <View style={styles.personInfoItem}>
              <Text style={styles.personInfoLabel}>Gender</Text>
              <Text style={styles.personInfoValue}>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
            </View>
            <View style={styles.personInfoItem}>
              <Text style={styles.personInfoLabel}>Birthday</Text>
              <Text style={styles.personInfoValue}>{person?.birthday}</Text>
            </View>
            <View style={styles.personInfoItem}>
              <Text style={styles.personInfoLabel}>Known for</Text>
              <Text style={styles.personInfoValue}>{person?.known_for_department}</Text>
            </View>
            <View style={styles.personInfoItem}>
              <Text style={styles.personInfoLabel}>Popularity</Text>
              <Text style={styles.personInfoValue}>{person?.popularity?.toFixed(2)} %</Text>
            </View>
          </View>

          <View style={styles.biographyContainer}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>{person?.biography ? person.biography : 'N/A'}</Text>
          </View>

          {/* person movies */}
          {person?.id && personMovies.length > 0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} />}
        </View>
      )}
    </ScrollView>
    
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
    },
    backButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 4,
    },
    backButton: {
      borderRadius: 999,
      padding: 1,
      backgroundColor: '#262626',
    },
    personImageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      shadowColor: 'gray',
      shadowRadius: 40,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
    },
    biographyContainer: {
      justifyContent: 'center',
      paddingLeft:20,
      paddingRight:20,
      shadowRadius: 40,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
    },
    personImageWrapper: {
      alignItems: 'center',
      borderRadius: 999,
      overflow: 'hidden',
      height: 250,
      width: 250,
      borderColor: '#262626',
      borderWidth: 2,
    },
    personImage: {
      height: 250,
      width: 400,
    },
    personDetails: {
      marginTop: 6,
      alignItems: 'center',
      color: 'white',
    },
    personPlaceOfBirth: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
    },
    personInfo: {
      marginHorizontal: 3,
      padding: 4,
      marginTop: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#262626',
      color:'white',
      borderRadius: 999,
    },
    personInfoValue: {
        fontSize:24,
        color:'white',
        borderRadius: 999,
    },
    personInfoItem: {
      borderRightWidth: 2,
      borderRightColor: '#262626',
      color:'white',
      paddingHorizontal: 2,
      alignItems: 'center',
    },
      personName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
      personInfoLabel: {
        fontSize:20,
        color:'white'
    },
    biographyText: {
        fontSize:20,
        color:'white'
    },
    biographyTitle: {
        fontSize:35,
        color:'white',
        marginBottom:20,
        marginTop:70,
    },
});