import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo } from '../actions/repo';
import { resetgetIssueData, resetSearchRepoData } from '../slice/repo';
import { AppDispatch } from '../store';
import { RootState } from '../store/reducer';
import { RootStackParamList, SearchRepoData } from '../types/types';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export const useHome = () => {
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { searchRepoData } = useSelector((state: RootState) => state.repo);

  // 검색 클릭시 호출
  const searchRepository = useCallback(() => {
    if (query === '') {
      return;
    }
    setPage(1);
    dispatch(resetSearchRepoData());
    dispatch(searchRepo({ query, page: 1 }));
    Keyboard.dismiss();
  }, [dispatch, query]);

  // FlatList 스크롤시 호출
  const handleLoadMore = useCallback(() => {
    if (searchRepoData.length >= 30) {
      setPage(page + 1);
      dispatch(searchRepo({ query, page }));
    }
  }, [dispatch, page, query, searchRepoData.length]);

  // FlatList 각 Item 클릭시 이동
  const onPressListItem = useCallback(
    (item: SearchRepoData) => {
      dispatch(resetgetIssueData());
      navigation.navigate('Detail', { item });
    },
    [navigation, dispatch],
  );

  // 최상단 으로 보내는 버튼
  const TopButtonHandler = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // 버튼 비활성화
  const buttonEnabled = useMemo(() => {
    return query !== '';
  }, [query]);

  // 버튼 스타일
  const buttonStyle = useMemo(() => {
    if (buttonEnabled) {
      return styles.button;
    }
    return [styles.button, styles.disabledButton];
  }, [buttonEnabled]);

  return {
    flatListRef,
    query,
    setQuery,
    searchRepository,
    handleLoadMore,
    onPressListItem,
    TopButtonHandler,
    buttonStyle,
  };
};
