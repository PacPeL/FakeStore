export const calculateAverage = (ratings) => {
  if (!ratings.length) return 0;

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};
