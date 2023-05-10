import api from './api';

// initial state
const state = () => ({
  items: [
    { id: '1', name: 'очки деревяные ', description: 'очки', price: '1', material: 'Дерево' },
    { id: '2', name: 'трость', description: 'из металла', price: '111', material: 'Металл' },
  ],
  filteredItems: [],
});

//getters
const getters = {
  items: (state) => (state.filteredItems.length > 0 ? state.filteredItems : state.items),
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
  setFilteredItems: (state, items) => {
    state.filteredItems = items;
  },
  setItem: (state, item) => {
    state.items.push(item);
  },
  removeItem: (state, idRemove) => {
    state.items = state.items.filter(({ id }) => id !== idRemove);
  },
  updateItem: (state, updateItem) => {
    const index = state.items.findIndex((item) => +item.id === +updateItem.id);
    state.items[index] = updateItem;
  },
};
//actions
const actions = {
  fetchItems: async ({ commit }) => {
    const response = await api.goods();
    const items = await response.json();
    commit('setItems', items);
  },
  removeItem: async ({ commit }, id) => {
    const idRemoveItem = await api.remove(id);
    commit('removeItem', idRemoveItem);
  },
  addItem: async ({ commit }, { name, material, price, description }) => {
    const item = await api.add({ name, material, price, description });
    commit('setItem', item);
  },
  updateItem: async ({ commit }, { id, name, material, price, description }) => {
    const item = api.update({ id, name, material, price, description });
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
