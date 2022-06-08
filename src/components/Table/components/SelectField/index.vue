<template>
  <div>
    <a-space direction="vertical" size="middle">
      <div>
        <div v-for="(item, i) in options" :key="item.value">
          <a-space size="middle">
            <div>{{ item.label }}</div>
            <MinusCircleOutlined
              style="color: red"
              class="cp"
              @click="onRemove(i)"
            />
          </a-space>
        </div>
      </div>
      <div v-if="visible">
        <a-space size="middle">
          <a-input
            size="small"
            v-model:value="option.label"
            placeholder="请输入选项值"
          />
          <CheckCircleOutlined
            style="color: green"
            class="cp"
            @click="onFinish"
          />
          <MinusCircleOutlined
            style="color: red"
            class="cp"
            @click="onCancel"
          />
        </a-space>
      </div>
      <div v-else>
        <a-button type="dashed" size="small" @click="onAdd">
          <PlusOutlined />
          添加选项
        </a-button>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import _cloneDeep from "lodash/cloneDeep";
import { message } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import { S4 } from "@/utils";

export default defineComponent({
  name: "SelectField",
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    CheckCircleOutlined,
  },
  props: ["options"],
  setup(props) {
    const { options } = reactive<any>(props);
    const visible = ref<boolean>(false);

    const option = reactive<any>({
      value: "",
      label: "",
    });

    const onRemove = (i: number) => {
      options.splice(i, 1);
    };

    const onAdd = () => {
      option.value = S4();
      option.label = `选项${options.length + 1}`;
      visible.value = true;
    };

    const onFinish = () => {
      if (!option.label) {
        message.error("选项明不能为空！");
        return;
      }
      options.push(_cloneDeep(option));
      visible.value = false;
    };

    const onCancel = () => {
      visible.value = false;
    };

    return {
      onRemove,
      onAdd,
      visible,
      option,
      onFinish,
      onCancel,
    };
  },
});
</script>
