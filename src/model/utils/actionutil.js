

import camelCase from 'camelcase'
export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export function makeActionCreators(actionDscrs){
  const result = {}
  for (var type in actionDscrs){
     const args = actionDscrs[type];
     const actionName = camelCase(type)
     result[actionName] = makeActionCreator(type, ...args);
  }
  return result;
}
