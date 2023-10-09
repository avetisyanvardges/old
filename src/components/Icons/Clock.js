import React from 'react';
import {Svg, Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

const Clock = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 32}
      height={IconHeight ? IconHeight : 32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9999 29.3336C23.3629 29.3336 29.3333 23.3632 29.3333 16.0003C29.3333 8.63642 23.3633 2.66693 15.9999 2.66693C8.63652 2.66693 2.66658 8.63642 2.66658 16.0003C2.66658 23.3632 8.63697 29.3336 15.9999 29.3336ZM15.9999 4.66693C22.2588 4.66693 27.3333 9.74103 27.3333 16.0003C27.3333 22.2586 22.2583 27.3336 15.9999 27.3336C9.74154 27.3336 4.66658 22.2586 4.66658 16.0003C4.66658 9.74103 9.74106 4.66693 15.9999 4.66693ZM25.4763 17.2347L25.4652 17.0869C25.3927 16.6049 24.9763 16.2358 24.4742 16.2368L16.8545 16.1036L16.8667 10.5504L16.8562 10.4026C16.7858 9.92023 16.371 9.54932 15.8689 9.54824C15.3166 9.54705 14.8679 9.9938 14.8667 10.5461L14.8526 17.1052L14.8632 17.2534C14.934 17.7372 15.3512 18.1084 15.8548 18.1074L24.4785 18.2368L24.6263 18.2257C25.1083 18.1532 25.4774 17.7368 25.4763 17.2347Z"
          fill={IconColor ? IconColor : '#818195'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width={IconWidth ? IconWidth : 32}
            height={IconHeight ? IconHeight : 32}
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export {Clock};
