export const convertToMillions = (data) => {
  const tempArr = [];
  for (let i = 0; i < data.length; i++) {
    tempArr.push((data[i] / 1000000).toFixed(1));
  }
  return tempArr;
};

export const convertToThousands = (data) => {
  const tempArr = [];
  for (let i = 0; i < data.length; i++) {
    tempArr.push((data[i] / 1000).toFixed(1));
  }
  return tempArr;
};
