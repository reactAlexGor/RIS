import { useState, useEffect } from 'react';
import Select from 'react-select';

import './AppHeader.scss';

const AppHeader = ({ types, setApiOption }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        prepareOptions(types);
    }, [types])

    const prepareOptions = (types) => {
        const arr = [];
        types.map(item => {
            arr.push({ value: item, label: item })
        })
        setOptions(arr);
    }

    return (
        <header className='header'>

            <nav className='header__nav'>
                {/* <div className="header__multiselector-wrapper">
                    <Select
                        isMulti
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div> */}
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