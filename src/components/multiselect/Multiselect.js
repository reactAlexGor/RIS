import { useState, useEffect } from 'react';

import './Multiselect.scss';

const MultiSelect = ({ options }) => {
    const [query, setQuery] = useState('');
    const [listOptions, setListOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setListOptions(options);
        updateSearchResults(query);
    }, [query, options, selectedOptions, listOptions]);

    // Функция инициализации всех возможных значений опций
    const updateListOptions = (options) => {
        setListOptions((options) => options);
    }

    // Функция для добавления выбранной опции в список выбранных
    const addSelectedOption = (option) => {
        console.log(option);
        setSelectedOptions([...selectedOptions, option]);
    };

    // // Функция для удаления выбранной опции из списка выбранных
    // const removeOptionFromSelected = (optionElement) => {
    //     const index = selectedOptions.indexOf(optionElement);
    //     if (index !== -1) {
    //         setSelectedOptions(selectedOptions.slice(0, index).concat(selectedOptions.slice(index + 1)));
    //     }
    // };

    // Функция для обновления списка результатов поиска
    const updateSearchResults = (newQuery) => {
        setQuery(newQuery);
        if (!newQuery || !listOptions.length) return;

        const filteredOptions = listOptions.filter((option) => option.label.toLowerCase().includes(newQuery.toLowerCase()));
        console.log(filteredOptions);
        setSelectedOptions(filteredOptions);
    };

    return (
        <>
            <div className="container">
                <div className="search-bar">
                    <input placeholder='Поиск по типу' type="text" value={query} onChange={(e) => updateSearchResults(e.target.value)} />
                </div>
            </div>
            <ul>
                <li>Selected item</li>
                {selectedOptions.map((option, index) => <li key={index} className='selected-list'>{option.label}</li>)}
            </ul>
            <div className="dropdown-wrapper" >
                <li>Dropdown list item</li>
                {listOptions.map((option, index) => <li key={option.label} className='dropdown' value={option.value} onClick={(e) => console.log(e.target.value)}>{option.label}</li>)}
            </div>
        </>

    )
}

export default MultiSelect;