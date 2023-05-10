import Api from '@/api';
class Materials extends Api {
  /**
   * Вернет список всех групп
   * @returns {Promise<Response>}
   */
  materials = () => this.rest('/materials/list.json');

  /**
   * Удалит группу по id
   * @param id
   * @returns {Promise<*>}
   */
  remove = async (id) => {
      /*  const response = await this.rest('/couples/delete-item', {
            method: 'POST',
            'Content-Type': 'application/json',
            data: { id },
        });*/
      return id;
  };// then - заглушка, пока метод ничего не возвращает

  /**
   * Создаст новую запись в таблице
   * @param category объект группы, взятый из Formcategory
   * @returns {Promise<Response>}
   */
  add = (category) =>
    this.rest('materials/add-item', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(category),
    }).then(() => ({ ...category, id: new Date().getTime() })); // then - заглушка, пока метод ничего не возвращает

  /**
   * Отправит измененную запись
   * @param category объект группы, взятый из Formcategory
   * @returns {Promise<*>}
   */
  update = (category) =>
    this.rest('materials/update-item', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(category),
    }).then(() => category); // then - заглушка, пока метод ничего не возвращает
}
export default new Materials();
