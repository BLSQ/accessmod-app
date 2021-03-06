import _ from "lodash";
import { useTranslation } from "next-i18next";
import {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import usePrevious from "./usePrevious";

type FormData = {
  string?: string;
};

type UseFormResult<T> = {
  formData: Partial<T>;
  submitError: string | null;
  previousFormData: Partial<T> | undefined;
  errors: { [key in keyof T]?: FormFieldError };
  handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  setDebouncedFieldValue: (
    fieldName: keyof T,
    value: any,
    delay?: number
  ) => void;
  setFieldValue: (fieldName: keyof T, value: any, isTouched?: boolean) => void;
  resetForm: () => void;
  handleSubmit: (event?: {
    preventDefault: Function;
    stopPropagation: Function;
  }) => Promise<void> | void;
  touched: { [key in keyof Partial<T>]: boolean };
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
};

type FormFieldError = string;

type UseFormOptions<T> = {
  initialState?: Partial<T>;
  getInitialState?: () => Partial<T>;
  onSubmit: (formData: T) => void | Promise<any>;
  validate?: (values: Partial<T>) => {
    [key in keyof T]: FormFieldError;
  };
};

function useForm<T = FormData>(options: UseFormOptions<T>): UseFormResult<T> {
  const { t } = useTranslation();
  const { initialState = {}, getInitialState, validate, onSubmit } = options;
  const [isSubmitting, setSubmitting] = useState(false);
  const timeouts = useRef<{ [key in keyof T]?: any }>({});
  const [hasBeenSubmitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<
    | {
        [key in keyof Partial<T>]: boolean;
      }
    | {}
  >({});

  const internalInitialState = useRef<Partial<T>>();

  const setInitialState = () => {
    if (getInitialState) {
      internalInitialState.current = getInitialState() as T;
    } else {
      internalInitialState.current = initialState ?? {};
    }
  };
  if (!internalInitialState.current) {
    setInitialState();
  }
  const [formData, setFormData] = useState<Partial<T>>(
    internalInitialState.current ?? {}
  );
  const previousFormData = usePrevious<Partial<T>>(formData);

  const resetForm = useCallback(() => {
    setSubmitted(false);
    Object.values(timeouts).forEach((timeout) => clearTimeout(timeout));
    timeouts.current = {};
    setTouched({});
    setSubmitError(null);
    setInitialState();
    setFormData(internalInitialState.current ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInitialState, initialState]);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = useCallback(
    (event) => {
      if (
        event.target instanceof HTMLInputElement &&
        event.target.type === "checkbox"
      ) {
        setFieldValue(event.target.name as keyof T, event.target.checked);
      } else {
        setFieldValue(event.target.name as keyof T, event.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setFieldValue = useCallback(
    (field: keyof T, value: any, isTouched = true) => {
      setFormData((formData) => ({
        ...formData,
        [field]: value,
      }));
      setTouched((touched) => ({
        ...touched,
        [field]: isTouched,
      }));
    },
    []
  );

  const setDebouncedFieldValue = useCallback(
    (field: keyof T, value: any, delay: number = 200) => {
      clearTimeout(timeouts.current[field]);
      timeouts.current = {
        ...timeouts.current,
        [field]: setTimeout(() => {
          delete timeouts.current[field];
          timeouts.current = {
            ...timeouts.current,
          };
          setFieldValue(field, value);
        }, delay),
      };
    },
    [setFieldValue]
  );

  const errors = useMemo(() => {
    if (!validate) {
      return {};
    }

    const errors = validate(formData);
    return errors || {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const isValid = useMemo(() => {
    if (Object.values(errors).filter(Boolean).length > 0) {
      // Ignore {myField: null | undefined}
      return false;
    }
    if (Object.keys(timeouts.current).length > 0) {
      // Some changes are not processed yet
      return false;
    }
    return true;
  }, [errors, timeouts]);

  const handleSubmit = useCallback(
    async (event?: { preventDefault: Function; stopPropagation: Function }) => {
      event?.preventDefault();
      event?.stopPropagation();

      if (isSubmitting) return;

      setSubmitError(null);
      setSubmitting(true);
      setSubmitted(true);

      if (isValid) {
        try {
          await onSubmit(formData as T);
          setInitialState();
        } catch (err: any) {
          setSubmitError(
            err.message ?? (t("An unexpected error ocurred.") as string)
          );
        } finally {
          setSubmitting(false);
        }
      }
      setSubmitting(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isDirty = useMemo(
    () => !_.isEqual(formData, internalInitialState.current),
    [formData, internalInitialState]
  );

  return {
    formData,
    previousFormData,
    errors,
    submitError,
    isDirty,
    touched: allTouched,
    handleInputChange,
    setFieldValue,
    setDebouncedFieldValue,
    resetForm,
    isValid,
    isSubmitting,
    handleSubmit,
  };
}

export default useForm;
