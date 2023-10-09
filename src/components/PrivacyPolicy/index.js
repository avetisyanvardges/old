import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {AllowMentioned} from './AllowMentioned';
import Comments from './Comments';
import {FindContacts} from './FindContacts';
import {InviteEvent} from './inviteEvent';
import {NetworkStatus} from './NetworkStatus';
import {SendMessages} from './sendMessages';
import BlockedAccount from './BlockedAccounts';
import AsyncStorage from '@react-native-community/async-storage';

const Index = ({info}) => {
  const [asyncInfo, setAsyncInfo] = useState(Object);
  useEffect(() => {
    getAsyncState();
  }, []);

  const getAsyncState = async () => {
    const data = await AsyncStorage.getItem('@privacy');
    let jsonParse = JSON.parse(data);
    setAsyncInfo(jsonParse);
  };

  const componentRender = (page) => {
    switch (page) {
      case 'comments':
        return <Comments asyncInfo={asyncInfo} info={info} />;
      case 'inviteYouEvents':
        return <InviteEvent asyncInfo={asyncInfo} info={info} />;
      case 'sendYouMessages':
        return <SendMessages asyncInfo={asyncInfo} info={info} />;
      case 'mentioned':
        return <AllowMentioned asyncInfo={asyncInfo} info={info} />;
      case 'networkStatus':
        return <NetworkStatus asyncInfo={asyncInfo} info={info} />;
      case 'findContacts':
        return <FindContacts asyncInfo={asyncInfo} info={info} />;
      case 'blockedAccount':
        return <BlockedAccount />;
    }
  };
  return <View style={{flex: 1}}>{componentRender(info)}</View>;
};

export default Index;
