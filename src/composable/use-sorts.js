function sortByTimestamp(d1, d2) {
  return d2.timestamp - d1.timestamp;
}

function sortByProperty(d1, d2, property) {
  return d2[property] - d1[property];
}

export default function () {
  return { sortByTimestamp, sortByProperty };
}
