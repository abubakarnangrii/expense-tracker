import React from "react";

interface MenuCardProps {
  item: {
    label: string;
    icon: React.ReactNode;
    amount: number;
  };
}
const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="shadow-sm ring ring-neutral-100/80 rounded flex justify-between items-center p-10">
      <div>
        <p className="text-xs font-semibold text-gray-700">{item.label}</p>
        <strong className="block text-lg font-bold">${item.amount}</strong>
      </div>
      <div
        className="bg-primary flex items-center justify-center rounded-full p-3 w-12 h-12"
        aria-hidden="true"
      >
        {/* {item.icon} */}
        <item.icon className="text-white h-6 w-6" />
      </div>
    </div>
  );
};

export default MenuCard;
