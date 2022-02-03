import { useState, ChangeEventHandler, useMemo } from "react";

type FormData = {
  string?: string;
};

type UseFormResult<T> = {
  formData: T;
  formErrors: { string?: string };
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  setFormErrors: (errors: { string?: string }) => void;
  reset: () => void;
  isValid: Boolean;
  hasErrors: Boolean;
};

type Validate<T> = (values: T) => Boolean;

type UseFormOptions<T> = {
  initialState?: T;
  validate?: Validate<T>;
};

function useForm<T = FormData>(options: UseFormOptions<T>): UseFormResult<T> {
  const { initialState = {} as T, validate } = options;
  const [formData, setFormData] = useState<T>(initialState as T);
  const [formErrors, setFormErrors] = useState<{ string?: string }>({});

  const reset = () => {
    setFormData(initialState);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
    reset,
    isValid,
    hasErrors,
  };
}

export default useForm;
