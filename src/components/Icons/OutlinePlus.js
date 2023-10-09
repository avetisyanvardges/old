import React from 'react';
import {Svg, Path} from 'react-native-svg';

const OutlinePlus = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.0919 9.25305C19.6442 9.25305 20.0919 9.70076 20.0919 10.253C20.0919 10.8053 19.6442 11.253 19.0919 11.253L11.2531 11.253V19.0919C11.2531 19.6442 10.8053 20.0919 10.2531 20.0919C9.70077 20.0919 9.25305 19.6442 9.25305 19.0919V11.253L1.41422 11.253C0.861932 11.253 0.414217 10.8053 0.414218 10.253C0.414217 9.70076 0.861932 9.25305 1.41422 9.25305L9.25305 9.25305L9.25305 1.41421C9.25305 0.861929 9.70077 0.414214 10.2531 0.414214C10.8053 0.414214 11.2531 0.861929 11.2531 1.41421L11.2531 9.25305L19.0919 9.25305Z"
        fill={IconColor}
      />
    </Svg>
  );
};

export {OutlinePlus};
