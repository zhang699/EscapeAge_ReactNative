


import {
  Strings,
} from '../../views/values/';

import {
  store
} from '../main';

const AREAS = {
    TAIPEI : "area_tp",
    NORTHERN : "area_n",
    CENTRAL : "area_c",
    TAINAN : "area_tn",
    KAOHSIUNG :"area_kh",
    EAST : "area_e",
    OTHER : "area_other"
}
const DEFAULT_AREA_ORDER = [
  AREAS.TAIPEI,
  AREAS.NORTHERN,
  AREAS.CENTRAL,
  AREAS.TAINAN,
  AREAS.KAOHSIUNG,
  AREAS.EAST
];
import {persistAreas} from '../persist/persistActions';
class Areas {

  constructor(areas){
    this.areaSort = areas || DEFAULT_AREA_ORDER;
  }
  getAreas(){
    return AREAS;
  }
  applyAreaSettings(settings){
    //console.warn('applyAreaSettings', settings);
    store.dispatch(persistAreas(settings))
  }
  getDisplayAreas(){
    return this.areaSort.map((area, index)=>{
      return {
        text : Strings[area],
        token : area
      }
    })
  }

  compareArea(area1, area2){
    const area1Idx = this.areaSort.indexOf(area1);
    const area2Idx = this.areaSort.indexOf(area2);
    if (area1Idx < area2Idx){
      return -1;
    }else if (area1Idx > area2Idx){
      return 1
    }else{
      return 0;
    }
  }
}

export default Areas
