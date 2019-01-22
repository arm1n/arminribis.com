export const roundNumber = (value, decimals = 0) => {
  return +`${Math.round(`${value}e${decimals}`)}e-${decimals}`;
};

export const aspectRatio = ({ width, height }) => {
  return roundNumber(width / height, 2);
};