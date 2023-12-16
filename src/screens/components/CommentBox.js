import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const CommentBox = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleCommentSubmit = () => {
    // Aquí puedes realizar la lógica para enviar el comentario
    console.log('Comentario enviado:', comment);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        placeholderTextColor='white'
        value={comment}
        onChangeText={handleCommentChange}
      />
      <IconButton iconName="send" color={"white"} size={30} onPress={handleCommentSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '40px',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
input: {
    flex: 1,
    height:80,
    color: 'white',
    marginRight: 10,
    textAlign: 'center',
    fontSize:18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 5,
  },
});

export default CommentBox;