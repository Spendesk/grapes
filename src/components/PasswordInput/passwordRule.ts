export type PasswordRule = {
  label: string;
  required?: number;
  validate: (value: string | null) => boolean;
};
