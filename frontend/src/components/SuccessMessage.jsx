/* eslint-disable react/prop-types */
const SuccessMessage = ({ message, onClose }) => {
  return (
    <div
      className=" fixed top-0 left-0 right-0 bg-teal-100  border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{message}</p>

          <button
            onClick={onClose}
            className="ml-4 bg-transparent border-none text-white cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
