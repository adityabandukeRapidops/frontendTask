import Dropdown from 'react-bootstrap/Dropdown';
import './home.css';
import Sidebar from '../components/sidebar';
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const Home = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='mainWrapper'>
            <Sidebar />
            <div className='contentWrapper'>
                <div className='headerSection'>
                    <div className='leftContent'>
                        <span>lo</span>
                        <span>Home Page</span>
                        <span>draft</span>
                    </div>
                    <div className='rightContent'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button type="button" className="navButton cancelButton">Cancel</button>
                        <button type="button" className="navButton saveButton">Save</button>
                        <button type="button" className="navButton publishButton">Publish</button>
                    </div>
                </div>

                <div className='mainContentWrapper'>
                    <div className='formContainer'>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                        </form>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => { }}
                        />
                        {/* <div className='attachmentContainer'>
                            <div className='attachmentHeader'>
                                Attachments
                            </div>
                            <div className='attachmentPreview'>
                                <input type="file" accept="image/*" />
                            </div>
                        </div> */}

                        <div className='attachment'>
                            <div className='attachmentheading'>
                                Attachments
                            </div>
                            <div className='showpreviewimage'>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" style={{ width: '30%', height: 'auto' }} />
                                )}
                                <input type="file" accept="image/*" onChange={handleFileUpload} />
                            </div>
                            <p>Supported files: JPEG. PNG. PDF. DOC. XLX. PPT.</p>
                        </div>
                    </div>
                    <div className='sideWrapper'>
                        <div className="inputFields">
                            <div className="form-group">
                                <label htmlFor="titleInput">Title</label>
                                <input type="text" className="form-control" id="titleInput" placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtextInput">Subtext</label>
                                <input type="text" className="form-control" id="subtextInput" placeholder="Subtext" />
                            </div>
                        </div>

                        <div className="checkboxContainer">
                            <input type="checkbox" id="styled-checkbox" className="styled-checkbox" />
                            <label htmlFor="styled-checkbox" className="checkbox-label">Styled Checkbox</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
