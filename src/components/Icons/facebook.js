import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Facebook = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.3976 4.54451H16.1504V1.49171C15.848 1.45011 14.808 1.35651 13.5968 1.35651C11.0696 1.35651 9.33836 2.94611 9.33836 5.86771V8.55651H6.54956V11.9693H9.33836V20.5565H12.7576V11.9701H15.4336L15.8584 8.55731H12.7568V6.20611C12.7576 5.21971 13.0232 4.54451 14.3976 4.54451Z"
        fill={IconColor ? IconColor : '#818195'}
      />
    </Svg>
  );
};
export {Facebook};
