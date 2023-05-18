import { useState, useEffect } from 'react';
// 4 - custom hook
export const useFetch = url => {
    const [dados, setDados] = useState(null);
    // 5 - refatorando o post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    // 6 - loading
    const [loading, setLoading] = useState(false);

    //7 - tratando erros
    const [error , setError] = useState(null);

    const [itemId, setItemId] = useState(null);

    const httpConfig = (dados, method) => {
        if (method === 'POST') {
            setConfig({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            setMethod(method);
        } else if (method === 'DELETE') {
            setConfig({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMethod(method);
            setItemId(dados);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            // 6 -loading
            setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setDados(json);
            } catch (error) {
                console.log(error.message);
                setError("Houve um erro ao carregar os dados");
            }
            setLoading(false);
        };
        fetchData();
    }, [url, callFetch]);

    // 5 - refatorando o post
    useEffect(() => {
        const httpRequest = async () => {
            let json;
            if (method === 'POST') {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                json = await res.json();
            } else if (method === 'DELETE') {
                const deleteUrl = `${url}/${itemId}`;
                const res = await fetch(deleteUrl, config);
                json = await res.json();
            }
            setCallFetch(json);
        };
        httpRequest();
    }, [config, method, url]);

    return { dados, httpConfig, loading, error };
};
