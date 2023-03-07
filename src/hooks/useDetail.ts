/* eslint-disable react-hooks/exhaustive-deps */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clipRepoItem, getIssueData } from '../actions/repo';
import { AppDispatch } from '../store';
import { RootState } from '../store/reducer';
import { RootStackParamList } from '../types/types';

export const useDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [page, setPage] = useState(1);
  const { favoriteRepoData } = useSelector((state: RootState) => state.repo);
  // Favorite에 담겨 있는지 확인
  const isClipped =
    favoriteRepoData &&
    favoriteRepoData.length > 0 &&
    favoriteRepoData.filter((item) => item.full_name === routes.params.item.full_name).length > 0;

  // 뒤로가기 버튼
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Favorite 버튼 클릭시 호출
  const onPressFavorite = useCallback(() => {
    if (favoriteRepoData?.length > 3) {
      isClipped
        ? dispatch(clipRepoItem(routes.params.item))
        : Alert.alert('등록 개수는 최대 4개입니다.');
    } else {
      dispatch(clipRepoItem(routes.params.item));
    }
  }, [dispatch, isClipped, routes.params.item]);

  // 무한 스크롤 시 호출
  const handleLoadMore = useCallback(() => {
    setPage(page + 1);
    dispatch(getIssueData({ repo: routes.params.item.full_name, page }));
  }, [dispatch, page, routes.params.item.full_name]);

  return {
    page,
    isClipped,
    onPressBack,
    onPressFavorite,
    handleLoadMore,
  };
};
