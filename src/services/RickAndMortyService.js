import { useHttp } from '../hooks/http.hook'

const useRickAndMortyService = () => {
    const { request, loading } = useHttp();

    const _apiBase = 'https://rickandmortyapi.com/api/';

    const getDataByOption = async (option) => {
        const res = await request({ url: `${_apiBase}${option}` });
        return res.data.results;
    };

    return {
        getDataByOption,
        loading
    };
};

export default useRickAndMortyService;