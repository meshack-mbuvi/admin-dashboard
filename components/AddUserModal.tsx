import React, { useState } from 'react';
import useAuthToken from '@/hooks/useAuthToken';
import { useParams } from 'next/navigation';
import useCreateApiKey from '@/hooks/useCreateApiKey';

type AddUserModalProps = {
  show: boolean,
  onClose: () => void,
};

const AddUserModal : React.FC<AddUserModalProps> = ({ show, onClose }) => {
    const sessionToken = useAuthToken()
    const { projectId } = useParams()
    const createMutation = useCreateApiKey(projectId)

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    if (!show) return null;

    const handleRequest = () => {
        if (sessionToken) {
            createMutation.mutate({
                method: "POST",
                sessionToken,
                endpointPath: `/admin/user`,
                // Delete Role and set it to admin for now
                body: JSON.stringify({ name, email, role: "admin" })
            })
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-left w-2/5 mx-auto bg-gray-8 p-8">
                <p className="font-sans font-medium text-2xl text-gray-1 mb-7">Invite user</p>
                <div className="flex flex-col justify-center items-left">
                    <p className="font-sans font-medium text-white text-sm mb-2 bg-dark">Name</p>
                    <input value={name} onChange={(e => setName(e.target.value))} className="border border-gray-7 text-gray-4 bg-inherit rounded-lg px-4 py-3.5 mb-7" placeholder="Example Person" />
                </div>
                <div className="flex flex-col justify-center items-left">
                    <p className="font-sans font-medium  text-white text-sm mb-2">Email Address</p>
                    <input value={email} onChange={(e => setEmail(e.target.value))} className="text-base border border-gray-7 text-gray-4 bg-inherit rounded-lg px-4 py-3.5 mb-7" placeholder="example@example.com" />
                </div>
                <input type="button" onClick={() => {
                    handleRequest();
                    onClose();
                }} className="text-black font-sans font-medium bg-white rounded-lg px-8 py-3.5 mb-7 hover:opacity-90" value="Invite to project" />
            </div>
        </div>
    )
}

export default AddUserModal
