import React, {Component} from 'react';
import {View, TouchableOpacity, BackHandler, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Sizes} from '../../assets/styles';
import {ArrowLeft, ChooseLocation, IconLocation} from '../../components/Icons';
import {
  GET_EVENTS_LIST_DATA,
  GET_USER_LOCATION,
  UPDATE_USER_LOCATION,
  GET_NOTIFICATIONS_REQUEST,
  SELECTED_EVENT,
} from '../../actionsTypes';
import {Avatar} from '../../components';
import * as Animatable from 'react-native-animatable';
import MapEventList from '../../components/MapEventList';
import MapServices from '../../services/Map';
import SearchEvent from '../../components/SearchEvent';
import {AirbnbRating} from 'react-native-ratings';
import NavigationService from '../../NavigationService';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      page: 1,
      scrollEnabled: true,
      loadingMore: false,
      searchQuery: '',
      offset: 500,
      filtersData: {},
      zoom: 3,
      lang: 40.7929026,
      lat: 43.84649710000001,
    };
  }

  componentDidMount() {
    const {profile, selectedEvent} = this.props;

    this.props.makeAction(GET_USER_LOCATION, {
      callBack: async (userLocation) => {
        await this.getCoordinate(userLocation);
        await this.getEvents();
        const lat = selectedEvent
          ? selectedEvent.location.lat
          : userLocation.latitude;
        const long = selectedEvent
          ? selectedEvent.location.lang
          : userLocation.longitude;
        setTimeout(() => {
          this.focusOnMap(lat, long);
        }, 100);
      },
    });

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    if (profile._id) {
      this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  focusOnMap = (lat, long) => {
    this.setState({
      region: {
        ...this.state.region,
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
    });
  };
  getEvents = async () => {
    const {makeAction} = this.props;
    const {page, filtersData, zoom, region} = this.state;
    const data = {
      callback: () => {},
      error: () => {},
      page: page,
      loadMore: false,
      offset: 1000,
      filtersData,
      // lang: region.longitude,
      // lat: region.latitude,
      // zoom,
    };
    makeAction(GET_EVENTS_LIST_DATA, data);
  };

  backAction = () => {
    const {pressOnMarker} = this.props;
    pressOnMarker(null);
  };

  getCoordinate = (location) => {
    if (location?.latitude) {
      this.setState({
        region: {
          ...this.state.region,
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
      });
    }
    this.props.makeAction(UPDATE_USER_LOCATION, {location: location});
  };

  onRegionChange = (region) => {
    this.state.region = region;
    // if (this.timeOut) clearTimeout(this.timeOut)
    // this.timeOut = setTimeout(() => {
    //   this.setState({ region }, async () => {
    //     await this.getZoom()
    //     this.getEvents()
    //   });
    // }, 500)
  };

  getIcons(data) {
    if (this.props.selectedEvent && this.props.selectedEvent._id === data._id) {
      return this.CustomMarkerDescription(data);
    } else {
      return this.customMarkerUserProfile(data);
    }
  }
  customMarkerUserProfile = (data) => {
    return (
      <Animatable.View
        useNativeDriver={true}
        animation="fadeIn"
        easing="ease-out-cubic"
        style={{
          paddingRight: Sizes.size5,
        }}>
        <Avatar
          margin={2.5}
          borderWidth={Sizes.size2}
          radius={Sizes.size20}
          width={Sizes.size57}
          height={Sizes.size57}
          data={data}
          verified={data?.verified}
          mapView={true}
          active={data?.status}
        />
      </Animatable.View>
    );
  };
  CustomMarkerDescription = (data) => {
    const {pressOnMarker} = this.props;
    console.log(data, 'ITEMDATA');
    return (
      <Animatable.View
        useNativeDriver={true}
        animation="fadeInUp"
        easing="ease-in-out"
        style={{
          paddingRight: Sizes.size5,
        }}>
        <MapEventList pressOnMarker={pressOnMarker} item={data} />
      </Animatable.View>
    );
  };

  bacToUserLocation = async () => {
    const {userLocation} = this.props;
    if (userLocation.latitude) {
      this.setState({
        region: {
          ...this.state.region,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        },
      });
    } else {
      this.props.makeAction(GET_USER_LOCATION);
    }
    await this.getZoom();
    this.getEvents();
  };

  drawInMap = (loc, index) => {
    const {pressOnMarker} = this.props;
    return (
      <Marker
        key={index.toString()}
        onPress={() => {
          pressOnMarker(loc, index);
        }}
        coordinate={{
          latitude: parseFloat(loc?.lat),
          longitude: parseFloat(loc?.lang),
        }}>
        {this.getIcons(loc)}
      </Marker>
    );
  };
  getZoom = async () => {
    const coords = await this.mapRef.getCamera();
    const zoom = Math.round(coords.zoom);
    this.state.zoom = zoom;
  };

  showEventLocation(loc, index) {
    return (
      <Marker
        key={index?.toString()}
        coordinate={{
          latitude: parseFloat(loc?.lat),
          longitude: parseFloat(loc?.lang),
        }}>
        <IconLocation
          IconWidth={Sizes.size49}
          IconHeight={Sizes.size49}
          IconColor={'#A347FF'}
        />
      </Marker>
    );
  }

  showGoBackHeader = () => {
    const {theme, selectedEvent} = this.props;
    const {
      goBackButton,
      fixedHeaderContainer,
      avatarContainer,
      eventItemHeader,
      userName,
    } = styles(theme);
    return (
      <Animatable.View
        useNativeDriver={true}
        animation="fadeInDown"
        easing="ease-in-out"
        style={fixedHeaderContainer}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.back();
            MapServices.setGoBackInMap(false);
            this.props.makeAction(SELECTED_EVENT, null);
          }}
          style={goBackButton}>
          <ArrowLeft
            IconWidth={Sizes.size22}
            IconHeight={Sizes.size22}
            IconColor={'#818195'}
          />
        </TouchableOpacity>
        <View style={avatarContainer}>
          <Avatar
            userId={selectedEvent?.createdBy?._id}
            onPressAvatar={() => {}}
            width={Sizes.size32}
            height={Sizes.size32}
            data={{
              picture: selectedEvent?.createdBy?.picture,
            }}
            verified={selectedEvent?.createdBy?.verificationDetails?.verified}
            active={selectedEvent?.createdBy?.status}
          />
        </View>
        <View style={eventItemHeader}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={userName}>
            {selectedEvent?.createdBy?.name
              ? selectedEvent?.createdBy?.name
              : selectedEvent?.createdBy?.nickname}
          </Text>
          <View style={{marginLeft: -Sizes.size4}}>
            <AirbnbRating
              count={5}
              reviews={false}
              showRating={false}
              defaultRating={selectedEvent?.createdBy?.rating || 0}
              size={Sizes.size10}
              isDisabled={true}
              selectedColor="#FFA012"
            />
          </View>
        </View>
      </Animatable.View>
    );
  };

  render() {
    const {
      eventList,
      theme,
      selectedEvent,
      allowedGeolocation,
      userLocation,
    } = this.props;
    const {container, mapContainer, userLocationButton} = styles(theme);
    const {PRIMARY_COLOR_LIGHT} = theme.color;
    const {region} = this.state;
    const location = [];
    const list = eventList.eventList || [];
    list.map((event) => {
      event.location.type = event?.type;
      event.location.title = event?.title;
      event.location._id = event?._id;
      event.location.picture = event?.createdBy?.picture;
      event.location.verified = event.createdBy?.verificationDetails?.verified;
      event.location.description = event?.description;
      event.location.createdBy = event?.createdBy;
      event.location.image = event?.image[0];
      event.location.status = event?.status;
      location.push(event.location);
    });
    const focusInMap = MapServices.getGoBackInMap();

    const mapHeader = () => {
      if (focusInMap) {
        return this.showGoBackHeader();
      } else {
        return (
          <>
            <SearchEvent
              styleContainer={{
                position: 'absolute',
              }}
              drawingInMap={(ref) => (this.searchInputRef = ref)}
              filterData={(data) => {
                this.setState(
                  {
                    filtersData: data,
                    page: 1,
                    scrollEnabled: true,
                  },
                  () => {
                    this.getEvents();
                  },
                );
              }}
            />
            <TouchableOpacity
              style={userLocationButton}
              onPress={this.bacToUserLocation}>
              <ChooseLocation
                IconWidth={Sizes.size32}
                IconHeight={Sizes.size32}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </TouchableOpacity>
          </>
        );
      }
    };

    return (
      <View style={container}>
        {region?.latitude ? (
          <MapView
            maxZoomLevel={18}
            minZoomLevel={3}
            ref={(ref) => (this.mapRef = ref)}
            rotateEnabled={false}
            provider={'google'}
            style={mapContainer}
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={false}
            region={region}
            onTouchStart={() => {
              this.searchInputRef?.blur();
            }}
            onRegionChange={(region) => this.onRegionChange(region)}
            customMapStyle={theme?.MAP_THEME}>
            {focusInMap
              ? this.showEventLocation(
                  selectedEvent?.location,
                  selectedEvent?._id,
                )
              : location &&
                location.map((loc, index) => {
                  return this.drawInMap(loc, index);
                })}
          </MapView>
        ) : null}
        {mapHeader()}
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    eventList: store.eventList,
    profile: store.profileData.profile,
    filtersData: store.filtersData,
    userLocation: store.profileData.location,
    theme: store.themes.theme,
    allowedGeolocation: store.profileData.allowedGeolocation,
  };
};

export default connect(mapStateToProps, {makeAction})(Map);
