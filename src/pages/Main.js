import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from "../components/AppHeader/AppHeader";
import Table from "../components/Table/Table";
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
    const [apiOption, setApiOption] = useState('location');

    console.log(typeof apiOption);

    const { getDataByOption, loading } = useRickAndMortyService();

    useEffect(() => {
        getDataByOption(apiOption)
            .then(data => {
                setDataTable(data)
                setColumns(Object.keys(data[0]))
            })

    }, [apiOption])

    return (
        <>
            <AppHeader setApiOption={setApiOption} />
            <Portal>
                {loading && <Loader />}
            </Portal>
            <Table dataTable={dataTable} columns={columns} />
        </>
    )
}

export default Main;