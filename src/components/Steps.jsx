import PropTypes from "prop-types";

export const Steps = ({ handleSelectStep, selectedSalaryScale }) => (
  <>
    {selectedSalaryScale.steps.map((step, index) => (
      <button
        className="px-2 my-2 mr-4 border-b-4 rounded-md bg-amber-400 hover:bg-amber-500 border-amber-700 hover:border-amber-800 hover:shadow-lg"
        key={index}
        onClick={() => handleSelectStep(step.trap)}
      >
        {step.trap}
      </button>
    ))}
  </>
);

Steps.propTypes = {
  handleSelectStep: PropTypes.func.isRequired,
  selectedSalaryScale: PropTypes.object.isRequired,
};
