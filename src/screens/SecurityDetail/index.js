import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './style';
import Security from '../../components/Security';

class SecurityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.navigation.getParam('query', 'value'),
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
    }
  }
  render() {
    const {navigation, count, theme} = this.props;
    const {container} = styles(theme);
    const {query} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={query.info}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <Security info={query.info} />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    count: store.profileData.count,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
  };
};
export default connect(mapStateToProps, {makeAction})(SecurityDetail);
