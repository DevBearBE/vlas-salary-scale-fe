import PropTypes from "prop-types";

export const ErrorFallback = ({ error }) => (
  <>
    <div className="container p-12 mx-auto my-24">
      <h1 className="p-4 text-2xl font-bold text-center bg-amber-400">
        Oeps!! Er is iets misgegaan..
      </h1>
      <div className="px-2 py-4 bg-zinc-300 min-h-96">
        <p className="mt-4 ml-4">{error.message}</p>
      </div>
    </div>
  </>
);

ErrorFallback.propTypes = {
  error: PropTypes.object,
};
