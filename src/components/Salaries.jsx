import PropTypes from "prop-types";

export const Salaries = ({ handleSelectChange, salaries }) => (
  <>
    <form>
      <select onChange={handleSelectChange}>
        <option value="">-Kies een loonschaal-</option>
        {salaries.length !== 0 &&
          salaries.map((salary, index) => (
            <option key={index} value={salary.naam}>
              {salary.naam}
            </option>
          ))}
      </select>
    </form>
  </>
);

Salaries.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  salaries: PropTypes.array.isRequired,
};
