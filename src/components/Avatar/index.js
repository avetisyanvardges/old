import React, {useEffect, useState} from 'react';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Sizes} from '../../assets/styles';
import NavigationService from '../../NavigationService';

const Avatar = ({
  width,
  height,
  data,
  onPressAvatar,
  verified,
  mapView,
  active,
  userId,
  radius,
  borderWidth,
  margin,
  zoomImage,
  CheckMarkWidth,
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {avatarImage} = styles(theme);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    require('../../assets/images/profilePic.png'),
  );
  const [zoomImageVisible, setVisible] = useState(false);
  const {GRADIENT_COLOR} = theme;
  const isVerify = verified === 'verified';

  useEffect(() => {
    if (data?.picture?.length && data?.picture[0]?.url && loaded) {
      setImageUrl({uri: data?.picture[0]?.url});
    }
  }, [data, loaded]);

  return (
    <>
      {/* {active === 'in_progress' ? (
        <View
          style={{
            position: 'absolute',
            right: mapView ? 5 : -Sizes.size5,
            zIndex: 999,
            top: 2,
          }}>
          <Image
            style={{
              width: Sizes.size10,
              height: Sizes.size10,
            }}
            source={require('../../assets/images/active.png')}
          />
        </View>
      ) : null} */}

      {/* isVerify ? (
        <View
          style={{
            position: 'absolute',
            top: Sizes.size4,
            right: mapView ? 0 : -Sizes.size5,
            zIndex: 999,
          }}>
          <CheckMark
            IconWidth={CheckMarkWidth ? CheckMarkWidth : Sizes.size17}
            IconHeight={CheckMarkWidth ? CheckMarkWidth : Sizes.size17}
          />
        </View>
      ) : */}
      <LinearGradient
        start={{x: 0, y: 0.5}}
        end={{x: 1.1, y: 0.7}}
        colors={isVerify ? GRADIENT_COLOR : ['transparent', 'transparent']}
        style={{
          borderRadius: width / 3 + Sizes.size3,
        }}>
        <TouchableOpacity
          activeOpacity={onPressAvatar ? 0.7 : 1}
          onPress={() => {
            if (onPressAvatar) {
              onPressAvatar();
              NavigationService.navigate('UserProfile', {
                userId: userId,
              });
            }
          }}>
          <Image
            style={[
              {
                width,
                height,
                borderRadius: width / 3,
                borderWidth: borderWidth ? borderWidth : Sizes.size2,
                margin: isVerify ? (margin ? margin : Sizes.size2) : null,
              },
              avatarImage,
            ]}
            defaultImage={require('../../assets/images/profilePic.png')}
            errorImage={require('../../assets/images/profilePic.png')}
            onError={() => {
              setImageUrl(require('../../assets/images/profilePic.png'));
            }}
            source={imageUrl}
            onLoad={() => setLoaded(true)}
          />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export {Avatar};
