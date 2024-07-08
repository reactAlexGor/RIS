import React, { useState } from 'react';

const MultiSelect = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const newSelectedOptions = [...selectedOptions];
        const index = newSelectedOptions.indexOf(selectedValue);

        if (index === -1) {
            newSelectedOptions.push(selectedValue);
        } else {
            newSelectedOptions.splice(index, 1);
        }

        setSelectedOptions(newSelectedOptions);
    };

    return (
        <div>
            <label htmlFor="options">Select Options:</label>
            <select onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <ul>
                {selectedOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default MultiSelect;