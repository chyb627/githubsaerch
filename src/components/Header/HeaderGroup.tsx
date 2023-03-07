import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

export const HeaderGroup: React.FC<{
  children: ReactElement[] | ReactElement;
}> = (props) => <View style={styles.container}>{props.children}</View>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
