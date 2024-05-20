import axios from 'axios'
import { useState, useEffect } from 'react';

const FavoriteBookComponent = ({ book, getFavoriteBooks }) => {
    const { title, author, notes, id } = book;

    const [noteText, setNoteText] = useState('');

    const [isEdit, setisEdit] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isShow, setIsShow] = useState(false)

    const addEditNote = async () => {
  
        await axios.post(`/api/books/addeditnote`, { id, notes: noteText });
        isAdd ? setIsAdd(false) : setisEdit(false)
        getFavoriteBooks();
    }

    const deleteFavorite = async (id) => {
        await axios.post(`/api/books/deletefavorite`, { id });
        getFavoriteBooks();
    }

    const onEditClick = () => {
        setisEdit(true);
        setNoteText(notes);
    }
    return (

        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                    <div className="position-relative">
                        <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={() => deleteFavorite(id)}><i className="bi bi-trash">
                        </i>
                        </button>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-truncate">{title}</h5>
                        <p className="card-text text-muted">by {author}</p>
                        <div className="mt-auto">
                            {!notes && <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setIsAdd(true)}>Add Note</button>}
                        </div>
                        <div className="mt-3">
                            {(isEdit || isAdd) && <>
                                <textarea className="form-control" rows="3" placeholder="Add your notes here..." value={noteText} onChange={e => setNoteText(e.target.value)}> </textarea>
                                <div className="d-flex justify-content-between mt-2">
                                    <button className="btn btn-success" onClick={addEditNote}>Save Note</button>
                                    <button className="btn btn-outline-secondary ms-2" onClick={() => isAdd ? setIsAdd(false) : setisEdit(false)}>Cancel</button>
                                </div></>
                            }
                            {notes && <div className="mt-auto">
                                <button className="btn btn-outline-primary w-100 mb-2" onClick={onEditClick}>Edit Note</button>
                                <button className="btn btn-outline-dark w-100" onClick={() => setIsShow(!isShow)}>{isShow ? 'Hide Note' : 'Show Note'}</button>
                            </div>}
                            {isShow &&
                                <div className="mt-3">
                                    <h6>Note</h6>
                                    <p>{notes}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default FavoriteBookComponent;