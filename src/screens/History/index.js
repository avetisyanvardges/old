import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {ScreenHeader, ScreenLoader} from '../../components';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import {
  GET_HISTORY_DATA,
  DELETE_HISTORY_DATA,
  SET_EVENT_VIEW_LOADER_VISIBLE,
  DELETE_All_HISTORY,
} from '../../actionsTypes';
import {Sizes, IconsSizes, IconsStyles} from '../../assets/styles';
import {More, Bin} from '../../components/Icons';
import _ from 'lodash';
import Translation from '../../Translation';
import RBSheet from 'react-native-raw-bottom-sheet';
import i18n from '../../assets/i18next';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentDidMount = () => {
    this.props.makeAction(GET_HISTORY_DATA);
    this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
  };

  deleteItem = (id) => {
    this.props.makeAction(DELETE_HISTORY_DATA, id);
    this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
    this.RBSheet.close();
  };

  deleteAll = () => {
    Alert.alert(
      i18n.t('alerts.remove_history'),
      i18n.t('alerts.remove_history_alert'),
      [
        {
          text: i18n.t('alerts.ok'),
          onPress: () => {
            this.props.makeAction(DELETE_All_HISTORY, '');
            this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
          },
        },
        {
          text: i18n.t('alerts.cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  openModal = (item) => {
    this.setState({id: item.id});
    this.RBSheet.open();
  };

  render() {
    const {historyData, navigation, screenLoader, theme} = this.props;
    const {
      container,
      itemController,
      title,
      deleteHistoryText,
      deleteHistory,
      modalContent,
      actionBlock,
      alertMessage,
      content,
      deleteAll,
    } = styles(theme);
    const {PRIMARY_COLOR_BOLD, PRIMARY_FOREGROUND_COLOR} = theme.color;
    let data = [];
    historyData.map((history) => {
      data.push({
        title: {
          description: history.description,
          date: new Date(history.date).toLocaleDateString(),
        },
        id: history.id,
      });
    });
    const renderItem = ({item}) => {
      return (
        <View>
          <View style={modalContent}>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={Sizes.size100}
              openDuration={300}
              closeOnDragDown={true}>
              <TouchableOpacity
                style={deleteHistory}
                onPress={() => this.deleteItem(this.state.id)}>
                <Bin
                  IconHeight={IconsStyles.medium}
                  IconWidth={IconsStyles.medium}
                  IconColor={PRIMARY_FOREGROUND_COLOR}
                />
                <Text style={deleteHistoryText}>
                  <Translation label={'texts.delete'} />
                </Text>
              </TouchableOpacity>
            </RBSheet>
          </View>
          <View style={content}>
            <View style={itemController}>
              <Text style={title}>{item.title.description}</Text>
              <Text style={title}>{item.title.date}</Text>
            </View>
            <View style={actionBlock}>
              <TouchableOpacity onPress={() => this.openModal(item)}>
                <More
                  IconWidth={IconsSizes.small}
                  IconHeight={IconsSizes.small}
                  IconColor={PRIMARY_COLOR_BOLD}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    return (
      <>
        {screenLoader ? <ScreenLoader /> : null}
        <View style={container}>
          <ScreenHeader
            title={'history'}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />
          {!_.isEmpty(historyData) ? (
            <View>
              <TouchableOpacity
                style={deleteAll}
                onPress={() => {
                  this.deleteAll(historyData);
                }}>
                <Text style={{color: '#1F45FC'}}>
                  <Translation label={'texts.deleteAll'} />
                </Text>
              </TouchableOpacity>
              <FlatList
                keyExtractor={(data) => data.id}
                data={data}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <Text style={alertMessage}>
              <Translation label={'texts.noHistory'} />
            </Text>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    historyData: store.history.historyData,
    screenLoader: store.eventScreenLoader.eventScreenLoader,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(History);
