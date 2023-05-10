import { createStore } from 'vuex';
import goods from './goods';
import materials from './materials';
export default createStore({
  modules: {
    goods,
    materials,
  },
});
