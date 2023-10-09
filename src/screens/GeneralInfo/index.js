import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import i18n from '../../assets/i18next';
import {Colors, Sizes} from '../../assets/styles';
import {
  Done,
  Home,
  Phone1,
  Phone2,
  Phone3,
  Phone4,
  Phone5,
} from '../../components/Icons';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';

const data = [
  {
    title: 'verificationDone.welcomeTitle',
    text: 'verificationDone.welcomeSubtitle',
    image: require('../../assets/images/phone.png'),
    icon: <Phone1 IconHeight={'96%'} IconWidth={'58%'} />,
    bg: '#71EEFB',
    textColor: Colors.charGreen,
  },
  {
    title: 'verificationDone.pageTwoTitle',
    text: 'verificationDone.pageTwoSubtitle',
    image: require('../../assets/images/phone2.png'),
    icon: <Phone2 IconHeight={'96%'} IconWidth={'58%'} />,
    bg: '#A679FF',
    textColor: Colors.white,
  },
  {
    title: 'verificationDone.pageThirdTitle',
    text: 'verificationDone.pageThirdSubtitle',
    image: require('../../assets/images/phone3.png'),
    icon: <Phone3 IconHeight={'96%'} IconWidth={'58%'} />,
    bg: '#FA378A',
    textColor: Colors.white,
  },
  {
    title: 'verificationDone.pageFourthTitle',
    text: 'verificationDone.pageFourthSubtitle',
    image: require('../../assets/images/phone4.png'),
    icon: <Phone4 IconHeight={'96%'} IconWidth={'58%'} />,
    bg: '#71EEFB',
    textColor: Colors.charGreen,
  },
  {
    title: 'verificationDone.pageFiveTitle',
    text: 'verificationDone.pageFiveSubtitle',
    image: require('../../assets/images/phone5.png'),
    icon: <Phone5 IconHeight={'96%'} IconWidth={'58%'} />,
    bg: '#A679FF',
    textColor: Colors.white,
  },
  {
    title: 'verificationDone.pageDoneTitle',
    text: 'verificationDone.pageDoneSubtitle',
    image: require('../../assets/images/Mapllo2.png'),
    bg: '#FA378A',
    textColor: Colors.white,
  },
];

let Item = typeof data[0];

class GeneralInfo extends Component {
  render() {
    const {
      slide,
      slideTitle,
      ImageContainer,
      icon,
      text,
      title,
      nextButton,
      nextText,
      skipButton,
      skipText,
    } = styles();
    const {navigation} = this.props;
    const _renderItem = ({item} = {item: Item}) => {
      console.log(item);
      return (
        <View style={[slide, {backgroundColor: item.bg}]}>
          <View style={slideTitle}>
            <Text style={title}>{i18n.t(item.title)}</Text>
            <Text style={[text, {color: item.textColor}]}>
              {i18n.t(item.text)}
            </Text>
          </View>
          {item.title !== 'verificationDone.pageDoneTitle' ? (
            <View style={ImageContainer}>{item.icon}</View>
          ) : (
            <Animatable.View
              useNativeDriver={true}
              animation="fadeInUp"
              easing="ease-in-out"
              style={icon}>
              <View style={[ImageContainer, {flex: 1}]}>
                <View style={{position: 'absolute'}}>
                  <Home
                    IconWidth={Sizes.size110}
                    IconHeight={Sizes.size110}
                    IconColor={Colors.white}
                  />
                </View>
                <Done IconHeight={'96%'} IconWidth={'58%'} />
              </View>
            </Animatable.View>
          )}
        </View>
      );
    };

    const _keyExtractor = (item = Item) => item.title;

    const _renderNextButton = () => {
      return (
        <Animatable.View
          useNativeDriver={true}
          animation="fadeInDown"
          easing="ease-in-out"
          duration={300}
          style={nextButton}>
          <Text style={nextText}>{i18n.t('texts.next')}</Text>
        </Animatable.View>
      );
    };

    const _renderDoneButton = () => {
      return (
        <>
          <Animatable.View
            useNativeDriver={true}
            animation="fadeInUp"
            easing="ease-in-out"
            duration={300}
            style={nextButton}>
            <Text style={nextText}>{i18n.t('buttons.done')}</Text>
          </Animatable.View>

          <View style={skipButton} />
        </>
      );
    };

    const _renderSkipButton = () => {
      return (
        <Animatable.View
          useNativeDriver={true}
          animation="fadeInUp"
          easing="ease-in-out"
          duration={300}
          style={skipButton}>
          <Text style={skipText}>{i18n.t('texts.skip')}</Text>
        </Animatable.View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          bottomButton={true}
          renderNextButton={_renderNextButton}
          renderSkipButton={_renderSkipButton}
          renderDoneButton={_renderDoneButton}
          showSkipButton={true}
          data={data}
          onDone={() => {
            this.props.navigation.navigate(
              navigation.getParam('query', 'default value'),
            );
          }}
        />
      </View>
    );
  }
}
export default GeneralInfo;
