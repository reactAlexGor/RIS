import { useState } from "react";

import './Table.scss';

const getValueByType = (val, index) => {
    if (typeof val === 'number') {
        return (<div className='cell' key={index}>{val}</div>)
    }
    if (typeof val === 'string') {
        if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(val)) {
            return (<div className='cell' key={index}>{new Date(val).toLocaleDateString()}</div>)
        }
        if ((/jpeg$/.test(val))) {
            return (<div className='cell cell-img' key={index}><img src={val} alt='test' /></div>)
        }
    }
    return (<div className='cell' key={index}>{val}</div>)
}

const Table = ({ dataTable, sortByField, columns, currentPage, pageSize }) => {
    const [direction, setDirection] = useState(false);

    const onSort = (tableHead) => {
        sortByField(dataTable, tableHead, direction);
        setDirection(prev => !prev);
    };

    return (
        <div className='flex-container'>
            <div className='row'>
                {columns.map((tableHead, index) => (
                    <div className='cell' key={index}>
                        <div className='cell__head'>{tableHead}</div>
                        <div className='cell__wrapper-signs' onClick={() => onSort(tableHead)}>
                            <div className='cell__signs'>
                                &#8593;
                            </div>
                            <div className='cell__signs'>
                                &#8595;
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {dataTable.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((row, index) => (
                <div className='row' key={index}>
                    {Object.values(row).map((cell, idx) => getValueByType(cell, idx))}
                </div>
            ))}
        </div>
    );
};

export default Table;