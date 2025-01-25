import React from 'react'

interface ConfirmationModalProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 fixed inset-0"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
