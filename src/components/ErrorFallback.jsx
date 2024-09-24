import PropTypes from "prop-types";

export const ErrorFallback = ({ error }) => (
  <>
    <h1>Oeps er is iets misgegaan</h1>
    <p>{error.message}</p>
  </>
);

ErrorFallback.propTypes = {
  error: PropTypes.object,
};
