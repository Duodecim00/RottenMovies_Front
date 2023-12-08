import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185, image1852, image342, image500} from '../../api/moviedb';
var {width, height} = Dimensions.get('window');

export default function Cast({cast, navigation}) {
  return (
    <View style={{ marginTop: 6 }}>
    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8, marginBottom: 5 }}>
      Top Cast
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    >
      {cast &&
        cast.map((person, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Person', person)}
            style={{ marginRight: 4, alignItems: 'center' }}
          >
            <View style={{ overflow: 'hidden', borderRadius: 10, height: 80, width: 80, alignItems: 'center', justifyContent: 'center', borderColor: '#888', borderWidth: 1 }}>
              <Image
                source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                style={{ borderRadius: 20, height: 80, width: 80 }}
              />
            </View>
  
            <Text style={{ color: 'white', fontSize: 12, marginTop: 2 }}>
              {person?.character.length > 10 ? person.character.slice(0, 10) + '...' : person?.character}
            </Text>
            <Text style={{ color: '#888', fontSize: 12 }}>
              {person?.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  </View>
  );
}