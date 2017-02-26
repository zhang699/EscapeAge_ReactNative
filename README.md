# EscapeAge_ReactNative
這是一個模仿android版的[密室錄](https://play.google.com/store/apps/details?id=com.easuno.escape&hl=zh_TW)的app，收集密室逃脫遊戲與工作室, 主要使用ReactNative + Redux + Firebase。

# Demo

![](http://i.giphy.com/l44QBlXFwfINl2dWw.gif)

# How to use

- Use react-native@0.38.0, react-native-cli 2.0.1
- Install dependencies ```npm install```
- Linking native project's reference to node-modules/react-native ```react-native link```
- Open XCode and Run
- Doesn't support Android currently

# Opensource Used

- [react-native-maps](https://github.com/airbnb/react-native-maps)
- [react-native-menu](https://github.com/jaysoo/react-native-menu)
- [react-native-modal-picker](https://github.com/d-a-n/react-native-modal-picker)
- [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
- [react-native-share](https://github.com/EstebanFuentealba/react-native-share)
- [react-native-sortable-listview](https://github.com/deanmcpherson/react-native-sortable-listview)
- [react-native-star-rating](https://github.com/djchie/react-native-star-rating)
- [react-redux](https://github.com/reactjs/react-redux)
- [redux](https://github.com/reactjs/redux)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [react-native-calendar](https://github.com/christopherdro/react-native-calendar)
- [react-native-extended-stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)
- [react-native-facebook-login](https://github.com/magus/react-native-facebook-login)
- [react-native-google-signin](https://github.com/devfd/react-native-google-signin)
- [lodash](https://lodash.com/)
- [@remobile/react-native-toast](https://github.com/remobile/react-native-toast)


# Todo
- 有密室逃脫新遊戲的通知 (NewsList) 包括未讀訊息的實作
- 支援 Android 
- Splashscreen
- 支援英文語系
- 用ImmutableJS改寫Redux state的部分
- 用redux-sauce 簡化action與reducer的部分
- 加入ESLint，並修正warning
- 完善License Dialog
- 以circular Percentage View 顯示密室逃脫率的百分比
- 揪團去並連結行事曆的實作
- 更完善的error handling
- 支援firebase 的註冊與登入

# Thanks
- [Jie-Chuen Li (author of escapeage android application)](https://www.linkedin.com/pub/jason-li/94/949/a43)

# License
- Code is MIT License.
- Part of pictures and icon are belong to original author.
