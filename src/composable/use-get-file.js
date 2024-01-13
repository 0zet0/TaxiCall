const getImage = (path, ext = 'png') => require(`@/assets/images/${path}.${ext}`);

export { getImage };
