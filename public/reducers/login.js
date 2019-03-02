const initialState = {
  token: "",
  name: "",
  email: ""
}

export default function LoginReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case 'SIGN_IN':
    return Object.assign({}, state, payload);
  case 'SIGN_OUT':
    return Object.assign({}, state, payload);
  default:
    return state
  }
}
