import React, {Component} from 'react';
import {ScrollView, RefreshControl, Text} from 'react-native';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  GET_EVENT_BY_ID,
  GET_TYPES_REQUEST,
  SET_EVENT_LOADER,
} from '../../actionsTypes';
import EventsListItem from '../../components/EventsListItem';
import {ScreenLoader} from '../../components';
class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 20,
      refreshing: false,
    };
  }
  async componentDidMount() {
    await this.props.makeAction(SET_EVENT_LOADER, true);
    await this.getDetailsInfo();
  }

  componentWillUnmount() {
    // this.props.makeAction(GET_EVENT_BY_ID, null);
  }

  getDetailsInfo = async () => {
    let id;
    if (!this.props.id) {
      id = await this.props.navigation.state.params.id;
    } else {
      id = this.props.id;
    }
    const data = {id};
    await this.props.makeAction(GET_EVENT_BY_ID, data);
    await this.props.makeAction(GET_TYPES_REQUEST, '');
  };

  refreshing = async () => {
    const {refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    await this.getDetailsInfo();
    this.setState({refreshing: false});
  };

  render() {
    const {event, eventLoader, navigation} = this.props;
    const {refreshing} = this.state;
    return (
      <>
        {eventLoader ? <ScreenLoader /> : null}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.refreshing}
              tintColor={'#A347FF'}
            />
          }>
          {event?._id ? (
            <EventsListItem
              eventDetailsUpdate={this.getDetailsInfo}
              refreshEvents={this.refreshing}
              item={event}
              eventDetails={true}
              navigation={navigation}
              showMembersList={
                navigation.state?.params?.data?.additionally?.showMembersList
              }
              routeName={'EventView'}
            />
          ) : null}
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    event: store.eventList.event,
    screenLoader: store.eventScreenLoader.eventScreenLoader,
    settings: store.profileData.settings,
    eventLoader: store.eventList.eventLoader,
  };
};
export default connect(mapStateToProps, {makeAction})(EventDetails);
