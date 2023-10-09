import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../../assets/styles';
import {MenuRadio} from '../MenuRadio';

const InviteEvent = ({info, asyncInfo}) => {
  const [selectedId, setSelectedId] = useState();

  const SaveState = (title, id) => {
    if (id) {
      asyncInfo[info] = title;
      setSelectedId(id);
    } else {
      asyncInfo[info] = 'None';
      setSelectedId(id);
    }
    let jsonValue = JSON.stringify(asyncInfo);
    AsyncStorage.setItem('@privacy', jsonValue);
  };

  const RadioTitle = [
    {
      id: 1,
      title: 'all',
      tintColors: Colors.blueViolet,
    },
    {
      id: 2,
      title: 'onlyMen',
      tintColors: Colors.blueViolet,
    },
    {
      id: 3,
      title: 'onlyWomen',
      tintColors: Colors.blueViolet,
    },
    // {
    //   id: 4,
    //   title: 'friends',
    //   tintColors: Colors.blueViolet,
    //   value: false,
    // },
    {
      id: 5,
      title: 'none',
      tintColors: Colors.blueViolet,
    },
  ];

  const renderItem = ({item}) => {
    const value = item.title === asyncInfo[info];
    return (
      <MenuRadio
        title={'privacy.inviteYouEvents.' + item.title}
        value={value}
        onPress={() => {
          SaveState(item.title, item.id);
        }}
        tintColors={item.tintColors}
        change={() => {
          SaveState(item.title, item.id);
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={RadioTitle}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export {InviteEvent};
