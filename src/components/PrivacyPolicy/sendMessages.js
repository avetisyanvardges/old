import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from '../../assets/styles';
import {MenuRadio} from '../MenuRadio';

const SendMessages = ({info, asyncInfo}) => {
  const [selectedId, setSelectedId] = useState(null);

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
      value: false,
    },
    // {
    //   id: 2,
    //   title: 'friends',
    //   tintColors: Colors.blueViolet,
    //   value: false,
    // },
    {
      id: 3,
      title: 'whoIsInTheEventWithMe',
      tintColors: Colors.blueViolet,
      value: false,
    },
    {
      id: 4,
      title: 'none',
      tintColors: Colors.blueViolet,
      value: true,
    },
  ];

  const renderItem = ({item}) => {
    const value = item.title === asyncInfo[info];
    return (
      <MenuRadio
        title={'privacy.sendYouMessages.' + item.title}
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
    <View>
      <FlatList
        data={RadioTitle}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export {SendMessages};
