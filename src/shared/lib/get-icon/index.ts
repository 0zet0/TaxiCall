export default function useGetIcon(name = '', path = '', imageExtentoins = 'png') {
  const url = (new URL(`../../../assets/images/${path}/${name}.${imageExtentoins}`, import.meta.url));
  
  if (url.pathname === "/undefined")
    return new URL(`../../../assets/images/icons/question.svg`, import.meta.url).href;
  else
    return url.href
}
