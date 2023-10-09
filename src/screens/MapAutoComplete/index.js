import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';
import React, {Component} from 'react';
import {styles} from './styles';
import NavigationService from '../../NavigationService';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {ScreenHeader} from '../../components/ScreenHeader';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import Translation from '../../Translation';
import {Sizes, IconsStyles} from '../../assets/styles';
import {GET_USER_LOCATION} from '../../actionsTypes';
import {Cancel, ChooseLocation, IconLocation} from '../../components/Icons';
import {LineGradientButton} from '../../components';
import i18n from '../../assets/i18next';
class GooglePlacesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7929026,
        longitude: 43.84649710000001,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      },
      descName: '',
    };
  }

  componentDidMount() {
    const {location} = this.props.navigation.state.params;
    const {userLocation} = this.props;
    Geocoder.init('AIzaSyCwNRKz5aqbrsvkG1ehJ51ZjtJYdxsbkWg');

    if (!location) {
      if (userLocation.latitude) {
        this.setState({
          region: {
            ...this.state.region,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
        });
      }
    } else {
      const region = {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lang),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };
      this.setState({region});
    }
  }
  bacToUserLocation = () => {
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
  };
  setLocation = (geoData, name) => {
    const {setDate} = this.props.navigation.state.params;
    const data = {
      latitude: geoData.lat,
      longitude: geoData.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    this.setState({region: data});
    setDate(data, name);
  };

  onRegionChange = (region) => {
    region.latitudeDelta = region.latitudeDelta ? region.latitudeDelta : 0.005;
    region.longitudeDelta = region.longitudeDelta
      ? region.longitudeDelta
      : 0.005;

    this.setState({region});
    this.geoCoding(region);
  };

  geoCoding = (code) => {
    Geocoder.from({
      lat: code.latitude,
      lng: code.longitude,
    }).then((json) => {
      this.locationRef.setAddressText(
        json.results[0].formatted_address.split(',').splice(0, 2).join(),
      );
      this.setState({descName: json});
    });
  };

  setDateLocal = (code, json) => {
    const {setDate} = this.props.navigation.state.params;

    setDate(
      code,
      json.results[0].formatted_address.split(',').splice(0, 2).join(),
    );
  };

  render() {
    const {language} = this.props.navigation.state.params;
    const {region, descName} = this.state;
    const {theme} = this.props;
    const {
      fullContainer,
      mapContainer,
      content,
      saveButton,
      userLocationButton,
      textInputContainer,
      textInput,
      listView,
      description,
    } = styles(theme);
    const {PRIMARY_COLOR_LIGHT} = theme.color;
    return (
      <View style={fullContainer}>
        <ScreenHeader
          title={'location'}
          leftIcon={'back'}
          leftIconPress={() => {
            NavigationService.back();
          }}
        />

        <View>
          <View style={{position: 'relative'}}>
            <MapView
              maxZoomLevel={18}
              minZoomLevel={3}
              onRegionChangeComplete={(region) => {
                this.onRegionChange(region);
              }}
              customMapStyle={theme?.MAP_THEME}
              rotateEnabled={false}
              showsCompass={false}
              zoomEnabled={true}
              region={this.state.region}
              provider={'google'}
              style={mapContainer}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={region}
              onPress={(event) =>
                this.onRegionChange(event.nativeEvent.coordinate)
              }>
              <Marker coordinate={region}>
                <IconLocation
                  IconWidth={Sizes.size49}
                  IconHeight={Sizes.size49}
                  IconColor={'#A347FF'}
                />
              </Marker>
            </MapView>
            {/* <View
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -24,
                marginTop: -48,
                position: 'absolute',
                zIndex: 999,
              }}>
              <Location
                IconWidth={Sizes.size50}
                IconHeight={Sizes.size50}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </View> */}
          </View>
          <View style={saveButton}>
            <LineGradientButton
              disabled={!descName}
              paddingHorizontal={Sizes.size26}
              title={<Translation label={'buttons.add'} />}
              onPress={() => {
                this.setDateLocal(region, descName);
                NavigationService.back();
              }}
            />
          </View>
          <View style={content}>
            <GooglePlacesAutocomplete
              nearbyPlacesAPI="GooglePlacesSearch"
              ref={(instance) => {
                this.locationRef = instance;
              }}
              placeholder={i18n.t('inputs.placeholder.search')}
              autoFocus={false}
              returnKeyType={'search'}
              listViewDisplayed={false}
              fetchDetails={true}
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                this.setLocation(details.geometry.location, data.description);
              }}
              onFail={(error) => console.error(error)}
              styles={{textInputContainer, textInput, listView, description}}
              query={{
                key: 'AIzaSyCwNRKz5aqbrsvkG1ehJ51ZjtJYdxsbkWg',
                language: language,
                location: `${region.latitude},${region.longitude}`,
                radius: '2000',
              }}
              GoogleReverseGeocodingQuery={{}}
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'food',
              }}
              enablePoweredByContainer={false}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]}
              debounce={200}
              renderRightButton={() => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.locationRef.setAddressText('');
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: Sizes.size15,
                    backgroundColor: '#fff',
                    borderTopRightRadius: Sizes.size10,
                    borderBottomRightRadius: Sizes.size10,
                  }}>
                  <Cancel
                    iconWidth={Sizes.size14}
                    iconHeight={Sizes.size21}
                    iconColor={'black'}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          <TouchableOpacity
            style={userLocationButton}
            onPress={this.bacToUserLocation}>
            <ChooseLocation
              IconWidth={IconsStyles.bigSize}
              IconHeight={IconsStyles.bigSize}
              IconColor={PRIMARY_COLOR_LIGHT}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    userLocation: store.profileData.location,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(GooglePlacesInput);
