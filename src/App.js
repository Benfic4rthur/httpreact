import './App.css';
import { useState, useEffect } from 'react';
// 4 - custom hook
import { useFetch } from './hooks/useFetch';
const url = 'http://localhost:3000/products';

function App() {
    const [products, setProducts] = useState([]); // array de objetos
    // 4 - custom hook
    const { dados: items, httpConfig, loading, error } = useFetch(url);
    const [name, setName] = useState(''); // array de objetos (string)
    const [price, setPrice] = useState(''); // array de objetos (number)

    // 1 - resgatando dados
    /* useEffect(() => {
    // executa uma função quando o componente é montado
    async function fetchData() {
      // função assincrona
      const res = await fetch(url); // faz a requisição
      const data = await res.json(); // transforma a requisição em json
      setProducts(data); // atualiza o array de objetos
    }
    fetchData(); // executa a função
  }, []); // executa uma função quando o componente é montado
*/
    // 2 - Add produtos
    const handleSubmit = async e => {
        // função assincrona
        e.preventDefault(); // evita o comportamento padrão do navegador
        const product = { name, price }; // objeto
        /*const res = await fetch(url, {
      // requisição
      method: 'POST', // método de requisição (POST, PUT, DELETE)
      headers: {
        // cabeçalhos de requisição (json)
        'Content-Type': 'application/json', // tipo de conteúdo (json)
      },
      body: JSON.stringify(product), // corpo da requisição (json)
    }); 

    // 3 - carregamento dinamico forma professor
    const addProducts = await res.json();
    setProducts(prevProducts => [...prevProducts, addProducts]);*/
        // 5 - REFATORANDO POST
        httpConfig(product, 'POST');

        // resetando campos
        setName('');
        setPrice('');

        // forma bot pair
        /*
      useEffect(() => {
    // executa uma função quando o componente é montado
    async function fetchData() {
      // função assincrona
      const res = await fetch(url); // faz a requisição
      const data = await res.json(); // transforma a requisição em json
      setProducts(data); // atualiza o array de objetos
    }
    fetchData(); // executa a função
  });
    */
    };

    const handleRemove = async id => {
      httpConfig(id, 'DELETE');
    }

    return (
        <div className='App'>
            <h1>Lista de produtos</h1>
            {/* 6 - loading */}
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!error && (
                <ol>
                    {items &&
                        items.map(product => (
                            <li key={product.id}>
                                {product.name} - R$:{product.price} <button onClick={() => handleRemove(product.id)}>Excluir</button>
                            </li>
                        ))}
                </ol>
            )}
            <br />
            <div className='addProducts'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type='text'
                            value={name}
                            name='name'
                            onChange={e => setName(e.target.value)}
                        />
                        Preço:
                        <input
                            type='text'
                            value={price}
                            name='price'
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    {/* 7 -loading no post */}
                    {loading && <input type='submit' value='Aguarde...' disabled />}
                    {!loading && <input type='submit' value='Adicionar' />}
                </form>
            </div>
        </div>
    );
}

export default App;
