let counter = 0;

export const newUniqueID = () => {
  counter -= 1;
  return counter;
} 