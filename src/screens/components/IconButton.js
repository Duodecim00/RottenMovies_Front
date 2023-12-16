import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ iconName, onPress, color}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name={iconName} size={32} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;