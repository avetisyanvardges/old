import {deviceInfo} from './deviceInfo';
export const ratio = deviceInfo.deviceWidth / 375;
export const Sizes = {
  screenTitle: 20 * ratio > 20 ? 20 : 20 * ratio,
  size18_5: 18.5 * ratio > 18.5 ? 18.5 : 18.5 * ratio,
};
for (let i = 1; i < 450; i++) {
  Sizes[`size${i}`] = i * ratio > i ? i : i * ratio;
}
export const BackgroundColors = {
  white: '#ffffff',
  appColor: '#9298AF',
  appColorOpacity: 'rgba(68,146,175,0.5)',
  green: '#007944',
  gray: '#aaaaaa',
  red: '#ed3833',
  lightGray: '#E8E8E8',
  lightPurple: '#D6D8DE',
};

export const Colors = {
  white: '#ffffff',
  lightWhite: '#E3E3E3',
  black: '#444444',
  green: '#007944',
  gray: '#aaaaaa',
  red: '#ed3833',
  yellow: '#ffd31d',
  appColor: '#9298AF',
  silver: '#818195',
  blueViolet: '#A347FF',
  lightRed: '#F3267D',
  charGreen: '#2C2C2C',
  lightSilver: '#F3F3F3',
};

export const Fonts = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  light: 'Montserrat-ExtraLight',
  bold: 'Montserrat-SemiBold',
};

export const IconsStyles = {
  small: Sizes.size14,
  menuIconSize: Sizes.size22,
  medium: Sizes.size22,
  bigSize: Sizes.size28,
  iconSizeNormal: Sizes.size18,
  black: Colors.black,
};

export const PaddingMargin = {
  screenPaddingHorizontal: Sizes.size16,
};

export const IconsSizes = {
  small: Sizes.size16,
  normal: Sizes.size30,
  selectedMarker: Sizes.size40,
};

export const Shadow = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

export const BorderStyles = {
  widths: {
    normal: 1,
    border2: 2,
    border3: 3,
  },
  radius: {
    xs: 5,
    s: 10,
    sm: 15,
    md: 30,
    lg: 60,
    circle: 90,
  },
  colors: {
    black: '#000000',
    gray: '#DCDCDC',
    appColor: '#9298AF',
    strongGray: '#808080',
  },
};

export const fullScreen = {
  width: deviceInfo.deviceWidth,
  height: deviceInfo.deviceHeight,
};
