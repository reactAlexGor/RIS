import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from "../components/appHeader/AppHeader";
import Table from "../components/table/Table";
import Loader from '../components/loader/Loader';

import useRickAndMortyService from '../Services/RickAndMortyService';


const Portal = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    return ReactDOM.createPortal(props.children, node);
}

const Main = () => {
    const [dataTable, setDataTable] = useState([]);
    const [columns, setColumns] = useState([]);

    const { getDataByOption, loading } = useRickAndMortyService();

    useEffect(() => {
        getDataByOption('character')
            .then(data => {
                setDataTable(data)
                setColumns(Object.keys(data[0]))
            })

    }, [])

    return (
        <>
            <AppHeader />
            <Portal>
                {loading && <Loader />}
            </Portal>
            <Table dataTable={dataTable} columns={columns} />
        </>
    )
}

export default Main;