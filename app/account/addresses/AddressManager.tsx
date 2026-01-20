"use client";

import React, { useState } from 'react';
import { Plus, Home, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { deleteAddress } from '@/app/actions/addresses';
import AddressForm from './AddressForm';
import { Button, Popconfirm, message, Modal } from 'antd';

// Reusing the type from DB or defining locally for UI
type Address = {
    id: string;
    firstName?: string | null; // Allow null to match Prisma type
    lastName?: string | null;  // Allow null
    address1: string;
    city: string;
    country: string;
    phone?: string | null;
    isDefault?: boolean; // Hypothetical field for UI styling
};

const AddressManager = ({ addresses }: { addresses: Address[] }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await deleteAddress(id);
            message.success('Address deleted');
        } catch (error) {
            message.error('Failed to delete address');
        }
    };

    const handleEdit = (addr: Address) => {
        setEditingAddress(addr);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setEditingAddress(null);
    };

    return (
        <div>
        

           {/* Form Modal */}
           <Modal 
             open={showForm} 
             onCancel={handleClose} 
             footer={null}
             width={600}
             destroyOnClose // Important to reset form fields between edits/adds
           >
               <AddressForm onClose={handleClose} initialValues={editingAddress} />
           </Modal>

           {/* Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               
               {/* Add New Card - Hidden when form is open to avoid clutter/confusion or kept as persistent button */}
               {!showForm && (
                   <button 
                        onClick={() => { setEditingAddress(null); setShowForm(true); }}
                        className="border-2 border-dashed border-blue-200 rounded-lg p-8 flex flex-col items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors bg-white min-h-[200px]"
                   >
                       <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                           <Plus size={24} />
                       </div>
                       <span className="font-bold">Add New Address</span>
                   </button>
               )}

               {/* Address Cards */}
               {addresses.map((addr) => (
                   <div key={addr.id} className="bg-white border rounded-lg p-6 shadow-sm relative flex flex-col justify-between min-h-[200px]">
                       <div className="flex gap-4">
                           <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                               <Home size={20} className="text-gray-600" />
                           </div>
                           <div>
                               <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-gray-900">Work</h4> {/* Mock Label */}
                                    {/* Default Badge if needed */}
                               </div>
                               <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                   {addr.address1}, {addr.city}, {addr.country}
                               </p>
                               <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                   <span>{addr.firstName} {addr.lastName}</span>, <span>{addr.phone}</span>
                                   <CheckCircle2 size={14} className="text-green-600" />
                               </div>
                           </div>
                       </div>

                       <div className="flex items-center gap-4 mt-6 pt-4 border-t text-sm font-medium">
                           <button onClick={() => handleEdit(addr)} className="text-blue-600 hover:underline">Edit</button>
                           
                           <Popconfirm
                                title="Delete the address"
                                description="Are you sure to delete this address?"
                                onConfirm={() => handleDelete(addr.id)}
                                okText="Yes"
                                cancelText="No"
                           >
                                <button className="text-blue-600 hover:underline">Delete</button>
                           </Popconfirm>

                           
                       </div>
                   </div>
               ))}

           </div>
        </div>
    );
};

export default AddressManager;
