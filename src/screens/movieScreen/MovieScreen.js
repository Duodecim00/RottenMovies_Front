import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Button,ScrollView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';
import Loading from '../components/loading';
import { Video} from 'expo-av';
import CommentBox from '../components/CommentBox';
import Rating from '../components/Rating';

const topMargin = ' mt-3';
const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);  
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async (id) => {
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    console.log('got movie credits');
    if(data && data.cast){
        setCast(data.cast);
    }
  };
  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if(data && data.results){
        setSimilarMovies(data.results);
    }
  };
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
    const handleToggleLooping = () => {
    video.current.setIsLoopingAsync(!status.isLooping);
  };
  const handlePlayFromPosition = () => {
    video.current.playFromPositionAsync(5000);
  };


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>

      {/* back button and movie poster */}
      <View style={styles.wFull}>
      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>


        {loading ? (
          <Loading />
        ) : (
          <View style={styles.containerImage}>
            <Image source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
                        style={{width, height: height*0.55,
                        borderRadius:20}} />
                <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={styles.containerDetails}>
        {/* title */}
        <Text style={styles.headerText}>
          {movie?.title}
        </Text>

        {/* status, release year, runtime */}
        {movie?.id && (
          <Text style={styles.infoText}>
            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
          </Text>
        )}

        {/* genres  */}
        <View style={styles.genderContainer}className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            const showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={styles.normalText}>
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text style={styles.normalText}>
          {movie?.overview}
        </Text>
      </View>

{/*Reproductor de video*/}
<View style={styles.videoContainer}>
              <Text style={styles.normalText}>Trailer</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
    </View>

      {/* cast */}
      {
        movie?.id && cast.length>0 && <Cast navigation={navigation} cast={cast} />
      }

      {/* similar movies section */}
      {
        movie?.id && similarMovies.length>0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
      }
      <View style={styles.starContainer}>
        <CommentBox />
      </View>
      <View style={styles.starContainer}>
        <Text style={styles.normalText}>Rate Movie</Text>
        <Rating/>
      </View>
    </ScrollView>
  );
}



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
    },
    videoContainer: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
      backgroundColor: '#262626',
    },
    starContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#262626',
      marginBottom:25,
      marginTop:25,
    },
    backButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 4,
      marginBottom:8
    },
    backButton: {
      borderRadius: 999,
      padding: 1,
      backgroundColor: '#262626',
    },
    containerImage:{
      height: height * 0.5,
    },
    containerDetails:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',  
      marginTop:60,
      marginBottom:60,
    },

    genderContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop:10,
      paddingBottom:10,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    headerText: {
      color: 'white',
      fontSize: 60,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    infoText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
    },
    normalText: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft:20,
      paddingRight:20,
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 24,
    },
    safeArea:{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 4,
      paddingRight: 4,
    },
    TouchableO:{
      borderRadius: 100,
      padding: 0.25,
    },
    video:{
      width: width,
      height: height * 0.6
    },
    buttons: {
      marginTop: 20,
    },
  });