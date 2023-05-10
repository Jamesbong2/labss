<template lang="">
  <Layout v-bind:title="'Материалы'">
    <MaterialsList />
  </Layout>
</template>
<script>
import Layout from '../components/Layout.vue';
import MaterialsList from '@/components/MaterialsList.vue';
export default {
  name: 'MaterialsView',
  components: {
    Layout,
    MaterialsList,
  },
};
</script>
<style lang=""></style>
