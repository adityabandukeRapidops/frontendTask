import Dropdown from 'react-bootstrap/Dropdown';
import './home.css';
import Sidebar from '../components/sidebar';
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


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
    const [styledCheckbox, setStyledCheckbox] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [file, setFile] = useState();
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');

    const htmlId = localStorage.getItem('htmlId');
    
    useEffect(() => {
        const fetchPageData = async () => {
            
            if (htmlId) {
                try {
                    const response = await axios.get(`http://localhost:8000/rapidops/api/htmlFile/HtmlbyId/${htmlId}`);
                    const data = response.data;
                    console.log(data)

                    setTitle(data.title);
                    setSubtext(data.subtext);
                    setContent(data.code);
                    setUrl(data.endPoint);
                    setAuthor(data.author);
                    setPublishDate(data.publishDate);
                    setPublishTime(data.publishTime);

                    // Additional logic to handle image preview if needed
                } catch (error) {
                    console.error('Error occurred:', error);
                }
            }
        };

        fetchPageData();
    }, []);
    // Function to handle file upload
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

    // Handle title change
    const handleTitleChange = (e) => {
        console.log(e.target.value)
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

        if(!htmlId){
            try {
                const response = await axios.post(`http://localhost:8000/rapidops/api/htmlFile/postCode?uid=${uid}`, formData, { headers: { authorization: token } });
                console.log(formData)
                console.log(response)
                console.log(response.data._id);
                localStorage.setItem('htmlId' , response.data._id)
                localStorage.setItem('htmlId' , response.data.newHtml._id)
    
                console.log(response.data, 'saved success');
                // You can handle success response here, such as redirecting to another page
            } catch (error) {
                console.error('Error occurred:', error);
                // You can handle error here, such as displaying an error message to the user
            }
        }else{
            try{
              
                
                console.log('Updated formData:', formData);

                console.log('htmlId is present so update it ')
                const response = await axios.patch(`http://localhost:8000/rapidops/api/htmlFile/updateHtmlFull/${htmlId}` , formData);

                console.log(response.data , 'updateData to same id')

                
            }catch(e){
                console.log('eroor')
            }   
        }
        
    };



    const handlePreviewOption = () => {
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

        setHtmlCode(htmlContent);
        setShowPreview(true);
    };


     // Handle publish date change
     const handlePublishDateChange = (e) => {
        setPublishDate(e.target.value);
    };

    // Handle publish time change
    const handlePublishTimeChange = (e) => {
        setPublishTime(e.target.value);
    };

    const handlePublishButtonClick = async() => {
        // Perform any actions you want here
        // For example, closing the modal
        // setShowModal(false); // Assuming setShowModal is a state variable controlling the modal's visibility
        console.log('lciked publish button');

        const htmlId = localStorage.getItem('htmlId')
        console.log(htmlId)

        console.log(publishDate , publishTime)
        
        const data = {
            publishDate : publishDate,
            publishTime : publishTime,
            status : "scheduled"
        }

        try {
            const response = await axios.patch(`http://localhost:8000/rapidops/api/htmlFile/updateHtml/${htmlId}`, data);

           
            console.log(response.data, 'update success');
            // localStorage.removeItem("htmlId");
            // navigate('/dashboard')

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
                                <Dropdown.Item href="#/action-1" onClick={handlePreviewOption}>preview</Dropdown.Item>
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
