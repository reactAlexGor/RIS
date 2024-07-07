import s from './AppHeader.module.scss'

// import './AppHeader.scss'

const AppHeader = () => {
    return (
        <header className={s.header}>
            <nav className={s.nav}>
                <input
                    placeholder='Search...'
                />
            </nav>
            <div>

            </div>
        </header >

    )
}

export default AppHeader;