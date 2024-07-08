import { useState } from 'react';

// import { ms } from 'multiSelectTag';

import './AppHeader.scss'

const AppHeader = ({ apiOption, setApiOption }) => {

    // new ms('countries', {
    //     rounded: true,    // default true
    //     shadow: true,      // default false
    //     placeholder: 'Search',  // default Search...
    //     tagColor: {
    //         textColor: '#327b2c',
    //         borderColor: '#92e681',
    //         bgColor: '#eaffe6',
    //     },
    //     onChange: function (values) {
    //         console.log(values)
    //     }
    // });

    return (
        <header className='header'>
            <nav className='header__nav'>
                {/* <select name="countries" id="countries" multiple>
                    <option value="1">Afghanistan</option>
                    <option value="2">Australia</option>
                    <option value="3">Germany</option>
                    <option value="4">Canada</option>
                    <option value="5">Russia</option>
                </select> */}
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