import React, { useState } from 'react';

type AddUserModalProps = {
  show: boolean,
  onClose: () => void,
};


const AddUserModal : React.FC<AddUserModalProps> = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-left w-2/5 mx-auto bg-gray-8 p-8">
                <p className="font-sans font-medium text-2xl text-gray-1 mb-7">Invite to project</p>
                <div className="flex flex-col justify-center items-left">
                    <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">Name</p>
                    <input className="border border-gray-7 text-gray-4 bg-inherit rounded-lg px-4 py-3.5 mb-7" placeholder="Example Person" />
                </div>
                <div className="flex flex-col justify-center items-left">
                    <p className="font-sans font-medium  text-white text-sm mb-2">Email Address</p>
                    <input className="text-base border border-gray-7 text-gray-4 bg-inherit rounded-lg px-4 py-3.5 mb-7" placeholder="example@example.com" />
                </div>
                <div className="flex flex-col justify-center items-left">
                    <p className="font-sans font-medium text-white text-sm mb-2">Role</p>
                    <input className="border border-gray-7 text-gray-4 bg-inherit rounded-lg px-4 py-3.5 mb-7" placeholder="Select a role" />
                </div>
                <input type="button" onClick={() => onClose()} className="text-black font-sans font-medium bg-white rounded-lg px-8 py-3.5 mb-7" value="Invite to project" />
            </div>
        </div>
    )
}

export default AddUserModal
