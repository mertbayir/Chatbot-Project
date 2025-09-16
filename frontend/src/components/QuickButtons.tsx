import React from 'react';

interface QuickButton {
  label: string;
  onClick: () => void;
}

interface QuickButtonsProps {
  buttons: QuickButton[];
}

export const QuickButtons: React.FC<QuickButtonsProps> = ({ buttons }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="px-3 py-1 bg-primary-500 text-white rounded shadow hover:bg-primary-600 transition text-xs"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
