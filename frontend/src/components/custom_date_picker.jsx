import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ placeholder, value, onChange }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      maxDate={new Date()}
      customInput={
        <div className="flex items-center border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
          <input
            readOnly
            placeholder={placeholder}
            value={value ? value.toLocaleDateString() : ""}
            className="flex-1 focus:outline-none bg-transparent"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}
        </div>
      }
    />
  );
};

export default CustomDatePicker;
