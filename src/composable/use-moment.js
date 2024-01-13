import { getCurrentInstance } from 'vue';

export default function useMoment(timestamp, format) {
  return getCurrentInstance().appContext.config.globalProperties.moment(+timestamp, format);
}
