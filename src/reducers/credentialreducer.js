const initial = {
  userdata: {},
  favouriteprinters:{},
  printedDoc: [],
  isVPQ: false
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
      case "SETPRINTEDDOC":
        state = {
          ...state,
          printedDoc: action.payload,
          isVPQ: action.flag
        }
  }
  console.log(state, 'satete')
  return state;
}



