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
            return (<div className='cell cell-img' key={index}><img src={val} /></div>)
        }
    }
    return (<div className='cell' key={index}>{val}</div>)
}

const Table = ({ dataTable, columns, currentPage, pageSize }) => {

    const sortByField = (e) => {
        const field = e.target.dataset.value;
        console.log(field);
        console.log(dataTable.sort((a, b) => a[field] > b[field] ? 1 : -1));
    }

    const rowsDataForTable = (initialData) => {
        initialData

        dataTable.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((row, index) => {
            return (
                <div className='row' key={index}>
                    {Object.values(row).map((cell, idx) => getValueByType(cell, idx))}
                </div>
            )
        })
    }

    return (
        <div className='flex-container'>
            <div className='row'>
                {columns.map((tableHead, index) => {
                    return (
                        <div className='cell' key={index}>
                            {`${tableHead} `} <div onClick={(e) => sortByField(e)} data-value={tableHead}>&#8593;</div> <div>&#8595;</div>
                        </div>
                    )
                })}
            </div>
            {console.log(dataTable)}
            {dataTable.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((row, index) => {
                return (
                    <div className='row' key={index}>
                        {Object.values(row).map((cell, idx) => getValueByType(cell, idx))}
                    </div>
                )
            })}
        </div>
    );
};

export default Table;