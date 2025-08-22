import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onAccept: (accepted: boolean) => void;
}

const TermsCheckbox: React.FC<Props> = ({ onAccept }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    onAccept(value);
  };

  return (

    
    <div className="mt-4 flex items-start space-x-2">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={handleChange}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        required
      />
      <label htmlFor="terms" className="text-sm text-gray-700">
        ฉันได้อ่านและยอมรับ{" "}
        <Link to="/terms-of-service" className="text-blue-600 underline">
          เงื่อนไขการให้บริการ
        </Link>{" "}
        และรับทราบ{" "}
        <Link to="/privacy-policy" className="text-blue-600 underline">
          ประกาศความเป็นส่วนตัว
        </Link>
      </label>
    </div>
  );
};

export default TermsCheckbox;
