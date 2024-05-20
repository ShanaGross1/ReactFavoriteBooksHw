import axios from 'axios';
import { useState, useEffect } from 'react'
import { useAuthDataContext } from '../AuthContext';


const Search = () => {

    const [searchedText, setSearchedText] = useState('');
    const [results, setResults] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const { user } = useAuthDataContext();

    const getFavoriteBooks = async () => {
        const { data } = await axios.get(`/api/books/myfavorites`);
        setFavoriteBooks(data)
    }

    useEffect(() => {
        getFavoriteBooks();

    }, []);

    const removeFromFavorites = async (bookId) => {
        let id = favoriteBooks.filter(b => b.bookId === bookId)[0].id;
        await axios.post(`/api/books/deletefavorite`, { id });
        getFavoriteBooks();
    }

    const onSearchClick = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`/api/books/getresults?query=${searchedText}`);
        setResults(data);
    }

    const addToFavorites = async (b) => {
        const book = { title: b.title, author: b.author, notes: '', bookid: b.id }
        await axios.post('/api/books/addtofavorites', book)
        getFavoriteBooks();
    }

    return (

        <div className="container mt-5">
            <div style={{ marginTop: 80 }} >
                <div className="container mt-5">
                    <h2>Search for Books</h2>
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter book title, author, or ISBN" value={searchedText} onChange={e => setSearchedText(e.target.value)} />
                            <button onClick={onSearchClick} className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>
                    {results.map(book => (
                        <div key={book.id} className="col-md-4 mb-3">
                            <div className="card h-100">
                                <div className="d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">by {book.author}</p>
                                    {favoriteBooks.map(b => b.bookId).includes(book.id) && <button className="btn btn-danger mt-auto" onClick={() => removeFromFavorites(book.id)}>Remove from Favorites</button>}
                                    {(user && !favoriteBooks.map(b => b.bookId).includes(book.id)) && <button className="btn btn-success mt-auto" onClick={() => addToFavorites(book)}>Add to Favorites</button>}
                                    {!user && <button className="btn btn-success mt-auto" disabled >Sign in to add to Favorites</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Search;