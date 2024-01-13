export default function createSpan(value, color = '#fff', style = '') {
  return `<span class='events-none' style='color: ${color};${style}'>${value}</span>`;
}
