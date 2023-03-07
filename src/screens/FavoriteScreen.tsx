import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clippedTabFocus } from '../actions/repo';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import RepoCard from '../components/RepoCard';
import { useFavorite } from '../hooks/useFavorite';
import { AppDispatch } from '../store';
import { RootState } from '../store/reducer';

const FavoriteScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteRepoData } = useSelector((state: RootState) => state.repo);
  const { isFocused, onPressListItem } = useFavorite();

  useEffect(() => {
    if (isFocused) {
      dispatch(clippedTabFocus());
    }
  }, [dispatch, isFocused]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title title="Favorite" />
      </Header>

      <View style={styles.contentContainer}>
        {favoriteRepoData && favoriteRepoData.length > 0 ? (
          <FlatList
            keyExtractor={(_, index) => `favoriteRepoData-${index}`}
            data={favoriteRepoData}
            renderItem={({ item }) => {
              return (
                <Button onPress={() => onPressListItem(item)}>
                  <RepoCard fullname={item?.full_name} description={item?.description} />
                </Button>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={styles.noCountContainer}>
            <Text style={styles.noCountText}>등록한 Repository가 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 4,
  },
  separator: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 4,
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
