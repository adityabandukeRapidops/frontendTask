import Dropdown from 'react-bootstrap/Dropdown';
import './home.css';
import Sidebar from '../components/sidebar';
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios'

const Home = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState('');
    const [subtext, setSubtext] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [styledCheckbox, setStyledCheckbox] = useState(false);

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

    // Handle title change
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Handle subtext change
    const handleSubtextChange = (e) => {
        setSubtext(e.target.value);
    };

    // Handle URL change
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    // Handle author change
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    // Handle styled checkbox change
    const handleStyledCheckboxChange = (e) => {
        setStyledCheckbox(e.target.checked);
    };



    // Handle save button click
    const handleSaveButtonClick = async () => {
        // Dummy HTML structure
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
            </head>
            <body>
                <h1>${title}</h1>
                <p>${subtext}</p>
                ${content}
                
            </body>
            </html>
        `;

        console.log("Generated HTML:", htmlContent);

        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token')

        console.log(token, 'coming in homePage')
        const data = {
            title: title,
            subtext: subtext,
            code: htmlContent,
            endPoint: url,
            status: "draft",


        }
        console.log(data.code)
        // console.log(token , '')

        try {
            const response = await axios.post(`http://localhost:8000/rapidops/api/htmlFile/postCode?uid=${uid}`, data, { headers: { authorization: token } });

            console.log(response.data, 'saved success');
            // You can handle success response here, such as redirecting to another page
        } catch (error) {
            console.error('Error occurred:', error);
            // You can handle error here, such as displaying an error message to the user
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
                                <Dropdown.Item href="#/action-1">preview</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button type="button" className="navButton cancelButton">Cancel</button>
                        <button type="button" className="navButton saveButton" onClick={handleSaveButtonClick}>Save</button>


                        <button type="button" className="navButton publishButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Publish</button>





                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header bg-dark text-white">
                                        <h5 class="modal-title" id="exampleModalLabel">Publish</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                    </div>
                                    <div class="modal-body">

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='mainContentWrapper'>
                    <div className='formContainer'>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="" placeholder="Enter Title" value={title} onChange={handleTitleChange} />
                            </div>
                            <div className="form-group">
                                <label>Subtext</label>
                                <input type="text" className="form-control" id="subtext" placeholder="Enter Subtext" value={subtext} onChange={handleSubtextChange} />
                            </div>

                        </form>
                        <label htmlFor="">Body</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => { }}
                        />
                        <div className='attachmentContainer'>
                            <div className='attachmentHeader'>
                                Attachments
                            </div>
                            <div className='attachmentPreview'>
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
                                <label htmlFor="titleInput">*Url</label>
                                <input type="text" className="form-control" id="titleInput" placeholder="Title" value={url} onChange={handleUrlChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtextInput">Author</label>
                                <input type="text" className="form-control" id="subtextInput" placeholder="Subtext" value={author} onChange={handleAuthorChange} />
                            </div>
                        </div>

                        <div className="checkboxContainer">
                            <input type="checkbox" id="styled-checkbox" className="styled-checkbox" checked={styledCheckbox} onChange={handleStyledCheckboxChange} />
                            <label htmlFor="styled-checkbox" className="checkbox-label">Styled Checkbox</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
