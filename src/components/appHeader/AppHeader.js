import { useState } from 'react';

import MultiSelect from '../multiselect/Multiselect';

import './AppHeader.scss';

const AppHeader = ({ allOptionsFromDataTable, setApiOption, addSelectedOption, deleteSelectedOption, selectedOptions, setCurrentPage, setSelectedOptions }) => {
    const [search, setSearch] = useState('');

    const onSelect = (value) => {
        setApiOption(value);
        setCurrentPage(0);
        setSearch('');
        setSelectedOptions([]);
    };

    return (
        <header className='header'>
            <nav className='header__nav'>
                <MultiSelect
                    allOptionsFromDataTable={allOptionsFromDataTable}
                    addSelectedOption={addSelectedOption}
                    deleteSelectedOption={deleteSelectedOption}
                    selectedOptions={selectedOptions}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    setSearch={setSearch}
                />
                <div className="header__selector-wrapper">
                    <p>Выберите API:</p>
                    <select onChange={(e) => onSelect(e.target.value)}>
                        <option value='location'>location</option>
                        <option value='character'>character</option>
                    </select>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;