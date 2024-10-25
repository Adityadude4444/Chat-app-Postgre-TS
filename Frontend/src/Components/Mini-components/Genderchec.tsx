import React from "react";

type GenderCheckboxProps = {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
};

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === "male"}
            onChange={() => onGenderChange("male")}
            className="radio border-slate-200"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === "female"}
            onChange={() => onGenderChange("female")}
            className="radio border-slate-200"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
