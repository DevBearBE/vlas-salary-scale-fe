import PropTypes from "prop-types";

export const SalariesSelect = ({ handleSelectChange, salaries }) => (
  <>
    <form>
      <select className="px-4 py-2 bg-zinc-100" onChange={handleSelectChange}>
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

SalariesSelect.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  salaries: PropTypes.array.isRequired,
};
