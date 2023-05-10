<template lang="">
  <div class="p-10 w-[500px] space-y-10 m-auto">
    <div v-if="form.id" class="">
      <div class="">
        <label for="id" class="label">ID</label>
      </div>
      <input class="input" v-model="form.id" disabled id="id" placeholder="id" type="text" />
    </div>
    <div class="">
      <div>
        <label class="label" for="name">Название</label>
      </div>
      <input class="input" v-model="form.name" id="name" placeholder="Имя" type="text" />
    </div>
    <div>
      <div>
        <label class="label" for="description">Описание</label>
      </div>
      <input
        class="input"
        v-model="form.description"
        id="description"
        placeholder="description"
        type="text"
      />
    </div>
    <div>
      <div>
        <label class="label" for="price">Цена</label>
      </div>
      <input class="input" v-model="form.price" id="price" placeholder="Цена" type="number" />
    </div>

    <div>
      <div>
        <label class="label" for="material">Материалы</label>
      </div>
      <select class="select" v-model="form.material" name="material" id="material">
        <option v-for="{ material, id } in materialList" :key="id" :value="material">
          {{ material }}
        </option>
      </select>
    </div>
    <div>
      <Btn @click="onClick" :disabled="!isValidForm" :isInfo="true">Сохранить</Btn>
    </div>
  </div>
</template>
<script>
import { fetchItems, selectItemById } from '@/store/goods/service';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive, onBeforeMount, watchEffect } from 'vue';
import {
  selectItems as selectMaterial,
  fetchItems as fetchMaterial,
} from '@/store/materials/service';
import Btn from './Btn.vue';
export default {
  name: 'GoodsForm',
  props: {
    id: { type: String, default: '' },
  },
  components: {
    Btn,
  },

  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const materialList = computed(() => selectMaterial(store));
    const form = reactive({
      id: '',
      name: '',
      description: '',
      price: '',
      material: '',
    });
    onBeforeMount(() => {
      fetchItems(store);
      fetchMaterial(store);
    });
    watchEffect(() => {
      const good = selectItemById(store, props.id);
      Object.keys(good).forEach((key) => {
        form[key] = good[key];
      });
    });
    return {
      materialList,
      form,
      isValidForm: computed(() => !!(form.name && form.description && form.price && form.material)),
      onClick: () => {
        context.emit('submit', form);
        router.push({ name: 'home' });
      },
    };
  },
};
</script>
<style>
.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
.label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.select {
  @apply block w-4/5 m-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight;
}
</style>
