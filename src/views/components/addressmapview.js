
import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import MapView from 'react-native-maps';
import {fetchGeolocation} from '../../model/utils/maputil';
import {store} from '../../model/main';

class AddressMapView extends Component {

  constructor(props){
    super(props);
    this.state={
      region:{},
      markers:[]
    }
  }
  componentWillMount(){
    const {address, title='', description=''} = this.props;

    fetchGeolocation(address)
    .then((geolocation)=> {

      var markers = this.prepareMarker(geolocation, {title, description})
      this.setState({
        markers,
        region:geolocation
      })
    });
  }

  prepareMarker(geolocation, markerOptions){
    return [{
      latlng:geolocation,
      title:markerOptions.title,
      description:markerOptions.description
    }]
  }
  render(){
    const mapViewStyle = this.props.style || style.mapView;
    return (
      <MapView
        style={mapViewStyle}
        region={this.state.region}
        pointerEvents={'none'}>
          {this.state.markers.map((marker, id) => (
            <MapView.Marker
              key={id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
      </MapView>
    )
  }
}

const style = StyleSheet.create({
  mapView:{
    width:300,
    height:150
  }
})

export default (AddressMapView);
