<template lang="">
  <div>
    <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
      <GoodsForm @submit="onSubmit" :id="id" />
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
import GoodsForm from '@/components/GoodsForm.vue';
import { useStore } from 'vuex';
import { addItem, updateItem } from '@/store/goods/service';
export default {
  name: 'GoodsEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    GoodsForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name, material, price, description }) =>
        id
          ? updateItem(store, { id, name, material, price, description })
          : addItem(store, { name, material, price, description }),
    };
  },
};
</script>
<style></style>
