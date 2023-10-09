import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Bullets} from '../Bullets';
import {deviceInfo} from '../../assets/deviceInfo';
import {Cancel} from '../Icons';
import {Sizes} from '../../assets/styles';
import NavigationService from '../../NavigationService';

class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 1,
      routeName: null,
    };
  }
  componentDidMount() {
    let route = NavigationService?.navigationRef()?.state?.nav?.routes;
    if (route) {
      this.setState({routeName: route[route?.length - 1].routeName});
    }
    if (this.props?.handleScrollView) {
      this.props?.handleScrollView(this._scrollView);
    }
  }
  onMomentumScrollEnd = (e) => {
    this.setState({
      activeSlide: Math.round(
        e.nativeEvent.contentOffset.x / deviceInfo.deviceWidth + 1,
      ),
    });
  };
  render() {
    const {
      data,
      imageStyle,
      theme,
      addEvent,
      deletePhotoEmit,
      pressOnImage,
    } = this.props;
    const {image, deleteImageButton} = styles(theme);
    const {activeSlide, routeName} = this.state;
    const {PRIMARY_COLOR_FAINT} = theme?.color;
    return (
      <View
        style={{
          position: 'relative',
        }}>
        <ScrollView
          ref={(view) => (this._scrollView = view)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {data.map((img, index) => {
            return (
              <View key={index}>
                <TouchableHighlight
                  activeOpacity={routeName === 'EventView' ? 1 : 0.7}
                  underlayColor={PRIMARY_COLOR_FAINT}
                  onPress={() => {
                    if (pressOnImage) {
                      pressOnImage();
                    }
                  }}>
                  <Image
                    source={{
                      uri: img?.url ? img?.url : img.uri ? img.uri : img,
                    }}
                    style={imageStyle ? imageStyle : image}
                    resizeMode={'cover'}
                  />
                </TouchableHighlight>
                {addEvent ? (
                  <TouchableOpacity
                    style={deleteImageButton}
                    onPress={() => {
                      deletePhotoEmit(index);
                    }}>
                    <Cancel
                      iconWidth={Sizes.size15}
                      iconHeight={Sizes.size15}
                      iconColor={'white'}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
        {data.length > 1 ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 9999,
              bottom: Sizes.size10,
              alignSelf: 'center',
              paddingHorizontal: Sizes.size10,
              paddingVertical: Sizes.size6,
              borderRadius: Sizes.size12,
            }}>
            <Bullets active={activeSlide} length={data?.length} />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(CustomSlider);
