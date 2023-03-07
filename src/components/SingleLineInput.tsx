import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const SingleLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
  fontSize?: number;
}> = (props) => {
  const [focused, setFocused] = useState(false);
  const borderColor = { borderColor: focused ? 'black' : 'gray' };

  return (
    <View style={[styles.container, borderColor]}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={[{ fontSize: props.fontSize ?? 20 }, styles.textInput]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  textInput: {
    padding: 0,
  },
});
