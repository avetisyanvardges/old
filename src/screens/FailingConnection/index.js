import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  BackHandler,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import NetInfo from '@react-native-community/netinfo';
import {LineGradientButton} from '../../components';
import {Sizes} from '../../assets/styles';
import {FailConnectionIcon} from '../../components/Icons/FailConnectionIcon';
import i18n from '../../assets/i18next';

class FailingConnection extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props.navigation.push('Menu');
      } else {
        Alert.alert('Error', 'No internet connection');
      }
    });
  };
  render() {
    const {theme} = this.props;
    const {container, title, subTitle, tryAgainButton, tryAgainText} = styles(
      theme,
    );
    return (
      <ImageBackground
        resizeMode="cover"
        style={{flex: 1}}
        source={require('../../assets/images/failScBg.png')}>
        <ImageBackground
          resizeMode="cover"
          style={container}
          source={require('../../assets/images/failScBottom.png')}>
          <FailConnectionIcon
            IconWidth={Sizes.size95}
            IconHeight={Sizes.size85}
            IconBgColor={'#A347FF'}
            IconColor={'#FEFEFE'}
          />
          <Text style={title}>{i18n.t('texts.oops')}</Text>
          <Text style={subTitle}>{i18n.t('texts.slow')}</Text>
          <Text style={subTitle}>{i18n.t('texts.check')}</Text>
          <View style={{zIndex: 999}}>
            <LineGradientButton
              onPress={this.checkInternetConnection}
              title={'Try again'}
              paddingHorizontal={0.01}
              paddingVertical={0.01}
              marginTop={0.01}
              customStyle={{
                width: Sizes.size148,
                marginTop: Sizes.size50,
                paddingVertical: Sizes.size5,
              }}
            />
          </View>
          <Image
            source={require('../../assets/images/bgFail.png')}
            resizeMode={'cover'}
            style={{
              width: Sizes.size280,
              height: Sizes.size280,
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
        </ImageBackground>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(FailingConnection);
