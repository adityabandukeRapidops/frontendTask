import Dropdown from 'react-bootstrap/Dropdown';
import './home.css';
import Sidebar from '../components/sidebar';
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const config = {
    readonly: false,
    buttons: [
        'bold', 'italic', 'underline', '|',
        'ul', 'ol', '|',
        'outdent', 'indent', '|',
        'font', 'fontsize', 'brush', 'paragraph', '|',
        'align', '|',
        'undo', 'redo', '|',
        'hr', 'eraser', 'fullsize', 'image'
    ],
    uploader: {
        insertImageAsBase64URI: true, // Configures Jodit to insert images as Base64
    },
};
const Home = () => {
    const navigate = useNavigate();

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState('');
    const [subtext, setSubtext] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [showAuthor, setShowAuthor] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [file, setFile] = useState();
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [authorEmail, setAuthorEmail] = useState('')

    const htmlId = localStorage.getItem('htmlId');
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const fetchPageData = async () => {

            if (!uid) {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    navigate('/login')
                }
            }

            if (htmlId) {
                try {
                    const response = await axios.get(`http://localhost:8000/rapidops/api/htmlFile/HtmlbyId/${htmlId}`);
                    const data = response.data;
                    console.log(data)

                    setTitle(data.title);
                    setSubtext(data.subtext);
                    setContent(data.code);
                    setUrl(data.endPoint);
                    setAuthor(data.createdBy);
                    setPublishDate(data.publishDate);
                    setPublishTime(data.publishTime);

                    // Additional logic to handle image preview if needed
                } catch (error) {
                    console.error('Error occurred:', error);
                }
            }

            if (uid) {
                try {
                    const response = await axios.get(`http://localhost:8000/rapidops/api/users/getUser/${uid}`)

                    console.log(response.data, 'userdata')

                    setAuthor(response.data.name);
                    setAuthorEmail(response.data.email);
                } catch (e) {
                    console.log('some error occured')
                }
            }


        };

        fetchPageData();
    }, []);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file)
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTitleChange = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value);
    };

    const handleSubtextChange = (e) => {
        setSubtext(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleShowAuthor = (e) => {

        setShowAuthor(e.target.checked);
        console.log(showAuthor)
    };



    const handleSaveButtonClick = async () => {
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

        console.log(file)
        const formData = new FormData();

        // Append other form data fields
        formData.append('title', title);
        formData.append('subtext', subtext);
        formData.append('code', htmlContent);
        formData.append('endPoint', url);
        formData.append('status', 'draft');

        // Check if a file is provided
        if (file) {
            formData.append('file', file);
        }
        // const data = {
        //     title: title,
        //     subtext: subtext,
        //     code: htmlContent,
        //     endPoint: url,
        //     status: "draft",

        // }
        // console.log(data)
        // console.log(token , '')

        console.log(formData)
        const htmlId = localStorage.getItem('htmlId');
        console.log(htmlId);

        if (!htmlId) {
            try {
                const response = await axios.post(`http://localhost:8000/rapidops/api/htmlFile/postCode?uid=${uid}`, formData, { headers: { authorization: token } });
                console.log(formData)
                console.log(response)
                console.log(response.data._id);
                localStorage.setItem('htmlId', response.data._id)
                localStorage.setItem('htmlId', response.data.newHtml._id)

                console.log(response.data, 'saved success');
                // You can handle success response here, such as redirecting to another page
            } catch (error) {
                console.error('Error occurred:', error);
                // You can handle error here, such as displaying an error message to the user
            }
        } else {
            try {
                formData.append('modifiedBy', author);
                formData.append('modifiedAt', Date.now());

                console.log('Updated formData:', formData);

                console.log('htmlId is present so update it ')
                const response = await axios.patch(`http://localhost:8000/rapidops/api/htmlFile/updateHtmlFull/${htmlId}`, formData);

                console.log(response.data, 'updateData to same id')


            } catch (e) {
                console.log('eroor')
            }
        }

    };



    const handlePreviewOption = () => {
        let htmlContent = `
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
        console.log(file)
        if (file) {
            const fileLink = `<a href="file" download="file">DownloadFile</a>`;
            htmlContent = htmlContent.replace('</body>', `${fileLink}</body>`);
        }

        setHtmlCode(htmlContent);
        setShowPreview(true);
    };


    const handlePublishDateChange = (e) => {
        setPublishDate(e.target.value);
    };

    const handlePublishTimeChange = (e) => {
        setPublishTime(e.target.value);
    };

    const handlePublishButtonClick = async () => {

        console.log('lciked publish button');

        const htmlId = localStorage.getItem('htmlId')
        console.log(htmlId)

        console.log(publishDate, publishTime)

        const data = {
            publishDate: publishDate,
            publishTime: publishTime,
            status: "scheduled"
        }

        try {
            const response = await axios.patch(`http://localhost:8000/rapidops/api/htmlFile/updateHtml/${htmlId}`, data);


            console.log(response.data, 'update success');
            localStorage.removeItem("htmlId");
            navigate('/dashboard')

        } catch (error) {
            console.error('Error occurred:', error);
        }


    };

    return (
        <div className='mainWrapper'>
            <Sidebar />
            <div className='contentWrapper'>
                <div className='headerSection'>
                    <div className='leftContent'>
                        <span></span>
                        <span class="h4 font-weight-bold">Home Page</span>
                        <span style={{ color: '#D97706' }}>draft</span>
                    </div>
                    <div className='rightContent'>
                        <Dropdown>
                            <Dropdown.Toggle variant="" style={{ border: '1px solid black' }} id="">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" onClick={handlePreviewOption}>preview</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" style={{ color: 'red' }}>delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button type="button" className="navButton cancelButton" style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
                            onClick={() => {
                                navigate('/dashboard ')
                            }}>Cancel</button>
                        <button type="button" className="navButton saveButton" onClick={handleSaveButtonClick} style={{ backgroundColor: '#4F46E5' }}>Save</button>


                        <button type="button" className="navButton publishButton" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: '#059669' }}>Publish</button>





                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header bg-dark text-white">
                                        <h5 class="modal-title" id="exampleModalLabel">Publish</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label for="">Publish Date</label>
                                                <input type="date" class="form-control" placeholder="Enter Publish Date" onChange={handlePublishDateChange} />

                                            </div>
                                            <div class="form-group">
                                                <label for="">Publish Time</label>
                                                <input type="time" class="form-control" placeholder="Enter Publish Time" onChange={handlePublishTimeChange} />
                                            </div>

                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                                        <button type="button" class="btn btn-primary" onClick={handlePublishButtonClick} data-bs-dismiss="modal">Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='mainContentWrapper'>

                    {!showPreview ? (
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
                                config={config}
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
                    ) : (
                        <>
                            <h1>showing preview</h1>
                            <div className='formContainer' dangerouslySetInnerHTML={{ __html: htmlCode }}></div>
                        </>
                    )}
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
                            <input type="checkbox" id="styled-checkbox" className="styled-checkbox" checked={showAuthor} onChange={handleShowAuthor} />
                            <label htmlFor="styled-checkbox" className="checkbox-label">Show Author</label>
                        </div>

                        {showAuthor && (
                            <div className="author-info">
                                <p>Author: {author}</p>
                                <p>Email: {authorEmail}</p>
                                <p>Website: www.example.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
