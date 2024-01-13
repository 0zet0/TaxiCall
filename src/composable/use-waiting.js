import { useStore } from 'vuex';

const timerController = {
  id: null,
  delay: 10000,
};

export default () => {
  const store = useStore();

  const useWaiting = {
    setWaiting: (state) => {
      if (!('mp' in window) && timerController.delay !== 1000) timerController.delay = 1000;

      store.state.isWaiting = state;
      if (timerController.id) clearTimeout(timerController.id);
      if (state) timerController.id = setTimeout(() => (store.state.isWaiting = false), timerController.delay);
    },
  };

  return useWaiting;
};
