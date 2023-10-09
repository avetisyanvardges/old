import React from 'react';
import {Svg, Path, Polygon} from 'react-native-svg';
import {Sizes} from '../../assets/styles';

const Today = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      style={{margin: Sizes.size3}}
      height={IconHeight}
      viewBox="0 0 426.667 426.667"
      width={IconWidth}>
      <Path
        fill={IconColor}
        d="M362.667,42.667h-21.333V0h-42.667v42.667H128V0H85.333v42.667H64c-23.573,0-42.453,19.093-42.453,42.667L21.333,384
				c0,23.573,19.093,42.667,42.667,42.667h298.667c23.573,0,42.667-19.093,42.667-42.667V85.333
				C405.333,61.76,386.24,42.667,362.667,42.667z M362.667,384H64V149.333h298.667V384z"
      />
      <Polygon
        fill={IconColor}
        points="309.973,214.613 287.36,192 183.253,296.107 138.027,250.88 115.413,273.493 183.253,341.333"
      />
    </Svg>
  );
};
export {Today};
