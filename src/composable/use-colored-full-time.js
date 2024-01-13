import createSpan from "./use-create-span";

export default function coloredFullTime(value) {
  const vals = (value + '').split(' ');

  return `${createSpan(vals[0])} ${createSpan(vals[1], '#6B707D')} ${createSpan(vals[2])} ${createSpan(vals[3], '#6B707D')}`;
}
