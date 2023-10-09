import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import SecurityAlert from './SecurityAlert';
import TwoStep from './TwoStep';
import YourDevice from './YourDevice';

const index = ({info}) => {
  const componentRender = (page) => {
    switch (page) {
      case 'securityAlert':
        return <SecurityAlert />;
      case 'yourDevice':
        return <YourDevice />;
      case 'twoStep':
        return <TwoStep />;
    }
  };
  return <View style={{flex: 1}}>{componentRender(info)}</View>;
};

export default index;
