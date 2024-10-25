import React from "react";

interface ConservationItemProps {
  name: string;
  imageUrl?: string; // Optional prop, as a user may not have a custom image
}

const Conservationitem: React.FC<ConservationItemProps> = ({
  name,
  imageUrl,
}) => {
  return (
    <div className="flex items-center gap-5 p-2 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out cursor-pointer">
      <img
        src={
          imageUrl ||
          "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg"
        }
        alt={`${name}'s profile`}
        className="w-10 h-10 object-cover rounded-full border-2 border-gray-300"
      />
      <span className="font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default Conservationitem;
