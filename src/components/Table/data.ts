export function basicField() {
  return [
    {
      name: "单行文本",
      fieldName: "textField",
      required: 0,
    },
    {
      name: "日期",
      fieldName: "dateField",
      required: 0,
      options: [
        {
          value: "option_0",
          label: "年",
        },
        {
          value: "option_1",
          label: "年-月",
        },
        {
          value: "option_2",
          label: "年-月-日",
        },
        {
          value: "option_3",
          label: "年-月-日 时:分",
        },
      ],
    },
    {
      name: "单选下拉",
      fieldName: "selectField",
      required: 0,
      options: [
        {
          value: "option_0",
          label: "选项1",
        },
        {
          value: "option_1",
          label: "选项2",
        },
      ],
    },
  ];
}

export const tableColumn = [
  {
    title: "字段名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "字段类型",
    dataIndex: "fieldName",
    key: "fieldName",
  },
  {
    title: "是否必填",
    dataIndex: "required",
    key: "required",
  },
  {
    title: "字段选项",
    key: "options",
    dataIndex: "options",
  },
  {
    title: "操作",
    key: "action",
    width: 100,
  },
];

export const tableData = [
  {
    key: "1",
    name: "字段1",
    fieldName: "textField",
    required: 0,
    options: [],
    value: "",
  },
  {
    key: "2",
    name: "字段2",
    fieldName: "dateField",
    required: 0,
    value: "option_2",
    options: [],
  },
  {
    key: "3",
    name: "字段3",
    fieldName: "selectField",
    required: 0,
    options: [
      {
        value: "option_0",
        label: "选项1",
      },
      {
        value: "option_1",
        label: "选项2",
      },
    ],
    value: "",
  },
];
