import { cn } from '@/lib/utils';

type FormErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

export function FormError({ id, message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        "rounded-md bg-destructive/10 p-3 text-sm text-destructive",
        className,
      )}
    >
      {message}
    </div>
  );
}

type FieldErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

export function FieldError({ id, message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={cn("text-sm text-destructive", className)}
    >
      {message}
    </p>
  );
}
