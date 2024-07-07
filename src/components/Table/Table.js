import './Table.scss';

const Table = ({ dataTable, columns }) => {
    return (
        <div className='flex-container'>
            <div className='row'>
                {columns.map((tableHead, index) => {
                    return (
                        <div className='cell' key={index}>
                            {`${tableHead}`}
                        </div>
                    )
                })}
            </div>
            
            {dataTable.map((row, index) => {
                return (
                    <div className='row' key={index}>{Object.values(row).map((cell, index) => {
                        if (( /jpeg$/.test(cell) )) {
                            return (<div className='cell cell-img'><img src={cell}/></div>)
                        }
                        return (
                            <div className='cell' key={index}>{`${cell}`}</div>
                        )
                    })}
                    </div>
                )
            })}
        </div>
    );
};

export default Table;