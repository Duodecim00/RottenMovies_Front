import React from "react";
//keyboard avoiding view
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard  } from "react-native";

const KeyBoardAvoidingWarapper = ({children}) => {
    return(
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dimiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyBoardAvoidingWarapper;