import { computed } from 'vue';
import { useStore } from 'vuex';

const mapState = (module = undefined) => {
  const state = module ? useStore().state[module] : useStore().state;
  return Object.fromEntries(
    Object.keys(state).map((key) => [
      key,
      computed({
        get: () => state[key],
        set: (newValue) => (state[key] = newValue),
      }),
    ])
  );
};
const mapGetters = () => {
  const store = useStore();
  return Object.fromEntries(Object.keys(store.getters).map((getter) => [getter, computed(() => store.getters[getter])]));
};
const mapMutations = () => {
  const store = useStore();
  return Object.fromEntries(Object.keys(store._mutations).map((mutation) => [mutation, (value) => store.commit(mutation, value)]));
};
const mapActions = () => {
  const store = useStore();
  return Object.fromEntries(Object.keys(store._actions).map((action) => [action, (value) => store.dispatch(action, value)]));
};
export { mapState, mapGetters, mapMutations, mapActions };
