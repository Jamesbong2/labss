<template lang="">
  <div>
    <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
      <MaterialsForm @submit="onSubmit" :id="id" />
    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout.vue';
import MaterialsForm from '@/components/MaterialsForm.vue';
import { useStore } from 'vuex';
import { addItem, updateItem } from '@/store/materials/service';
export default {
  name: 'MaterialsEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    MaterialsForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, material }) =>
        id ? updateItem(store, { id, material }) : addItem(store, { material }),
    };
  },
};
</script>
<style lang=""></style>
