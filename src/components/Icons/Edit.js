import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Edit = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M21.2683 19.633C21.6724 19.633 22 19.939 22 20.3165C22 20.6625 21.7247 20.9485 21.3676 20.9938L21.2683 21H13.6344C13.2303 21 12.9027 20.694 12.9027 20.3165C12.9027 19.9705 13.178 19.6845 13.5351 19.6392L13.6344 19.633H21.2683ZM13.8436 3.97054C15.2289 2.67649 17.4758 2.67649 18.8612 3.97054L20.2993 5.31395C21.6846 6.608 21.6846 8.7069 20.2993 10.0009L9.48956 20.0985C8.87145 20.6759 8.03341 20.9999 7.15868 20.9999H2.73171C2.32046 20.9999 1.98998 20.6834 2.00023 20.2994L2.11159 16.1267C2.13373 15.3381 2.47919 14.5862 3.0763 14.0284L13.8436 3.97054ZM13.0067 6.68365L4.11109 14.995C3.77918 15.3051 3.58682 15.7237 3.57453 16.1617L3.48161 19.6324L7.15868 19.6329C7.59136 19.6329 8.00745 19.4906 8.33587 19.2336L8.45477 19.1319L17.3944 10.7813L13.0067 6.68365ZM17.8264 4.93715C17.0125 4.17695 15.6922 4.17695 14.8784 4.93715L14.0422 5.71694L18.4289 9.81459L19.2645 9.03433C20.0331 8.31636 20.0758 7.17634 19.3926 6.41148L19.2645 6.28056L17.8264 4.93715Z"
        fill={IconColor ? IconColor : '#818195'}
      />
    </Svg>
  );
};
export {Edit};