import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ChooseLocation = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.44774C7.27672 3.44774 3.44774 7.27672 3.44774 12C3.44774 16.7233 7.27672 20.5523 12 20.5523C16.7233 20.5523 20.5523 16.7233 20.5523 12C20.5523 7.27672 16.7233 3.44774 12 3.44774ZM15.0084 8.08461C15.566 7.91011 16.0899 8.43404 15.9154 8.99163L14.3782 13.9036C14.3073 14.13 14.13 14.3073 13.9036 14.3782L8.99163 15.9154C8.43404 16.0899 7.91011 15.566 8.08461 15.0084L9.6218 10.0964C9.69266 9.87 9.87 9.69266 10.0964 9.6218L15.0084 8.08461ZM12 12L10.89 10.89L9.87856 14.1204L13.109 13.109L12 12Z"
        fill={IconColor ? IconColor : '#818195'}
      />
    </Svg>
  );
};

export {ChooseLocation};
