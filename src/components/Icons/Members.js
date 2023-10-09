import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Members = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg height={IconHeight} viewBox="0 0 512 512" width={IconWidth}>
      <Path
        fill={IconColor}
        d="M48,176c.536,0,1.07-.017,1.6-.043A80.18,80.18,0,0,0,120,239.6V264a8,8,0,0,0,8,8H248v16.343c-23.034,1.91-47.546,11.849-67,27.41C157.487,334.565,144,359.44,144,384v24a31.971,31.971,0,0,0,35.612,31.792,80.011,80.011,0,0,0,152.776,0A32.576,32.576,0,0,0,336,440a32.036,32.036,0,0,0,32-32V384c0-24.56-13.487-49.435-37-68.247-19.45-15.561-43.963-25.5-67-27.41V272H384a8,8,0,0,0,8-8V239.6a80.2,80.2,0,0,0,68.388-55.807A32.576,32.576,0,0,0,464,184a31.977,31.977,0,0,0,23.913-53.232,155.517,155.517,0,0,0-7.094-43.422A39.993,39.993,0,1,0,429.8,25.768C416.308,19.323,400.909,16,384,16c-32.7,0-59.767,12.4-78.279,35.847-15.949,20.2-24.757,47.409-25.634,78.921A31.977,31.977,0,0,0,304,184a32.335,32.335,0,0,0,3.612-.208A80.2,80.2,0,0,0,376,239.6V256H136V239.6a80.18,80.18,0,0,0,70.4-63.642c.532.026,1.066.043,1.6.043a32.036,32.036,0,0,0,32-32V80a31.952,31.952,0,0,0-7.778-20.9c4.462-8,7.778-19.27,7.778-35.1a8,8,0,0,0-8-8H88A72.081,72.081,0,0,0,16,88v56A32.036,32.036,0,0,0,48,176Zm416-8c-.134,0-.266-.016-.4-.02.262-2.625.4-5.287.4-7.98V136a16,16,0,0,1,0,32ZM456,32a23.988,23.988,0,0,1,18.422,39.367,106.614,106.614,0,0,0-12.143-19.52,92.88,92.88,0,0,0-17.5-17.066A23.954,23.954,0,0,1,456,32ZM304,168a16,16,0,0,1,0-32v24c0,2.693.138,5.355.4,7.98C304.266,167.984,304.134,168,304,168Zm0-48a31.955,31.955,0,0,0-7.3.85c2.178-23.581,9.518-43.809,21.58-59.089C333.649,42.291,356.375,32,384,32s50.351,10.291,65.721,29.761c12.062,15.28,19.4,35.508,21.58,59.089A31.955,31.955,0,0,0,464,120h-8c-15.355,0-26.482-3.905-33.07-11.608-6.326-7.4-7.34-17-7.318-22.559A43.048,43.048,0,0,0,416,80a8,8,0,0,0-15.892-1.315,44.42,44.42,0,0,0-.468,5.537C393.57,118.922,312.844,120,312,120Zm16,40V135.759c18.332-.93,62.914-5.442,84.247-27.244a43.476,43.476,0,0,0,6.394,10.124C419.074,128.6,431.62,134.31,448,135.678V160a64,64,0,0,1-128,0ZM176,424a16,16,0,0,1,0-32v24c0,2.693.138,5.355.4,7.98C176.266,423.984,176.134,424,176,424Zm144-8a64,64,0,0,1-128,0V398.01A62.177,62.177,0,0,0,208,400a8.019,8.019,0,0,0,7.642-5.633,98.648,98.648,0,0,1,7.224-16.124c4.556,7.562,13.562,16.934,31.121,21.5a8,8,0,0,0,4.026,0c16.258-4.227,25.827-12.889,31.1-21.531a98.817,98.817,0,0,1,7.237,16.141A8,8,0,0,0,304,400a57.408,57.408,0,0,0,16-2.168Zm16,8c-.134,0-.266-.016-.4-.02.262-2.625.4-5.287.4-7.98V392a16,16,0,0,1,0,32Zm-15-95.753c18.441,14.753,29.519,33.5,30.858,51.978a31.954,31.954,0,0,0-34.282,1.606,36.913,36.913,0,0,1-8.124,1.857,125.23,125.23,0,0,0-16.345-28.565,8.07,8.07,0,0,0-9.013-2.815,7.808,7.808,0,0,0-5.326,7.592c-.047,1.793-1.087,17.27-22.771,23.794-21.683-6.524-22.723-22-22.769-23.694a7.875,7.875,0,0,0-5.326-7.643,8.05,8.05,0,0,0-9.015,2.766,125.3,125.3,0,0,0-16.359,28.6,41.5,41.5,0,0,1-7.565-1.48,31.914,31.914,0,0,0-34.827-2.016C161.478,361.751,172.556,343,191,328.247,209.976,313.064,234.276,304,256,304S302.024,313.064,321,328.247ZM192,116.305A31.793,31.793,0,0,0,176,112H160a32,32,0,0,0,0,64h16a31.791,31.791,0,0,0,14.79-3.637,63.994,63.994,0,0,1-125.58,0A31.791,31.791,0,0,0,80,176H96a32,32,0,0,0,0-64H80a31.94,31.94,0,0,0-7.792.964C78.282,104.52,85.123,92.687,87.3,80h96.137A63.68,63.68,0,0,1,192,112ZM192,144a16.019,16.019,0,0,1-16,16H160a16,16,0,0,1,0-32h16A16.019,16.019,0,0,1,192,144ZM64,144a16.019,16.019,0,0,1,16-16H96a16,16,0,0,1,0,32H80A16.019,16.019,0,0,1,64,144Zm144,16V128a16,16,0,0,1,0,32Zm16-43.695A31.793,31.793,0,0,0,208,112a79.741,79.741,0,0,0-6.688-32.057A37.858,37.858,0,0,0,220.8,72.4c.293-.22.589-.45.886-.686A15.98,15.98,0,0,1,224,80ZM32,88A56.064,56.064,0,0,1,88,32H223.652c-2.775,30.355-21.3,31.926-23.723,32H80a8,8,0,0,0-8,8c0,8.158-3.627,17.948-10.489,28.311a106.293,106.293,0,0,1-9.255,11.973A32.24,32.24,0,0,0,48,112a31.793,31.793,0,0,0-16,4.305Zm16,40v32a16,16,0,0,1,0-32Z"
      />
      <Path
        fill={IconColor}
        d="M98.343,186.343a8,8,0,0,0,0,11.313C99.4,198.715,109.228,208,128,208h0c18.771,0,28.6-9.285,29.657-10.344a8,8,0,0,0-11.314-11.313c-.057.057-6.2,5.657-18.343,5.657s-18.286-5.6-18.343-5.657A8,8,0,0,0,98.343,186.343Z"
      />
      <Path
        fill={IconColor}
        d="M413.657,197.656a8,8,0,0,0-11.314-11.313c-.057.057-6.2,5.657-18.343,5.657s-18.286-5.6-18.343-5.657a8,8,0,0,0-11.314,11.313C355.4,198.715,365.228,208,384,208h0C402.771,208,412.6,198.715,413.657,197.656Z"
      />
      <Path
        fill={IconColor}
        d="M274.343,442.343c-.057.057-6.2,5.657-18.343,5.657s-18.286-5.6-18.343-5.657a8,8,0,0,0-11.314,11.313C227.4,454.715,237.229,464,256,464h0c18.772,0,28.6-9.285,29.657-10.344a8,8,0,0,0-11.314-11.313Z"
      />
    </Svg>
  );
};

export {Members};
