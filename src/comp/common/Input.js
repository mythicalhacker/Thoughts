import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ style, label, value, onChangeText, placeholder, secureTextEntry, keyboardType, maxLength }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle,style]}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        keyboardType={keyboardType === null ? 'default' : keyboardType}
        maxLength={maxLength === null ? 'default' : maxLength}
        placeholderTextColor='#DFDFDF'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    color: '#87ceff',
    flex: 1
  },
  containerStyle: {
    height: 42,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Input;
