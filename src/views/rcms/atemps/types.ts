interface FormItemProps {
  name: string;
  id: string;
  code: string | number;
  remark: string;
  sort: number;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
