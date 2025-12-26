const byRating = (a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0);

const byPages = (a: any, b: any) => (b.pages ?? 0) - (a.pages ?? 0);

const byDateAdded = (a: any, b: any) => {
  const aTime = a.date_added instanceof Date ? a.date_added.getTime() : 0;
  const bTime = b.date_added instanceof Date ? b.date_added.getTime() : 0;

  return bTime - aTime;
};

export { byPages, byRating, byDateAdded };
