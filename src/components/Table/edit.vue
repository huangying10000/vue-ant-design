<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="字段类型" name="fieldName">
        <a-select v-model:value="formState.fieldName" @change="onChangeField">
          <a-select-option v-for="item in fields" :key="item.fieldName">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="字段名称"
        name="name"
        :rules="[{ required: true, message: '请输入字段名称!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="是否必填" name="required">
        <a-radio-group v-model:value="formState.required" name="required">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-if="formState.fieldName === 'dateField'"
        label="日期类型"
        name="value"
      >
        <a-radio-group v-model:value="formState.value" name="dateField">
          <a-radio
            style="display: flex"
            v-for="item in field.options"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-if="formState.fieldName === 'selectField'"
        label="选项"
        name="value"
      >
        <SelectField :options="formState.options" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import _cloneDeep from "lodash/cloneDeep";
import { defineComponent, reactive, ref, defineAsyncComponent } from "vue";

const SelectField = defineAsyncComponent(
  () => import("./components/SelectField/index.vue")
);

const defaultValue = () => {
  return {
    fieldName: "textField",
    name: "",
    required: 0,
    options: [],
    value: "",
  };
};

export default defineComponent({
  name: "TableEdit",
  props: ["editData", "fields"],
  components: {
    SelectField,
  },
  emits: ["onUpdateData"],
  setup(props, { emit }) {
    const { editData, fields } = reactive(props);
    const formState = reactive(defaultValue());

    const field = ref<any>("");

    const getField = (fieldName: string) => {
      return fields.find((e: any) => e.fieldName === fieldName);
    };

    if (editData) {
      const { fieldName, name, required, options, value } =
        _cloneDeep(editData);
      field.value = getField(fieldName);
      formState.fieldName = fieldName;
      formState.name = name;
      formState.required = required;
      formState.options = options;
      formState.value = value;
    }

    const onFinish = () => {
      emit("onUpdateData", formState);
    };

    const onChangeField = (e: any) => {
      const f = getField(e);
      formState.name = f.name;
      formState.required = 0;
      formState.value = f.fieldName === "dateField" ? "option_2" : "";
      formState.options = f.fieldName === "selectField" ? f.options : [];
      field.value = f;
    };

    return {
      field,
      formState,
      onFinish,
      onChangeField,
    };
  },
});
</script>
