const initial = {
  userdata: {}
}

export default function (state = initial, action) {
  switch (action.type) {
    case "SETUSERCREDENTIALS":
      state = {
        ...state,
        userdata: action.payload,
      }
      break;
  }
  return state;
}



