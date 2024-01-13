import useWaiting from './use-waiting';

function mpTrigger(name, ...args) {
  if ('mp' in window) mp.trigger(name, ...args);
  else console.log(`[Triggered]: ${name} (`, ...args, ')');
}

export { mpTrigger };

export default () => {
  const { setWaiting } = useWaiting();

  const useTrigger = {
    mpTriggerWaiting: (name, ...args) => {
      mpTrigger(name, ...args);
      setWaiting(true);
    },
  };

  return useTrigger;
};
