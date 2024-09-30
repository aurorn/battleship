function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const boardImgs = importAll(require.context('../images/ships', false, /\.svg$/));
export { boardImgs };