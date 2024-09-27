function importImg(r) {
  let imgs = {};
  r.keys().map((item) => {
    imgs[item.replace("./", "")] = r(item);
  });
  return imgs;
}

export const boardImgs = () =>
  importImg(require.context("../images/ships", false, /\.svg$/));
