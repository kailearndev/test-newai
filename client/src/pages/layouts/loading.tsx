
const LoadingModal = () => {


    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xl bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-10 flex flex-col items-center shadow-lg">
                <svg
                    className="animate-spin h-12 w-12 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingModal;