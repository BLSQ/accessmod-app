export const stopPropagation = (event: {
  preventDefault: Function;
  stopPropagation: Function;
}) => {
  event.preventDefault();
  event.stopPropagation();
};
