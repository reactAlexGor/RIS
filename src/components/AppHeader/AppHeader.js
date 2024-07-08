import './AppHeader.scss'

const AppHeader = () => {
    return (
        <header className='header'>
            <nav className='header__nav'>
                <input placeholder='Search...' />
                <div className="header__select">
                    <p>API</p>
                    <select >
                        <option value='location'>location</option>
                        <option value='character'>character</option>
                    </select>
                </div>
                <h1>Choose a book format</h1>
                <div class="select">
                    <select name="format" id="format">
                        <option selected disabled>Choose a book format</option>
                        <option value="pdf">PDF</option>
                        <option value="txt">txt</option>
                        <option value="epub">ePub</option>
                        <option value="fb2">fb2</option>
                        <option value="mobi">mobi</option>
                    </select>
                </div>

            </nav>
        </header >
    )
}

export default AppHeader;