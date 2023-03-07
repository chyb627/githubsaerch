export type SearchRepoData = {
  name: string;
  full_name: string;
  description: string;
};
export type GetIssueData = {
  number: number;
  title: string;
  user: {
    login: string;
  };
  created_at: string;
  comments: number;
  html_url: string;
};

export type RootStackParamList = {
  BottomTab: undefined;
  Detail: {
    item: SearchRepoData;
  };
};

export type BottomTabsParamList = {
  Home: undefined;
  Favorite: undefined;
};

export type SearchRepoType = SearchRepoData[];
export type GetIssueDataType = GetIssueData[];
