import { useState, useEffect, useMemo } from 'react';

import AppHeader from "../components/appHeader/AppHeader";
import Table from "../components/table/Table";
import Loader from '../components/loader/Loader';
import useRickAndMortyService from '../services/RickAndMortyService';
import Footer from '../components/footer/Footer';

const Main = () => {
    const [defaultDataTable, setDefaultDataTable] = useState([]);
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
                const filteredInitialData = initialData
                    .map(item => Object.fromEntries(Object.entries(item)
                        .filter(([_, val]) => typeof val !== 'object')));
                setDefaultDataTable(filteredInitialData);
                setDataTable(filteredInitialData);
                setColumns(Object.keys(filteredInitialData[0]));
            })

        if (apiOption === 'location') {
            setField('type');
        } else if (apiOption === 'character') {
            setField('species');
        }

    }, [apiOption])

    const addSelectedOption = (option) => {
        const newSelectedOptions = [...selectedOptions, { value: option, label: option }]
        setSelectedOptions(newSelectedOptions);
        filterDataByOptions(newSelectedOptions, field)
    };

    const deleteSelectedOption = (option) => {
        const newSelectedOptions = selectedOptions.filter(obj => obj.value !== option.value);
        setSelectedOptions(newSelectedOptions);
        filterDataByOptions(newSelectedOptions, field);
    };

    const filterDataByOptions = (options, field) => {
        setDataTable(defaultDataTable.filter((obj) => {
            return options.map(item => item.value).includes(obj[field]);
        }));
    }

    const sortByField = (data, field, direction) => {
        const sign = direction ? 1 : -1;
        data.sort((a, b) => a[field] > b[field] ? 1 * sign : -1 * sign);
        setDataTable([...data]);
    };

    const allOptionsFromDataTable = useMemo(() => {
        const options = Array.from(new Set(dataTable.map(item => item[field])));
        return options.map(option => ({ value: option, label: option }));
    }, [defaultDataTable]);

    return (
        <>
            {loading && <Loader />}
            <AppHeader
                setApiOption={setApiOption}
                allOptionsFromDataTable={allOptionsFromDataTable}
                addSelectedOption={addSelectedOption}
                deleteSelectedOption={deleteSelectedOption}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                setCurrentPage={setCurrentPage}
            />
            <Table
                dataTable={dataTable}
                sortByField={sortByField}
                columns={columns}
                currentPage={currentPage}
                pageSize={pageSize}
            />
            <Footer
                dataTableLength={dataTable.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </>
    )
};

export default Main;