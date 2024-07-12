import { useState, useEffect } from 'react';

import './Multiselect.scss';

const MultiSelect = ({ allOptionsFromDataTable, addSelectedOption, deleteSelectedOption, selectedOptions, setCurrentPage, search, setSearch }) => {
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const updateFilteredOptions = () => {
        const arrSelectOptions = selectedOptions.map(item => item.value);

        setFilteredOptions(allOptionsFromDataTable
            .filter(item => !arrSelectOptions.includes(item.value)));
    }

    useEffect(() => {
        updateFilteredOptions();
    }, [allOptionsFromDataTable, selectedOptions]);

    const onClickDropdownOption = (e, value) => {
        e.preventDefault();
        setCurrentPage(0);
        addSelectedOption(value);
        setSearch('');
    };

    const onDeleteOption = (e, option) => {
        e.preventDefault();
        setCurrentPage(0);
        deleteSelectedOption(option);
    };

    return (
        <div className="ms">
            <ul className="ms__chose">
                {selectedOptions.map((option, index) => (
                    <li key={index} className='ms__chose-item'>
                        {option.label}{' '}
                        <span onMouseDown={(e) => onDeleteOption(e, option)}>X</span>
                    </li>
                ))}
                <li className='ms__li-container' >
                    <input
                        className="ms__input"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                    />
                </li>
            </ul>
            {
                (dropdownOpen || search) && (
                    <div className="ms__dropdown">
                        {filteredOptions
                            .filter(option => option.label.toLowerCase().includes(search.toLowerCase()))
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className='ms__dropdown-item'
                                    onMouseDown={(e) => onClickDropdownOption(e, option.value)}
                                >
                                    {option.label}
                                </div>
                            ))}
                    </div>
                )
            }
        </div >
    )
};

export default MultiSelect;

