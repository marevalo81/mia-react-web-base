import PropTypes from "prop-types";

export default function Card({
  children,
  padded = true,
  className = "",
  ...props
}) {
  return (
    <div
      className={`
        rounded-card
        border border-border
        bg-surface
        shadow-card
        ${padded ? "p-5" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  className: PropTypes.string,
};
