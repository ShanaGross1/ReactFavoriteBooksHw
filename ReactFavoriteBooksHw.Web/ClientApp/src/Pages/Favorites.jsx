import { useState, useEffect } from 'react';
import axios from 'axios';

import FavoriteBookComponent from '../components/FavoriteBookComponent';

const Favorites = () => {

    const [favoriteBooks, setFavoriteBooks] = useState([]);

    const getFavoriteBooks = async () => {
        const { data } = await axios.get(`/api/books/myfavorites`);
        setFavoriteBooks(data)
    }

    useEffect(() => {

        getFavoriteBooks();
    }, [])


    return (
        <div className="container mt-5">
            <div style={{ marginTop: 80 }} >
                <div className="container mt-5">
                    <h2 className="mb-4 text-primary">My Favorites</h2>
                    {favoriteBooks.map(book => (
                        <FavoriteBookComponent book={book} getFavoriteBooks={getFavoriteBooks} key={book.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favorites;





