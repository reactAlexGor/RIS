import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from "../components/appHeader/AppHeader";
import Table from "../components/table/Table";
import Loader from '../components/loader/Loader';

import useRickAndMortyService from '../services/RickAndMortyService';


const Portal = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    return ReactDOM.createPortal(props.children, node);
}

const Main = () => {
    const [dataTable, setDataTable] = useState([]);
    const [columns, setColumns] = useState([]);
    const [apiOption, setApiOption] = useState('location');
    const [field, setField] = useState('type');

    const { getDataByOption, loading } = useRickAndMortyService();

    useEffect(() => {
        getDataByOption(apiOption)
            .then(data => {
                setDataTable(data)
                setColumns(Object.keys(data[0]))
            })

        if (apiOption === 'location') {
            setField('type');
        } else if (apiOption === 'character') {
            setField('species');
        }

    }, [apiOption])

    const filterData = (data, filter, field) => {

        return data.filter((item) => {
            console.log(item);
            return filter.includes(item[field]);
        });
    }

    const getTypesfromArr = (arr) => {
        const arrTypes = arr.map((item) => {
            return item[field];
        })
        return Array.from(new Set(arrTypes));
    }

    return (
        <>
            <AppHeader setApiOption={setApiOption} types={getTypesfromArr(dataTable)} />
            <Portal>
                {loading && <Loader />}
            </Portal>
            <Table dataTable={filterData(dataTable, ['Alien'], field)} columns={columns} />
        </>
    )
}

export default Main;