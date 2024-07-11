import { useState, useEffect } from 'react';

import AppHeader from "../components/appHeader/AppHeader";
import Table from "../components/table/Table";
import Loader from '../components/loader/Loader';
import useRickAndMortyService from '../services/RickAndMortyService';
import Footer from '../components/footer/Footer';

const Main = () => {
    const [dataTable, setDataTable] = useState([]);
    const [columns, setColumns] = useState([]);
    const [apiOption, setApiOption] = useState('location');
    const [field, setField] = useState('type');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { getDataByOption, loading } = useRickAndMortyService();

    useEffect(() => {
        getDataByOption(apiOption)
            .then(initialData => {
                const filteredInitialData = initialData.map(item => Object.fromEntries(Object.entries(item).filter(([_, val]) => typeof val !== 'object')));
                setDataTable(filteredInitialData);
                setColumns(Object.keys(filteredInitialData[0]));
            })

        if (apiOption === 'location') {
            setField('type');
        } else if (apiOption === 'character') {
            setField('species');
        }

    }, [apiOption, selectedOptions])

    const addSelectedOption = (option) => {
        console.log(option);
        setSelectedOptions([...selectedOptions, { value: option, label: option }]);
    };

    const filterDataByOptions = (data, options, field) => {
        const arrOptions = options.map(item => Object.values(item)).flat();
        const arrUniqOptions = Array.from(new Set(arrOptions));

        if (arrUniqOptions.length === 0) {
            return data;
        }

        return data.filter((obj) => {
            return arrUniqOptions.includes(obj[field]);
        });
    }

    const getAllOptionsfromDataTable = (dataTable) => {
        let allOptionsfromDataTable = dataTable.map((item) => {
            return item[field];
        })
        allOptionsfromDataTable = Array.from(new Set(allOptionsfromDataTable));

        return toPrepareOptions(allOptionsfromDataTable);
    }

    const toPrepareOptions = (allOptionsfromDataTable) => {
        const arrPrepareOptions = [];
        allOptionsfromDataTable.map(option => {
            arrPrepareOptions.push({ value: option, label: option })
        })
        return arrPrepareOptions;
    }

    return (
        <>
            {loading && <Loader />}
            <AppHeader
                setApiOption={setApiOption}
                allOptionsFromDataTable={getAllOptionsfromDataTable(dataTable)}
                addSelectedOption={addSelectedOption}
                selectedOptions={selectedOptions}
                setCurrentPage={setCurrentPage}
            />
            <Footer
                dataTableLength={filterDataByOptions(dataTable, selectedOptions, field).length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <Table
                dataTable={filterDataByOptions(dataTable, selectedOptions, field)}
                columns={columns}
                currentPage={currentPage}
                pageSize={pageSize}
            />

        </>
    )
}

export default Main;