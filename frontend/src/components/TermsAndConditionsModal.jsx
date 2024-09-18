/* eslint-disable react/prop-types */
/*
This is  a modal Module to show terms and condtions
it is dismissable 
*/
const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative overflow-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <section>
            <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
            <p>
              Welcome to our Personal Expense Tracker. These terms and conditions outline the rules and regulations for the use of our application. By accessing this application, we assume you accept these terms and conditions. Do not continue to use the application if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">2. Intellectual Property Rights</h3>
            <p>
              Other than the content you own, under these terms, we own all the intellectual property rights and materials contained in this application. You are granted a limited license only for purposes of viewing the material contained on this application.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">3. Limitation of Liability</h3>
            <p>
              In no event shall we, nor any of our officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this application, whether such liability is under contract. We, including our officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this application.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
