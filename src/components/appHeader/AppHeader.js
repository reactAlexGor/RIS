import MultiSelect from '../multiselect/Multiselect';

import './AppHeader.scss';


const AppHeader = ({ allOptionsFromDataTable, setApiOption, addSelectedOption, selectedOptions, setCurrentPage }) => {
    return (
        <header className='header'>
            <nav className='header__nav'>
                <MultiSelect
                    allOptionsFromDataTable={allOptionsFromDataTable}
                    addSelectedOption={addSelectedOption}
                    selectedOptions={selectedOptions}
                    setCurrentPage={setCurrentPage}
                />
                <div className="header__selector-wrapper">
                    <p>Выберите API:</p>
                    <select onChange={(e) => setApiOption(e.target.value)}>
                        <option value='location'>location</option>
                        <option value='character'>character</option>
                    </select>
                </div>
            </nav>
        </header >
    )
}

export default AppHeader;