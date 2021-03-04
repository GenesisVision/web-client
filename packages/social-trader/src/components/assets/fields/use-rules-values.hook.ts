import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const useRulesValues = (defaultValues: Record<string, any>) => {
  const { watch, reset } = useForm({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return {
    getValues: watch
  };
};
