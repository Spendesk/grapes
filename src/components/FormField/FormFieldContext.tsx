import React, { createContext, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
  isInvalid: boolean;
  errorMessageId?: string;
  labelId: string;
  inputId: string;
  descriptionId?: string;
};

type FormFieldContext = {
  isInvalid: boolean;
  fit: undefined | 'parent';
  errorMessageId: undefined | string;
  labelId: undefined | string;
  inputId: undefined | string;
  descriptionId: undefined | string;
};

const FormFieldContext = createContext<FormFieldContext>({
  isInvalid: false,
  fit: undefined,
  errorMessageId: undefined,
  labelId: undefined,
  inputId: undefined,
  descriptionId: undefined,
});

export const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  return context;
};

export const FormFieldProvider = ({
  children,
  isInvalid,
  descriptionId,
  errorMessageId,
  labelId,
  inputId,
}: Props) => {
  const context = {
    isInvalid,
    errorMessageId,
    labelId,
    descriptionId,
    inputId,
    fit: 'parent' as const,
  };

  return (
    <FormFieldContext.Provider value={context}>
      {children}
    </FormFieldContext.Provider>
  );
};
