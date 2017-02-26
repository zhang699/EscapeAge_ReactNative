

import {toQueryGeocodeURL} from './util';

const ZOOM_LEVEL = 0.002
const GEOLOCATION = {
  longitudeDelta:ZOOM_LEVEL,
  latitudeDelta:ZOOM_LEVEL
}


export function fetchGeolocation(address) {
  return fetch(toQueryGeocodeURL(address), {
    method:'GET',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    },
  })
  .then((response)=>response.json())
  .then((responseJSON)=>{
    console.warn('google service response', responseJSON);
    const firstResult = responseJSON.results[0];
    const geolocation = firstResult.geometry.location
    const geolocationResult = {
      longitude:geolocation.lng,
      latitude:geolocation.lat
    }
    return Promise.resolve({...geolocationResult, ...GEOLOCATION})
  }).catch(function (err) {

    return Promise.reject(err)
  })
}
