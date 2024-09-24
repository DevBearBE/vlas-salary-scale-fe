import PropTypes from "prop-types";

export const Value = ({ label, value }) => (
  <>
    <div className="grid grid-cols-3 gap-2 mb-1">
      <p className="col-span-2 font-bold">{label}:</p>
      <p>{value.toFixed(2)} EUR</p>
    </div>
  </>
);

Value.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
