import { createStore } from 'redux'
 
function login(state = 0, action) {
  switch (action.type) {
  case 'SIGN_IN':
    return state + 1
  case 'SIGN_OUT':
    return state - 1
  default:
    return state
  }
}
 
let store = createStore(login)
 
store.subscribe(() =>
  console.log(store.getState())
)
 
store.dispatch({ type: 'SIGN_IN' })
// 1
store.dispatch({ type: 'SIGN_IN' })
// 2
store.dispatch({ type: 'SIGN_IN' })
// 1