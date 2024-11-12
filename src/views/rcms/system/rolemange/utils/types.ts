interface FormItemProps {
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  name: string;
  id: string;
  code: string | number;
  description: string;
  enterpriseId: string;
  isEdit: boolean;
  merchants: Array<any>;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
