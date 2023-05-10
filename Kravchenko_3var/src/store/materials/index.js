import api from './api';

// initial state
const state = () => ({
  items: [
    { id: '1', material: 'Дерево' },
    { id: '2', material: 'Металл' },
  ],
});

//getters
const getters = {
  items: (state) => state.items,
  itemsByKey: (state) =>
    state.items.reduce((res, cur) => {
      res[cur['id']] = cur;
      return res;
    }, {}),
};
//mutations
const mutations = {
  setItems: (state, items) => {
    state.items = items;
  },
  setItem: (state, item) => {
    state.items.push(item);
  },
  removeItem: (state, idRemove) => {
    state.items = state.items.filter(({ id }) => id !== idRemove);
  },
  updateItem: (state, updateItem) => {
    console.log(updateItem);
    const index = state.items.findIndex((item) => +item.id === +updateItem.id);
    console.log(state.items);
    state.items[index] = updateItem;
  },
};
//actions
const actions = {
  fetchItems: async ({ commit }) => {
    const response = await api.materials();
    const items = await response.json();
    commit('setItems', items);
  },
  removeItem: async ({ commit }, id) => {
    const idRemoveItem = await api.remove(id);
    commit('removeItem', idRemoveItem);
  },
  addItem: async ({ commit }, { material }) => {
    const item = await api.add({ material });
    commit('setItem', item);
  },
  updateItem: async ({ commit }, { id, material }) => {
    const item = api.update({ id, material });
    commit('updateItem', item);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
