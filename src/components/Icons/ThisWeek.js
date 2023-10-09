import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ThisWeek = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.7935 1C16.2075 1 16.5435 1.336 16.5435 1.75L16.544 2.59781C18.0041 2.69792 19.2167 3.19805 20.075 4.0581C21.012 4.9991 21.505 6.3521 21.5 7.9751V17.0981C21.5 20.4301 19.384 22.5001 15.979 22.5001H7.521C4.116 22.5001 2 20.4011 2 17.0221V7.9731C2 4.83029 3.88706 2.81294 6.96469 2.59815L6.9653 1.75C6.9653 1.336 7.3013 1 7.7153 1C8.1293 1 8.4653 1.336 8.4653 1.75L8.465 2.579H15.043L15.0435 1.75C15.0435 1.336 15.3795 1 15.7935 1ZM20 9.904H3.5V17.0221C3.5 19.5881 4.928 21.0001 7.521 21.0001H15.979C18.572 21.0001 20 19.6141 20 17.0981L20 9.904ZM15.043 4.079H8.465L8.4653 5.041C8.4653 5.455 8.1293 5.791 7.7153 5.791C7.3013 5.791 6.9653 5.455 6.9653 5.041L6.96477 4.1017C4.72454 4.28989 3.5 5.64786 3.5 7.9731V8.404H20L20 7.9731C20.004 6.7381 19.672 5.7781 19.013 5.1181C18.4345 4.53791 17.5889 4.1914 16.5444 4.10218L16.5435 5.041C16.5435 5.455 16.2075 5.791 15.7935 5.791C15.3795 5.791 15.0435 5.455 15.0435 5.041L15.043 4.079Z"
        fill={IconColor ? IconColor : '#818195'}
      />
      <Path
        d="M17.17 12L14.85 19H13.47L11.74 13.82L9.98 19H8.59L6.27 12H7.62L9.36 17.32L11.17 12H12.37L14.14 17.35L15.93 12H17.17Z"
        fill={IconColor ? IconColor : '#818195'}
      />
    </Svg>
  );
};
export {ThisWeek};
