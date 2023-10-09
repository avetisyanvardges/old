import React from 'react';
import {Svg, Path} from 'react-native-svg';

const CheckedIcon = ({IconWidth, IconHeight, IconColor, checkedColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.8933 1.33327C13.1533 1.33327 14.6666 2.91993 14.6666 5.27993V10.7273C14.6666 13.0799 13.1533 14.6666 10.8933 14.6666H5.11325C2.85325 14.6666 1.33325 13.0799 1.33325 10.7273V5.27993C1.33325 2.91993 2.85325 1.33327 5.11325 1.33327H10.8933Z"
        fill={IconColor ? IconColor : '#FFA012'}
      />
      <Path
        d="M10.7865 5.99993C10.5599 5.77326 10.1865 5.77326 9.95988 5.99993L7.20655 8.75326L6.03988 7.5866C5.81321 7.35993 5.43988 7.35993 5.21321 7.5866C4.98655 7.81326 4.98655 8.17993 5.21321 8.41326L6.79988 9.99326C6.91321 10.1066 7.05988 10.1599 7.20655 10.1599C7.35988 10.1599 7.50655 10.1066 7.61988 9.99326L10.7865 6.8266C11.0132 6.59993 11.0132 6.23326 10.7865 5.99993Z"
        fill={checkedColor ? checkedColor : 'white'}
      />
    </Svg>
  );
};
export {CheckedIcon};
