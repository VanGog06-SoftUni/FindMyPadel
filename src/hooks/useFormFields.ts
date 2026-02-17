"use client";

import { useState } from "react";

export function useFormFields<T extends Record<string, string>>(
  initialState: T,
) {
  const [form, setForm] = useState<T>(initialState);

  const setField = <K extends keyof T>(field: K, value: T[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return { form, setForm, setField };
}
