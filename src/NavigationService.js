import {NavigationActions} from 'react-navigation';
let _navigator;
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

function navigationRef() {
  return _navigator;
}

export default {
  navigate,
  back,
  setTopLevelNavigator,
  navigationRef,
};
