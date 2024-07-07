import AppHeader from "../components/AppHeader/AppHeader";
import Table from "../components/Table/Table";

import { useState, useEffect } from 'react';

import useRickAndMortyService from '../Services/RickAndMortyService';

const Main = () => {
    const [dataTable, setDataTable] = useState([]);
    const [columns, setColumns] = useState([]);

    const { getDataByOption, loading, setLoading } = useRickAndMortyService();

    useEffect(() => {
        getDataByOption('location')
            .then(data => {
                setDataTable(data)
                setColumns(Object.keys(data[0]))
            })

    }, [])

    return (
        <>
            <AppHeader />
            <Table dataTable={dataTable} columns={columns} />
        </>
    )
}

export default Main;