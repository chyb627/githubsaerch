# githubsaerch
github_repo_search_react_native

## start a project

```
npm i (or yarn)

cd ios && pod install && cd ..

npm run ios (or yarn ios)

npm run android (or yarn android)

npm run start (or yarn start)
```

## 사용 라이브러리

- icon : react-native-vector-icons

- navigation : react-navigation

- global state : redux-toolkit

- api : axios

## 폴더 구조

```
/
├── src
│   ├── actions             비동기 함수 (Redux)
│   ├── components          Screen에 사용된 Component
│   ├── hooks               Custom Hooks
│   ├── screens             Screen
│   ├── slice               전역변수
│   ├── store               Redux Store 세팅
│   ├── types               타입
│   └── utils               AsyncStorage 관련 함수
```

### 화면 구조

#### Screen

- 처음화면 : HomeScreen 부분과 FavoriteScreen부분을 BottomTab을 이용해 볼 수 있게 하였습니다.

- HomeScreen : 검색창을 이용하여 Repository를 검색할 수 있습니다. 검색 내용은 같은화면 아래 부분에 나오게 되어있고, 30개가 검색이 되게 되어있고, 바닥에 다와 갈때쯤 다음 페이지의 30개를 호출하여 인피니티 스크롤을 통해 볼 수 있도록 하였습니다.

- FavoriteScreen : 내가 즐겨찾고 싶은 Repository를 등록한 화면을 볼 수 있습니다. 최대 4개 까지 등록 가능합니다. 등록 및 삭제는 DetailScreen 화면 헤더부분의 하트 이모티콘을 하여 등록하고 삭제할 수 있도록 설정하였습니다.

- DeatailScreen : 위 HomeScreen에서 검색을 하여 나온 항목을 클릭하거나 FavoriteScreen에 저장되어 있는 Repository를 누르면 보이는 화면입니다. 이 곳에서는 Repository의 Issue들을 모아볼 수 있도록 하였습니다. HomeScreen과 마찬가지로 인피니티 스크롤을 적용했습니다. 각 항목을 누르면 그 항목에 맞는 GITHUB URL로 이동을 합니다.

- LoadingScreen : 검색을 할 때 API 호출 시 pending 단계에서 로딩 단계에 보여주는 화면입니다.

#### Components

- RepoCard : HomeScreen에서 검색 시 보여주는 항목의 부분을 컴포넌트화 했습니다. FavoriteScreen에서도 사용합니다.
- IssuCard : Detail화면에서 보여주는 Repository의 Issue의 각 항목을 컴포넌트화 했습니다.

- Header, Badge, Button, Icons, SingleLineInput, Spacer, TabIcon, Typohraphy는 상태값을 가지지 않는 원자 단위의 컴포넌트이며, prop을 통해 필요한 항목을 쉽게 받고 적용하기 위해 사용하였습니다.
