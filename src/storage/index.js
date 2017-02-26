

import {AsyncStorage} from 'react-native';
function initializeStorage(store, persistStore){
  return persistStore(store, {storage:AsyncStorage, whitelist:['persist']});
}

export {
  initializeStorage
}
