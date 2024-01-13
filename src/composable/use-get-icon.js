export default function useGetIcon(name = '', path = 'inventory/items', imageExtentoins = 'png') {
  try {
    return require(`@/assets/images/${path}/${name}.${imageExtentoins}`);
  } catch (e) {
    return require(`@/assets/images/inventory/items/question.svg`);
  }
}
