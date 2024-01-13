import { Howl } from 'howler';

export function playAudio(path, volume, loop) {
  return new Howl({
    src: [path],
    loop,
    volume,
  }).play();
}
