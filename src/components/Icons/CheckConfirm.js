import React from 'react';
import {Svg, Path} from 'react-native-svg';

const CheckConfirm = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.292908 5C0.683432 4.60948 1.3166 4.60948 1.70712 5L6.08563 9.8787C6.47616 10.2692 6.47616 10.9024 6.08563 11.2929C5.69511 11.6834 5.06195 11.6834 4.67142 11.2929L0.292908 6.41421C-0.0976166 6.02369 -0.0976166 5.39052 0.292908 5Z"
        fill="#A347FF"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5 0.292892C15.1095 -0.0976319 14.4763 -0.0976319 14.0858 0.292892L4.67163 9.87868C4.28111 10.2692 4.28111 10.9024 4.67163 11.2929C5.06215 11.6834 5.69532 11.6834 6.08584 11.2929L15.5 1.70711C15.8906 1.31658 15.8906 0.683417 15.5 0.292892Z"
        fill="#A347FF"
      />
    </Svg>
  );
};
export {CheckConfirm};
