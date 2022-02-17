import {
  useState,
  ChangeEventHandler,
  useMemo,
  useCallback,
  useEffect,
  FormEvent,
} from "react";
import usePrevious from "./usePrevious";

type FormData = {
  string?: string;
};

type UseFormResult<T> = {
  formData: T;
  previousFormData: T | undefined;
  errors: { [key in keyof T]?: FormFieldError };
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  setFieldValue: (fieldName: string, value: any) => void;
  resetForm: () => void;
  handleSubmit: (event?: { preventDefault?: Function }) => void;
  touched: { [key in keyof Partial<T>]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
};

type FormFieldError = string;

type UseFormOptions<T> = {
  initialState?: Partial<T>;
  onSubmit: (formData: T) => void | Promise<any>;
  validate?: (values: Partial<T>) => {
    [key in keyof T]: FormFieldError;
  };
};

function useForm<T = FormData>(options: UseFormOptions<T>): UseFormResult<T> {
  const { initialState = {}, validate, onSubmit } = options;
  const [touched, setTouched] = useState<
    | {
        [key in keyof Partial<T>]: boolean;
      }
    | {}
  >({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [hasBeenSubmitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<T>(initialState as T);
  const previousFormData = usePrevious<T>(formData);

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setTouched({});
    setFormData(initialState as T);
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setFieldValue(event.target.name, event.target.value);
    },
    []
  );

  const setFieldValue = useCallback((field: string, value: any) => {
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));
    setTouched((touched) => ({
      ...touched,
      [field]: true,
    }));
  }, []);

  const errors = useMemo(() => {
    if (!validate) {
      return {};
    }

    const errors = validate(formData);
    return errors || {};
  }, [formData]);

  const isValid = useMemo(
    () => Object.values(errors).filter(Boolean).length === 0, // Ignore {myField: null | undefined}
    [errors]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;

      setSubmitting(true);
      setSubmitted(true);
      if (isValid) {
        try {
          await onSubmit(formData);
        } catch (err) {
          throw err;
        } finally {
          setSubmitting(false);
        }
      }
      setSubmitting(false);
    },
    [formData, errors, isValid, touched]
  );

  // Proxy the touched fields to ensure that all errors are shown when the user ...
  // ... has already tried to submit the form.
  const allTouched = useMemo(() => {
    return new Proxy(touched, {
      get(target: any, prop: string) {
        return hasBeenSubmitted || target[prop];
      },
    });
  }, [touched, hasBeenSubmitted]);

  return {
    formData,
    previousFormData,
    errors,
    touched: allTouched,
    handleInputChange,
    setFieldValue,
    resetForm,
    isValid,
    isSubmitting,
    handleSubmit,
  };
}

export default useForm;
