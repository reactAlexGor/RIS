import { useState, useEffect } from 'react';

import './Footer.scss';

const Footer = ({ dataTableLength, currentPage, setCurrentPage, pageSize, setPageSize }) => {
    const [maxPageCount, setMaxPageCount] = useState(Math.ceil(dataTableLength / pageSize));

    useEffect(() => {
        setMaxPageCount(() => Math.ceil(dataTableLength / pageSize));
    }, [dataTableLength, pageSize]);

    const handleChangePageSize = (newPageSize) => {
        setCurrentPage(0);
        setPageSize(newPageSize);
        setMaxPageCount(() => Math.ceil(dataTableLength / pageSize));
    };

    const handlePrevious = () => {
        if (currentPage + 1 > 1) {
            setCurrentPage(currentPage - 1);
        };
    };

    const handleNext = () => {
        const nextPage = currentPage + 1;
        if (nextPage < maxPageCount) {
            setCurrentPage(nextPage);
        };
    };

    return (
        <footer className='footer'>
            <nav className='footer__nav'>
                <div className="footer__selector-wrapper">
                    <p>Строк на странице:</p>
                    <select value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                    </select>
                </div>
                <div className='footer__navigation'>
                    <button className={`footer__nav-button ${currentPage === 0 ? 'disabled' : ''}`} onClick={handlePrevious}>&#8249;</button>
                    <div className='footer__navigation-counters'><span>{currentPage + 1}</span><span >{`/${maxPageCount}`}</span></div>
                    <button className={`footer__nav-button ${currentPage + 1 === maxPageCount ? 'disabled' : ''}`} onClick={handleNext}>&#8250;</button>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;