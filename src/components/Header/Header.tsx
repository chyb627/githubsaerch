import React, { ReactElement } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { Spacer } from '../Spacer';
import { HeaderTitle } from './HeaderTitle';
import { HeaderIcon } from './HeaderButton';
import { HeaderGroup } from './HeaderGroup';

type CompoundComposition = {
  Title: React.FC<{
    title: string;
  }>;
  Icon: React.FC<{
    onPress: () => void;
    iconName: string;
  }>;
  Group: React.FC<{
    children: ReactElement[] | ReactElement;
  }>;
};

export const Header: React.FC<{
  children: ReactElement[] | ReactElement;
}> &
  CompoundComposition = (props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={[{ width }, styles.headerWrap]}>
        <Spacer horizontal space={12} />
        <View style={styles.headerInnerWrap}>{props.children}</View>
        <Spacer horizontal space={12} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    height: 48,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerInnerWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;
Header.Group = HeaderGroup;
