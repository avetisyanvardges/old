import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Vk = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      width={IconWidth ? IconWidth : 24}
      height={IconHeight ? IconHeight : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19.9157 13.323C19.5277 12.8665 19.6387 12.6634 19.9157 12.2553C19.9207 12.2506 23.1238 8.12702 23.4538 6.72858L23.4558 6.72764C23.6198 6.21802 23.4558 5.84348 22.6628 5.84348H20.0387C19.3707 5.84348 19.0627 6.16491 18.8977 6.52454C18.8977 6.52454 17.5616 9.50404 15.6715 11.4354C15.0615 11.9935 14.7795 12.1724 14.4465 12.1724C14.2825 12.1724 14.0275 11.9935 14.0275 11.4839V6.72764C14.0275 6.11646 13.8405 5.84348 13.2875 5.84348H9.16132C8.7423 5.84348 8.49329 6.12858 8.49329 6.3941C8.49329 6.97361 9.43833 7.10684 9.53633 8.73727V12.2748C9.53633 13.05 9.38533 13.1926 9.05031 13.1926C8.15828 13.1926 5.99321 10.2009 4.71016 6.77702C4.45115 6.11274 4.19815 5.84441 3.52512 5.84441H0.900031C0.151005 5.84441 0 6.16584 0 6.52547C0 7.16087 0.892031 10.3202 4.14814 14.4941C6.31822 17.3432 9.37433 18.887 12.1544 18.887C13.8255 18.887 14.0295 18.5441 14.0295 17.9544C14.0295 15.232 13.8785 14.9748 14.7155 14.9748C15.1035 14.9748 15.7715 15.1537 17.3316 16.528C19.1147 18.1575 19.4077 18.887 20.4057 18.887H23.0298C23.7778 18.887 24.1568 18.5441 23.9388 17.8677C23.4398 16.445 20.0677 13.5186 19.9157 13.323Z"
        fill={IconColor ? IconColor : '#818195'}
      />
    </Svg>
  );
};

export {Vk};