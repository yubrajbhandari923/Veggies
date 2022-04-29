import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextInput from './TextInput';

export default function Search({query, setQuery}) {
  return (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <TextInput
        label="Search"
        returnKeyType="search"
        value={query}
        onChangeText={text => setQuery(text)}
        autoCapitalize="none"
        keyboardType="default"
      />
    </View>
  );
}
