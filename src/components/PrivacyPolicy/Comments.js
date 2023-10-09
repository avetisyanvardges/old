import React, {Component} from 'react';
import {Colors} from '../../assets/styles';
import AsyncStorage from '@react-native-community/async-storage';
import {MenuSwitch} from '../MenuSwitch';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlerSwichValue = (value) => {
    return value === 'on';
  };

  render() {
    const {info, asyncInfo} = this.props;

    const SaveState = (evn) => {
      let value = evn ? 'on' : 'off';
      asyncInfo[info] = value;
      this.setState({value});
      AsyncStorage.setItem('@privacy', JSON.stringify(asyncInfo));
    };

    return (
      <MenuSwitch
        title="privacy.comments.allow_all"
        falseColor={Colors.silver}
        trueColor={Colors.blueViolet}
        thumbColor={Colors.white}
        value={this.handlerSwichValue(asyncInfo[info])}
        onValueChange={(res) => {
          SaveState(res);
        }}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    blockedUsers: store.profileData.blockedUsers,
  };
};

export default connect(mapStateToProps, {makeAction})(Comments);
