/* eslint-disable react-hooks/exhaustive-deps */
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIssueData } from '../actions/repo';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import IssueCard from '../components/IssueCard';
import { useDetail } from '../hooks/useDetail';
import { AppDispatch } from '../store';
import { RootState } from '../store/reducer';
import { RootStackParamList } from '../types/types';
import LoadingScreen from './LoadingScreen';

const DetailScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { getIssueDataData, getIssueDataLoading, getIssueDataDone } = useSelector(
    (state: RootState) => state.repo,
  );
  const { page, isClipped, onPressBack, onPressFavorite, handleLoadMore } = useDetail();

  useEffect(() => {
    dispatch(getIssueData({ repo: routes.params.item.full_name, page }));
  }, []);

  if (getIssueDataLoading && !getIssueDataDone && getIssueDataData?.length < 1) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />

          <Header.Title title={`${routes.params.item.name}-Issue-List`} />

          <Header.Icon iconName={isClipped ? 'heart' : 'heart-outline'} onPress={onPressFavorite} />
        </Header.Group>
      </Header>

      {getIssueDataData && getIssueDataData.length > 0 ? (
        <FlatList
          keyExtractor={(_, index) => `issue-list-screen-${index}`}
          data={getIssueDataData}
          renderItem={({ item }) => {
            return (
              <Button
                onPress={() => {
                  Linking.openURL(item.html_url).catch((err) => {
                    console.debug(err);
                  });
                }}>
                <IssueCard
                  issueNum={item.number}
                  issueTitle={item.title}
                  issueWriter={item.user.login}
                  issueDate={item.created_at}
                  issuecomments={item.comments}
                />
              </Button>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
        />
      ) : (
        <View style={styles.noCountContainer}>
          <Text style={styles.noCountText}>등록된 Issue가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginHorizontal: 10,
  },
  noCountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCountText: {
    color: 'gray',
  },
});
