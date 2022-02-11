import { useState, ChangeEventHandler, useMemo } from "react";

type FormData = {
  string?: string;
};

type UseFormResult<T> = {
  formData: T;
  formErrors: { string?: string };
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  setFieldValue: (fieldName: string, value: any) => void;
  setFormErrors: (errors: { string?: string }) => void;
  resetForm: () => void;
  isValid: boolean;
  hasErrors: boolean;
};

type UseFormOptions<T> = {
  initialState?: T;
  validate?: (values: T) => boolean;
};

function useForm<T = FormData>(options: UseFormOptions<T>): UseFormResult<T> {
  const { initialState = {} as T, validate } = options;
  const [formData, setFormData] = useState<T>(initialState as T);
  const [formErrors, setFormErrors] = useState<{ string?: string }>({});

  const resetForm = () => {
    setFormData(initialState);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const setFieldValue = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const isValid = useMemo(
    () => (validate ? validate(formData) : true),
    [formData]
  );

  const hasErrors = useMemo(() => Boolean(formErrors), [formErrors]);

  return {
    formData,
    formErrors,
    handleInputChange,
    setFormErrors,
    setFieldValue,
    resetForm,
    isValid,
    hasErrors,
  };
}

export default useForm;
