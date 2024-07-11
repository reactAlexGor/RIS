import { useState, useEffect, useRef } from 'react';

import './Multiselect.scss';

const MultiSelect = ({ allOptionsFromDataTable, addSelectedOption, selectedOptions, setCurrentPage }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [listOptions, setListOptions] = useState([]);
    const [filtredOptions, setFiltredOptions] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const wrapRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        updateListOptions(allOptionsFromDataTable);
        updateSearchResults(searchQuery);
        // updateFiltredOptions();
    }, [searchQuery, allOptionsFromDataTable, selectedOptions, listOptions, dropdownOpen]);

    const handleClick = (e) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    }

    const updateListOptions = (options) => {
        setListOptions(options);
    }

    const updateSearchResults = (newQuery) => {
        setSearchQuery(newQuery);
        if (!newQuery || !listOptions.length) return;

        const filteredOptions = listOptions.filter((option) => option.label.toLowerCase().includes(newQuery.toLowerCase()));
        setFiltredOptions(filteredOptions);
    };

    const updateFiltredOptions = () => {
        const arrListOptions = Array.from(new Set(listOptions.map(item => Object.values(item)).flat()));
        const arrSelectOption = Array.from(new Set(selectedOptions.map(item => Object.values(item)).flat()));

        const toPrepareOptions = (allOptionsfromDataTable) => {
            const arrPrepareOptions = [];
            allOptionsfromDataTable.map(option => {
                arrPrepareOptions.push({ value: option, label: option })
            })
            return arrPrepareOptions;
        }
        setFiltredOptions(toPrepareOptions(arrListOptions.filter(value => !arrSelectOption.includes(value))));
    }

    const onClickDropdownOption = (e) => {
        setCurrentPage(0);
        addSelectedOption(e.target.dataset.value);
        updateFiltredOptions();
    }


    return (
        <>
            {/* <button onClick={() => updateFiltredOptions()}>322</button> */}
            <div className="ms" ref={wrapRef} >
                <ul className="ms__chose">
                    {selectedOptions.map((option, index) => <li key={index} className='ms__chose-item'>{option.label}</li>)}
                    <li>
                        <input
                            className="ms__input"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => updateSearchResults(e.target.value)}
                            onFocus={() => setDropdownOpen(true)}
                        // onBlur={(e) => setDropdownOpen(false)}
                        />
                    </li>
                </ul>
                <div className={`ms__dropdown ${dropdownOpen || searchQuery ? "" : "ms__dropdown_hidden"}`}  >
                    {(filtredOptions.length === 0 ? listOptions : filtredOptions)
                        .map((option, index) => (
                            <div
                                key={index}
                                className='ms__dropdown-item ms__dropdown-item_visible'
                                data-value={option.value}
                                // onClick={(e) => onClickDropDown(e)}
                                onClick={(e) => onClickDropdownOption(e)}
                            >
                                {option.label}
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default MultiSelect;

