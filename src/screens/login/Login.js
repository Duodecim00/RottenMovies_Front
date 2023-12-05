import React , {useState/*, useContext*/} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, ActivityIndicator } from 'react-native';
import { user_login } from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Octicons, Ionicons} from '@expo/vector-icons';
import KeyBoardAvoidingWarapper from '../components/KeyboardAvoidingWrapper';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  SubTitle,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent
} from '../components/styles';
// import { AuthContext } from '../../context/AuthContext';

const {brand, darkLight, primary} = Colors;




const Login = ({navigation}) => {
  // const {test} = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);

  const [message, setMessage] = useState();
  const [messageType, setMessageType]= useState();

  const handleMessage= (message, type= `Fallido`) => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyBoardAvoidingWarapper>
      <StyledContainer>
        <StatusBar style='dark'/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('../../../assets/images/pik8bis.png')}/>
            <PageTitle>Movies</PageTitle>
            <SubTitle>Account Login</SubTitle>

            <Formik
              initialValues={{ username:'', password:''}}
              onSubmit={(values, {setSubmitting}) => {
                handleMessage(null);
                  if(values.username == '' || values.password == ''){
                    handleMessage('Por favor rellena los campos');
                    setSubmitting(false);
                  }else{
                    
                user_login({
                  username: values.username,
                  password:values.password
                }, setSubmitting).then((result) => {
                      console.log(result);
                    if(result.status == 200){ 
                      console.log(result.data.token);
                      AsyncStorage.setItem("AccessToken", result.data.token);
                      navigation.replace("Welcome");
                  
                  
                  /*manejar los tokens
                  */ 
                  
                    } else{
                    handleMessage('Datos incorrectos');
                    //  alert('Credenciales incorrectas');
              }
              setSubmitting(false);
                  })

                  .catch(err => {
                    handleMessage('Ocurrio un error');
                    setSubmitting(false);
                    console.log(err);
                  });
                  }
              }}>
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
              <StyledFormArea>
                <MyTextInput 
                  label="Username"
                  icon="person"
                  placeholder="userExample"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                <MyTextInput 
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry = {hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>)}
                {isSubmitting && (<StyledButton disable={true}>
                  <ActivityIndicator size="large" color={primary}/>
                </StyledButton>)}
                <Line/>
                
                <ExtraView>
                {/* <ExtraText>{test}</ExtraText> */}
                  <ExtraText>No tienes cuenta? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Register")}>
                    <TextLinkContent>Registrarse</TextLinkContent>
                  </TextLink>
                </ExtraView>

              </StyledFormArea>
            )}
            </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyBoardAvoidingWarapper>
  );
};

const  MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,...props})=> {
  return(
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand}/>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props}/>
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
        </RightIcon>
      )}
    </View>
  );
};

  export default  Login;