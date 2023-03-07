import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { clipItemReset, saveRepoData, clippedFocus, RepoState } from '../slice/repo';
import { SearchRepoData } from '../types/types';
import { getItem, setItem } from '../utils/AsyncStorageUtils';

const axios = Axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json; charset=utf-8',
  },
});

export const searchRepo = createAsyncThunk(
  'search/repositories',
  async (param: { query: string; page: number }) => {
    const result = await axios.get('/search/repositories', {
      params: {
        q: param.query,
        page: param.page,
      },
    });
    return result.data;
  },
);

export const clipRepoItem = createAsyncThunk(
  'search/clipRepoItem',
  async (data: SearchRepoData, thunkAPI) => {
    thunkAPI.dispatch(saveRepoData(data));

    const { repo } = thunkAPI.getState() as { repo: RepoState };
    const lastFavoriteList = repo.favoriteRepoData;

    setItem('FAVORITE_DATA', JSON.stringify(lastFavoriteList));
  },
);

export const clippedTabFocus = createAsyncThunk('search/clippedTabFocus', async (_, thunkAPI) => {
  try {
    const { repo } = thunkAPI.getState() as { repo: RepoState };
    const isInitOnce = repo.isInitFocusTabOnce;

    thunkAPI.dispatch(clippedFocus());

    if (isInitOnce) {
      return;
    }

    const savedItems = JSON.parse(await getItem('FAVORITE_DATA'));

    thunkAPI.dispatch(clipItemReset(savedItems));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getIssueData = createAsyncThunk(
  'search/getIssueData',
  async (param: { repo: string; page: number }, thunkAPI) => {
    try {
      const result = await axios.get(`/repos/${param.repo}/issues`, {
        params: {
          page: param.page,
          sort: 'comments',
        },
      });
      // console.log('result::', result.data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
