const initial = {
  userdata: {},
  favouriteprinters:{}
}

export default function (state = initial, action) {
 
  switch (action.type) {
    case "SETUSERCREDENTIALS":
      state = {
        ...state,
        userdata: action.payload,
      }
      break;
    case "SETFAVOURITEPRINTERS":
      state = {
        ...state,
        favouriteprinters: action.payload,
      }
      break;
  }
  console.log(state, 'satete')
  return state;
}



