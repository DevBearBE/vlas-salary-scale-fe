import PropTypes from "prop-types";

export const Steps = ({ handleSelectStep, selectedSalaryScale }) => (
  <>
    {selectedSalaryScale.steps.map((step, index) => (
      <button key={index} onClick={() => handleSelectStep(step.trap)}>
        {step.trap}
      </button>
    ))}
  </>
);

Steps.propTypes = {
  handleSelectStep: PropTypes.func.isRequired,
  selectedSalaryScale: PropTypes.object.isRequired,
};
