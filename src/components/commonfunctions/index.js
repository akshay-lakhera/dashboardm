export const showDate = (da) => {
  let date = new Date(da);
  return date.toDateString();
};
export function convertStringToFormat(inputString) {
  if (inputString?.length <= 4) {
    return inputString; // No need to convert if the string is 4 characters or shorter
  }

  const firstFourChars = inputString?.slice(0, 4);
  const lastFourChars = inputString?.slice(-4);
  const middleChars = "......";

  return `${firstFourChars}${middleChars}${lastFourChars}`;
}


export function makeCapital(str) {
 return  str?.charAt(0).toUpperCase() +str?.slice(1);
}