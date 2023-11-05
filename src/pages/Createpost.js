import { useState } from 'react';
import Api from '../components/Api';

export default function Createpost() {
    const { http } = Api();
    const [title, setTitle] = useState('');
    const [errortitle, setTitleerror] = useState('');
    const [content, setContent] = useState('');
    const [errorcontent, setContenterror] = useState('');
    const [loader, setLoader] = useState('off');
    const [notification, setNotification] = useState('');

    const clearFields = () => {
        setTitle('');
        setContent('');
    };

    const submitform = () => {
        setLoader('on');
        http.post('/createpost', { title: title, content: content })
            .then((res) => {
                if (res.data.status === '422') {
                    setTitleerror(res.data.error.title ? res.data.error.title[0] : '');
                    setContenterror(res.data.error.content ? res.data.error.content[0] : '');
                } else if (res.data.status === '200') {
                    setTitleerror('');
                    setContenterror('');
                    setNotification('Publish successful');
                    clearFields(); // Clear input fields

                    // Clear the notification after a few seconds (e.g., 3 seconds)
                    setTimeout(() => {
                        setNotification('');
                    }, 3000);
                }
                setLoader('off');
            })
            .catch((error) => {
                console.error(error);
                setLoader('off');
            });
    };

    return (
        <>
            <div className="container mt-5">
                <h3 className="text-center">Create Post</h3>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Title"
                    />
                    <span className='text-danger'>{errortitle}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        rows="3"
                    ></textarea>
                    <span className='text-danger'>{errorcontent}</span>
                </div>
                <button
                    type="button"
                    onClick={submitform}
                    className="btn btn-primary"
                >
                    {loader === 'off' && <span>Publish</span>}
                    {loader === 'on' && (
                        <center>
                            <div className="spinner-border spinner-border-sm" role="status"></div>
                        </center>
                    )}
                </button>
                {notification && (
                    <div className="alert alert-success mt-3">{notification}</div>
                )}
            </div>
        </>
    );
}