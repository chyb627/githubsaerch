import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetgetIssueData } from '../slice/repo';
import { AppDispatch } from '../store';
import { RootStackParamList, SearchRepoData } from '../types/types';

export const useFavorite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  // FlatList 각 Item 클릭시 이동
  const onPressListItem = useCallback(
    (item: SearchRepoData) => {
      dispatch(resetgetIssueData());
      navigation.navigate('Detail', { item });
    },
    [dispatch, navigation],
  );

  return {
    isFocused,
    onPressListItem,
  };
};
