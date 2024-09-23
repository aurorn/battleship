function importImg(r) {
    let imgs = {};
    r.keys().map((item) => { imgs[item.replace('./', '')] = r(item); });
    return imgs;
}

export const boardImgs = () => importImg(require.context('../images/ships', false, /\.svg$/));

/*export const boardImgs = async () => {
    const imgs = {};
    const req = await import.meta.glob('../images/ships/*.svg');
    for (const path in req) {
      imgs[path.replace('../images/ships/', '')] = req[path];
    }
    return imgs;
  };*/