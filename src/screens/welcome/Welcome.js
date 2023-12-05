import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  InnerContainer,
  PageTitle,
  StyledFormArea,
  SubTitle,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  WelcomeImage,
  Avatar
} from '../components/styles';





const Welcome = ({navigation}) => {
  return (
    <>
      <StatusBar style='light'/>
      <InnerContainer>
      <WelcomeImage resizeMode="cover" source={require('../../../assets/images/welcomePolar.jpg')}/>
          <WelcomeContainer>
          <PageTitle welcome={true}>Bienvenido!</PageTitle>
          <SubTitle welcome={true}>Usuario</SubTitle>
          <SubTitle welcome={true}>Usuario@gmail.com</SubTitle>
            <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../../../assets/images/pik8bis.png')}/>
              <StyledButton onPress={() => {
                 navigation.navigate("Login");
              }}>
                <ButtonText>Logout</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

  export default  Welcome;