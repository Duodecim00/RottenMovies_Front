import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Button,ScrollView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';
import { styles, theme } from '../../theme';
import Loading from '../components/loading';
import { Video, ResizeMode } from 'expo-av';

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
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  const moviePoster = image500(movie.poster_path) || fallbackMoviePoster;
  const stylescustom = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#343434',
    },
    safeAreaView: {
      marginBottom: Platform.OS === 'android' ? -2 : 3,
    },
    containerImage:{
      position: 'relative',
      height: height * 0.4,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 4,
    },
    headerText: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    normalText: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },
    safeArea:{
      position: 'absolute',
      zIndex: 20,
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
    containerVideo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video:{
      width: 300,
      height: 200,
    },
    buttons: {
      marginTop: 20,
    },
  });
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
    const handleToggleLooping = () => {
    video.current.setIsLoopingAsync(!status.isLooping);
  };
  const handlePlayFromPosition = () => {
    video.current.playFromPositionAsync(5000);
  };


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={stylescustom.container}>

      {/* back button and movie poster */}
      <View style={styles.wFull}>
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
          <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View style={stylescustom.containerImage}>
            <Image source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
                        style={{width, height: height*0.55}} />
                <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text style={stylescustom.headerText}>
          {movie?.title}
        </Text>

        {/* status, release year, runtime */}
        {movie?.id && (
          <Text style={stylescustom.normalText}>
            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
          </Text>
        )}

        {/* genres  */}
        <View style={stylescustom.headerContainer}className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            const showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={stylescustom.normalText}>
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text style={stylescustom.normalText}>
          {movie?.overview}
        </Text>
      </View>

{/*Reproductor de video*/}
<View style={styles.container}>
      <Video
        ref={video}
        style={stylescustom.video}
        source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      <View style={stylescustom.buttons}>
        <Button title="Play from 5s" onPress={handlePlayFromPosition} />
        <Button title={status.isLooping ? "Set to not loop" : "Set to loop"} onPress={handleToggleLooping} />
      </View>
    </View>

      {/* cast */}
      {
        movie?.id && cast.length>0 && <Cast navigation={navigation} cast={cast} />
      }

      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
}