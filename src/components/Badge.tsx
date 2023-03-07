import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

export const Badge: React.FC<{
  children: React.ReactElement;
  count?: number;
}> = (props) => (
  <View>
    {props.children}

    <View style={styles.container}>
      {props.count && (
        <Typography fontSize={10} color="white">
          {props.count}
        </Typography>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
});
