import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import RepoCard from '../components/RepoCard';
import { SingleLineInput } from '../components/SingleLineInput';
import { useHome } from '../hooks/useHome';
import { RootState } from '../store/reducer';
import LoadingScreen from './LoadingScreen';

const HomeScreen = () => {
  const { searchRepoData, searchRepoLoading, searchTotalCount } = useSelector(
    (state: RootState) => state.repo,
  );

  const {
    flatListRef,
    query,
    setQuery,
    searchRepository,
    handleLoadMore,
    onPressListItem,
    TopButtonHandler,
    buttonStyle,
  } = useHome();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="Home" />
      </Header>

      <View style={styles.searchInput}>
        <View style={styles.textInputContainer}>
          {/* 검색창 */}
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            placeholder="검색어를 입력해 주세요"
            onSubmitEditing={searchRepository}
          />

          {/* Close Button */}
          {query.length > 0 ? (
            <Pressable
              onPress={() => {
                setQuery('');
              }}
              style={styles.closeButtonContainer}>
              <View style={styles.closeButtonIcon}>
                <Icon name="close" size={12} color="white" />
              </View>
            </Pressable>
          ) : null}
        </View>

        {/* Search Button */}
        <Pressable onPress={searchRepository}>
          <View style={buttonStyle}>
            <Icon name="search" size={20} color="white" />
          </View>
        </Pressable>
      </View>

      {/* 검색 결과 화면 */}
      {searchRepoLoading && searchRepoData.length < 30 ? (
        <LoadingScreen />
      ) : (
        <>
          <Text style={styles.totalCountText}>
            검색개수 : {searchTotalCount?.toLocaleString('ko-KR')}
          </Text>
          <View style={styles.separator} />

          {searchTotalCount <= 0 ? (
            <View style={styles.noCountContainer}>
              <Text style={styles.noCountText}>검색 결과가 없습니다.</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(_, index) => `searchRepoData-${index}`}
              style={styles.searchList}
              ref={flatListRef}
              data={searchRepoData}
              renderItem={({ item }) => {
                return (
                  <Button onPress={() => onPressListItem(item)}>
                    <RepoCard fullname={item?.full_name} description={item?.description} />
                  </Button>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
            />
          )}
        </>
      )}

      {/* 최상단으로 보내는 floating 버튼 */}
      {searchRepoData && searchRepoData.length > 0 && (
        <Pressable onPress={TopButtonHandler} style={styles.upIconContainer}>
          <View style={styles.upIconButton}>
            <Icon name="arrow-up" color="white" size={22} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  textInputContainer: {
    flex: 1,
    marginRight: 10,
    overflow: 'hidden',
    maxHeight: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  totalCountText: {
    color: 'brown',
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCountText: {
    color: 'gray',
  },
  searchList: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
  },
  closeButtonIcon: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginHorizontal: 10,
  },
  upIconContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  upIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
