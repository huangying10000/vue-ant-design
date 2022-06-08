<template>
  <div class="table">
    <div class="m2-b">
      <a-button @click="onAdd" type="primary">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="list" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div>
            {{ record.name }}
          </div>
        </template>
        <template v-if="column.key === 'fieldName'">
          <div>
            {{ getFieldName(record.fieldName) }}
          </div>
        </template>
        <template v-if="column.key === 'required'">
          <div>
            {{ record.required ? "是" : "否" }}
          </div>
        </template>
        <template v-if="column.key === 'options'">
          <div>
            {{ getFieldOptions(record) }}
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a @click="onEdit(record)">编辑</a>
          </span>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:visible="visible"
      width="80%"
      title="编辑"
      destroyOnClose
      :footer="null"
    >
      <TableEdit
        :editData="editData"
        :fields="fields"
        @onUpdateData="onUpdateData"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";
import "./index.less";
import { basicField, tableColumn, tableData } from "./data";

const TableEdit = defineAsyncComponent(() => import("./edit.vue"));

export default defineComponent({
  name: "TableIndex",
  components: { TableEdit },
  setup() {
    const fields = reactive<any[]>(basicField());
    const columns = reactive<any[]>(tableColumn);
    const list = reactive<any[]>(tableData);
    const editData = ref<any>(null);
    const visible = ref<boolean>(false);

    const getField = (fieldName: string) => {
      return fields.find((e: any) => e.fieldName === fieldName);
    };

    const getFieldName = (fieldName: string) => {
      const field = getField(fieldName);
      return field ? field.name : "未知";
    };

    const getFieldOptions = (record: any) => {
      const { fieldName, options, value } = record;

      if (fieldName === "selectField") {
        return options.map((e: any) => e.label).join("、");
      }

      if (fieldName === "dateField" && value) {
        const field = getField(fieldName);
        return field.options.find((e: any) => e.value === value).label;
      }

      return "无";
    };

    const onEdit = (record: any) => {
      editData.value = record;
      visible.value = true;
    };

    const onAdd = () => {
      const i = list.length + 1;
      const obj: any = {
        key: `${i}`,
        name: `字段${i}`,
        fieldName: fields[0].fieldName,
        required: 0,
        options: [],
        value: "",
      };
      list.push(obj);
    };

    const onUpdateData = (item: any) => {
      const { fieldName, name, required, options, value } = item;
      const i = list.findIndex((e: any) => e.key === editData.value.key);
      list[i] = {
        ...list[i],
        fieldName,
        name,
        required,
        options,
        value,
      };
      visible.value = false;
      editData.value = null;
    };

    return {
      fields,
      list,
      columns,
      editData,
      getFieldName,
      getFieldOptions,
      onEdit,
      onAdd,
      visible,
      onUpdateData,
    };
  },
});
</script>
