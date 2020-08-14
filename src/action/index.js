export const setUserCredentials = (value) => {
  return{
    type: "SETUSERCREDENTIALS",
    payload: value
  }
};
export const setFavouritePrinters = (value) => {
  return{
    type: "SETFAVOURITEPRINTERS",
    payload: value
  }
};
export const printedDocument = (value, flag) => {
  return{
    type: "SETPRINTEDDOC",
    payload: value,
    flag: flag
  }
}