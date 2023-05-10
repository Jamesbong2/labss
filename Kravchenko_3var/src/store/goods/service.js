export const fetchItems = (store) => {
  const { dispatch } = store;
  dispatch('goods/fetchItems');
};
export const selectItems = (store) => {
  const { getters } = store;
  return getters['goods/items'];
};
export const setItems = (store, items) => {
  const { commit } = store;
  commit('setItems', items);
};
export const removeItem = (store, id) => {
  const { dispatch } = store;
  dispatch('goods/removeItem', id);
};
export const addItem = (store, { name, material, price, description }) => {
  const { dispatch } = store;
  dispatch('goods/addItem', { name, material, price, description });
};
export const updateItem = (store, { id, name, material, price, description }) => {
  const { dispatch } = store;
  dispatch('goods/updateItem', { id, name, material, price, description });
};
export const selectItemById = (store, id) => {
  const { getters } = store;
  return getters['goods/itemsByKey'][id] || {};
};
