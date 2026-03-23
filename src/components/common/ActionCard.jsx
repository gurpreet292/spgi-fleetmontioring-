import React from "react";

const ActionCard = ({ icon: Icon, title, description, iconColor }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/60 transition cursor-pointer">

      <Icon className={iconColor} size={26} />

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>

    </div>
  );
};

export default React.memo(ActionCard);