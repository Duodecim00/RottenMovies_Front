import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ iconName, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('MessageScreen');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name={iconName} size={32} color="#000" />
    </TouchableOpacity>
  );
};

export default IconButton;