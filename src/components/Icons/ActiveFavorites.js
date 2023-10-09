import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ActiveFavorites = ({IconHeight, IconWidth, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.8898 2C18.5998 2 20.7898 3.07 20.8198 5.79V20.97C20.8198 21.14 20.7798 21.31 20.6998 21.46C20.5698 21.7 20.3498 21.88 20.0798 21.96C19.8198 22.04 19.5298 22 19.2898 21.86L12.8098 18.62L6.31982 21.86C6.17082 21.939 5.99982 21.99 5.82982 21.99C5.26982 21.99 4.81982 21.53 4.81982 20.97V5.79C4.81982 3.07 7.01982 2 9.71982 2H15.8898ZM16.5698 8.04H9.03982C8.60982 8.04 8.25982 8.39 8.25982 8.83C8.25982 9.269 8.60982 9.62 9.03982 9.62H16.5698C16.9998 9.62 17.3498 9.269 17.3498 8.83C17.3498 8.39 16.9998 8.04 16.5698 8.04Z"
        fill={IconColor ? IconColor : '#F3267D'}
      />
    </Svg>
  );
};
export {ActiveFavorites};
