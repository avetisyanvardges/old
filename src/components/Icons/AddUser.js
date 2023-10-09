import React from 'react';
import {Svg, Path} from 'react-native-svg';

const AddUser = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <>
      <Svg
        width={IconWidth}
        height={IconHeight}
        viewBox="0 0 40 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M15 25.0304C23.1336 25.0304 30 26.3687 30 31.5375C30 36.7063 23.0896 38 15 38C6.86641 38 0 36.6596 0 31.4929C0 26.3241 6.90845 25.0304 15 25.0304ZM33.9979 10C34.9904 10 35.7959 10.8189 35.7959 11.8232V14.1757H38.2021C39.1925 14.1757 40 14.9946 40 15.999C40 17.0033 39.1925 17.8222 38.2021 17.8222H35.7959V20.1768C35.7959 21.1811 34.9904 22 33.9979 22C33.0075 22 32.2 21.1811 32.2 20.1768V17.8222H29.7979C28.8055 17.8222 28 17.0033 28 15.999C28 14.9946 28.8055 14.1757 29.7979 14.1757H32.2V11.8232C32.2 10.8189 33.0075 10 33.9979 10ZM15 0C20.5091 0 24.9253 4.47326 24.9253 10.0537C24.9253 15.6341 20.5091 20.1074 15 20.1074C9.49086 20.1074 5.07474 15.6341 5.07474 10.0537C5.07474 4.47326 9.49086 0 15 0Z"
          fill={IconColor}
        />
      </Svg>
    </>
  );
};

export {AddUser};