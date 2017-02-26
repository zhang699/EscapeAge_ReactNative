import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  ConfirmModal,
  WebViewAutoHeight,
} from './';

import {
  Colors,
} from '../values/'
const result = [
  {
    title: 'react-native-share',
    license: 'MIT',
    owner: 'EstebanFuentealba',
    location: 'https://github.com/EstebanFuentealba/react-native-share',
  },
  {
    title: 'react-native-calendar',
    license: 'MIT',
    owner: 'christopherdro',
    location: 'https://github.com/christopherdro/react-native-calendar',
  }
]
class LicenseModal extends Component {
  
  constructor(props) {
    super(props);
    let licenseHtml = '';

    result.map(item=>{
      licenseHtml += `
        <h4>${item.title}@${item.owner}</h4>
        <p>which is license undered ${item.license}, the source code
        and the license for this software is available on 
        <a href="${item.location}">${item.location}</a>
        </p>
      `
    });
    this.state = {
      licenseHtml: `<body><div>${licenseHtml}</div></body>`,
    }
  }
  render() {
    const { modalDidClose, open, title, confirmButton } = this.props;

    const modal = {
      modalDidClose,
      open,
    }
    const contentCSS = {
      backgroundColor:'#f5f5f5', 
      color:'black',
    }
    
    return (
        <ConfirmModal
          title={title}
          modal={modal}
          containerStyle={styles.containerStyle}
          confirmButton={confirmButton}>

          <WebViewAutoHeight
              style={styles.webViewContent}
              contentCSS={contentCSS}
              scrollEnabled={true}
              source={{html:this.state.licenseHtml}}/>

        </ConfirmModal> 
    )
  }
}

const styles = EStyleSheet.create( {
  webViewContent:{
    flex:1,
    marginTop:5,
    padding: 5,
    width: '80%',
    height: 300,
  },
  containerStyle:{
    height: 450,
  }
})

export default LicenseModal;