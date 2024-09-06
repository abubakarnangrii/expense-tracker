import React from 'react';
import { X } from 'lucide-react';

interface NewBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewBudgetModal: React.FC<NewBudgetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4">
      <div className=" bg-white dark:bg-black p-4 rounded shadow-lg max-w-md mx-auto w-full relative">
        <div className=' flex justify-between items-center'>
          <h2 className="text-xl font-semibold">New Budget</h2>
          <X onClick={onClose} size="22" className='bg-slate-50 hover:bg-primary/20 cursor-pointer rounded-full  ' />
        </div>
      </div>
    </div>
  );
};

export default NewBudgetModal;
