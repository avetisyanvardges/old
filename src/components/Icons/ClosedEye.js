import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ClosedEye = ({IconWidth, IconHeight, IconColor}) => {
  return (
    <Svg
      height={IconHeight}
      width={IconWidth}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M18.4177 0.716186C18.684 0.978229 18.7082 1.38828 18.4903 1.67724L18.4177 1.76002L2.64373 17.2838C2.35084 17.5721 1.87596 17.5721 1.58307 17.2838C1.3168 17.0218 1.2926 16.6117 1.51045 16.3228L1.58307 16.24L3.55512 14.3005C2.13635 13.0261 0.946568 11.3225 0.0608142 9.29184C-0.0204886 9.10544 -0.020262 8.89433 0.0614407 8.70811C1.08697 6.37061 2.51054 4.46402 4.21856 3.14201C5.94745 1.79542 7.94315 1.07543 10 1.07543C11.8552 1.07543 13.656 1.66276 15.2687 2.77046L17.3571 0.716186C17.65 0.427938 18.1248 0.427938 18.4177 0.716186ZM18.0472 5.46021C18.773 6.40914 19.4073 7.49852 19.9384 8.70722C20.0205 8.89401 20.0205 9.10586 19.9386 9.29271C17.8613 14.0289 14.1345 16.9245 10 16.9245C9.05878 16.9245 8.12751 16.7747 7.23057 16.4801C6.83766 16.351 6.62544 15.9329 6.75657 15.5463C6.8877 15.1596 7.31252 14.9507 7.70543 15.0798C8.44973 15.3242 9.22068 15.4483 10 15.4483C13.3046 15.4483 16.381 13.1864 18.2727 9.32978L18.4284 9.00138L18.3755 8.88456C17.9948 8.0784 17.5645 7.33896 17.0898 6.67414L16.8488 6.34799C16.5997 6.02231 16.666 5.55955 16.997 5.31439C17.3279 5.06924 17.7981 5.13452 18.0472 5.46021ZM10 2.55163C8.29025 2.55163 6.61992 3.15424 5.14764 4.30096C3.73781 5.39217 2.52945 6.96072 1.61706 8.90041L1.5704 9.00138L1.61575 9.10027C2.40875 10.7949 3.43058 12.204 4.61652 13.2549L6.75413 11.1507C6.32256 10.5255 6.086 9.78495 6.086 9.00118C6.086 6.86841 7.83371 5.1473 10 5.1473C10.7921 5.1473 11.5526 5.38173 12.1865 5.80445L14.189 3.83373C12.8814 2.99052 11.4564 2.55163 10 2.55163ZM13.1366 8.81583L13.238 8.82693C13.6456 8.89909 13.9167 9.28282 13.8434 9.68403C13.556 11.2567 12.2992 12.496 10.7022 12.7813C10.2946 12.8541 9.90425 12.588 9.83026 12.1869C9.75628 11.7858 10.0267 11.4016 10.4342 11.3288C11.4152 11.1536 12.1904 10.3892 12.367 9.42273C12.4343 9.05496 12.7675 8.80017 13.1366 8.81583ZM10 6.6235C8.66236 6.6235 7.586 7.68349 7.586 9.00118C7.586 9.38506 7.67671 9.74952 7.84681 10.0756L11.0937 6.88048C10.7619 6.71415 10.3876 6.6235 10 6.6235Z"
        fill={IconColor}
      />
    </Svg>
  );
};
export {ClosedEye};
