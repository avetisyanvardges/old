import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Live = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth}
      height={IconHeight}
      viewBox="0 0 28 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M0.16 14H6.22V11.78H2.78V0.52H0.16V14ZM7.75766 0.52V14H10.3777V0.52H7.75766ZM17.5386 14L20.6186 0.52H17.7386L16.8186 6.28C16.5786 7.8 16.3586 9.42 16.1786 11.02H16.1386C15.9586 9.44 15.6786 7.8 15.4586 6.34L14.4986 0.52H11.5986L14.5986 14H17.5386ZM27.4416 5.9H24.3816V2.8H27.6216V0.52H21.7616V14H27.8416V11.72H24.3816V8.08H27.4416V5.9Z"
        fill={IconColor}
      />
    </Svg>
  );
};
export {Live};
