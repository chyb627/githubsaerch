import { createSlice } from '@reduxjs/toolkit';
import { searchRepo, getIssueData } from '../actions/repo';
import { SearchRepoType, GetIssueDataType } from '../types/types';

export interface RepoState {
  searchRepoLoading: boolean;
  searchRepoDone: boolean;
  searchRepoError: Error | string | null | undefined;
  searchRepoData: SearchRepoType;
  searchTotalCount: number;
  favoriteRepoData: SearchRepoType;
  isInitFocusTabOnce: boolean;
  getIssueDataLoading: boolean;
  getIssueDataDone: boolean;
  getIssueDataError: Error | string | null | undefined;
  getIssueDataData: GetIssueDataType;
}

export const initialState: RepoState = {
  searchRepoLoading: false,
  searchRepoDone: false,
  searchRepoError: null,
  searchRepoData: [],
  searchTotalCount: 0,
  favoriteRepoData: [],
  isInitFocusTabOnce: false,
  getIssueDataLoading: false,
  getIssueDataDone: false,
  getIssueDataError: null,
  getIssueDataData: [],
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    resetSearchRepoData(state) {
      return {
        ...state,
        searchRepoData: [],
        getIssueDataData: [],
      };
    },
    saveRepoData(state, action) {
      const hasFavoriteList =
        state.favoriteRepoData &&
        state.favoriteRepoData.length > 0 &&
        state.favoriteRepoData.filter((item) => item.full_name === action.payload.full_name)
          .length > 0;

      if (hasFavoriteList) {
        state.favoriteRepoData = state.favoriteRepoData.filter(
          (item) => item.full_name !== action.payload.full_name,
        );
      } else {
        state.favoriteRepoData = [...state.favoriteRepoData, action.payload];
      }
    },
    clippedFocus(state) {
      return {
        ...state,
        isInitFocusTabOnce: true,
      };
    },
    clipItemReset(state, action) {
      return {
        ...state,
        favoriteRepoData: action.payload,
      };
    },
    resetgetIssueData(state) {
      return {
        ...state,
        getIssueDataData: [],
      };
    },
  },
  extraReducers: (builder) =>
    builder
      // searchRepo
      .addCase(searchRepo.pending, (state) => {
        state.searchRepoLoading = true;
        state.searchRepoDone = false;
        state.searchRepoError = null;
      })
      .addCase(searchRepo.fulfilled, (state, action) => {
        state.searchRepoLoading = false;
        state.searchRepoDone = true;
        state.searchRepoData = [...state.searchRepoData, ...action.payload.items];
        state.searchTotalCount = action.payload.total_count;
      })
      .addCase(searchRepo.rejected, (state, action) => {
        state.searchRepoLoading = false;
        state.searchRepoError = action.error.message;
      })
      // getIssueData
      .addCase(getIssueData.pending, (state) => {
        state.getIssueDataLoading = true;
        state.getIssueDataDone = false;
        state.getIssueDataError = null;
      })
      .addCase(getIssueData.fulfilled, (state, action) => {
        state.getIssueDataLoading = false;
        state.getIssueDataDone = true;
        state.getIssueDataData = [...state.getIssueDataData, ...action.payload];
      })
      .addCase(getIssueData.rejected, (state, action) => {
        state.getIssueDataLoading = false;
        state.getIssueDataError = action.error.message;
      })
      .addDefaultCase((state) => state),
});

export default repoSlice;

export const { resetSearchRepoData, saveRepoData, clippedFocus, clipItemReset, resetgetIssueData } =
  repoSlice.actions;
