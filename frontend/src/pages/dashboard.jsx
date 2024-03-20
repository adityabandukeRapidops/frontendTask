import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import './dashboard.css';
import {useNavigate} from 'react-router-dom'
import dashboard from '../assets/Group.png'

const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedUser, setSelectedUser] = useState('All');
    const [userOptions, setUserOptions] = useState([]);
    const [key, setKey] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        const fetchTableData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/rapidops/api/htmlFile/getHtmlbyfilter?status=${statusFilter}&user=${selectedUser}`);
                console.log(selectedUser, statusFilter)
                setTableData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };
        console.log(key)

        fetchTableData();
    }, [statusFilter, selectedUser,key]);


    

    

    useEffect(() => {
        const html = localStorage.getItem('htmlId');
        if(html){
            localStorage.removeItem('htmlId')

        }
        const uid = localStorage.getItem('uid');
        if(!uid){
          navigate('/login')  
        }
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/rapidops/api/users/getAllUsers');
                setUserOptions(response.data);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filteredTableData = tableData.filter((row) =>
    Object.values(row).some(
        (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
    )
);


    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const getStatusColorClass = (status) => {
        switch (status) {
            case 'draft':
                return 'status-draft';
            case 'published':
                return 'status-published';
            case 'scheduled':
                return 'status-scheduled';
            default:
                return ''; // No specific class for other status values
        }
    };
    
    const handleDeleteRow = async (rowId) => {
        console.log(rowId)
        try {
            const deleteHtml = await axios.delete(`http://localhost:8000/rapidops/api/htmlFile/deleteHtml/${rowId}`);
            console.log(deleteHtml)

            const updatedTableData = tableData.filter(row => row.id !== rowId);
            setTableData(updatedTableData);
            setKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };



    const handleEditRow = (rowId) => {
        // Redirect to the edit page for the selected row or call edit API
        localStorage.setItem('htmlId' , rowId)
        
        navigate('/homePage')
        console.log('Editing row:', rowId);

    };

    return (
        <div className='dashboardContainer'>
            <Sidebar />
            <div className='content'>
                <div className='navBar' style={{border:'1px solid #E5E7EB'}}>
                    <div className='leftSideItems'>
                        <div>logo</div>
                        <div className='left'>
                        <span class="h4 font-weight-bold">Pages</span>

                        <span>create and publish pages</span>
                        </div>
                    </div>
                    <div className='rightSideItems'>
                        <button type="button" className="publishButton" onClick={()=>{
                                    navigate('/homePage')

                        }}>+ Add Page</button>
                    </div>
                </div>

                <div className='mainContent'>
                    <div className='searchRow'>
                    <input
                            type="text"
                            placeholder="Search..."
                            className="search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <span>Entries: {tableData.length}</span>
                        <select value={statusFilter} onChange={handleStatusChange}>
                            <option value="All">All</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="scheduled">Scheduled</option>
                        </select>
                        <select value={selectedUser} onChange={handleUserChange}>
                            <option value="All">All Users</option>
                            {userOptions.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='tableWrapper'>
                        <table className='dashboardTable'>
                            <thead className='bg-white' >
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Modified By</th>
                                    <th scope="col">Modified At</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTableData.map((row, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='tdtitle'>
                                            <div>
                                                {row.title}
                                            </div>
                                            <div class="dropdown" style={{display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                                                <button class="btn " type="button" id={`dropdownMenuButton-${index}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    ...
                                                </button>
                                                <div class="dropdown-menu"  aria-labelledby={`dropdownMenuButton-${index}`}>
                                                    <a class="dropdown-item" href="#" onClick={() => handleDeleteRow(row._id)} style={{color : 'red'}}>delete</a>
                                                    <a class="dropdown-item" href="#" onClick={() => handleEditRow(row._id)}>edit</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td><a href={`http://localhost:8000/rapidops/api/htmlFile/getCode/${row.endPoint}`}>{row.endPoint}</a></td>
                                        <td>{row.createdBy}</td>
                                        <td>{row.createdAt}</td>
                                        <td>{row.modifiedBy}</td>
                                        <td>{row.modifiedAt}</td>
                                        <td className={getStatusColorClass(row.status)}>{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
