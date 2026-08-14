import PropTypes from "prop-types";

export default function Input({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  icon = null,
  error = "",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-text"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full rounded-lg border
            bg-surface px-3 py-2.5
            text-sm text-text
            placeholder:text-text-muted
            outline-none transition
            focus:border-primary focus:ring-4 focus:ring-primary/10
            disabled:cursor-not-allowed disabled:bg-surface-soft disabled:opacity-60
            ${
              error
                ? "border-danger focus:border-danger focus:ring-danger/10"
                : "border-border"
            }
            ${icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
