


class Studio {
  constructor(){
  }
  getPopularity(){
    const {views=0, likes=0} = this;
    return views * 3 + likes * 1;
  }
}

export default Studio;
