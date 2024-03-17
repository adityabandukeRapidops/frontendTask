import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedUser, setSelectedUser] = useState('All');
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/rapidops/api/htmlFile/getHtmlbyfilter?status=${statusFilter}&user=${selectedUser}`);
                console.log(selectedUser, statusFilter)
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchTableData();
    }, [statusFilter, selectedUser,tableData]);

    

    useEffect(() => {
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

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleDeleteRow = async (rowId) => {
        console.log(rowId)
        try {
            const deleteHtml = await axios.delete(`http://localhost:8000/rapidops/api/htmlFile/deleteHtml/${rowId}`);
            console.log(deleteHtml)

            const updatedTableData = tableData.filter(row => row.id !== rowId);
            setTableData(updatedTableData);
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    const handleEditRow = (rowId) => {
        // Redirect to the edit page for the selected row or call edit API
        console.log('Editing row:', rowId);
    };

    return (
        <div className='dashboardContainer'>
            <Sidebar />
            <div className='content'>
                <div className='navBar'>
                    <div className='leftSideItems'>
                        <span>lo</span>
                        <span>Home Page</span>
                        <span>draft</span>
                    </div>
                    <div className='rightSideItems'>
                        <button type="button" className="publishButton">Publish</button>
                    </div>
                </div>

                <div className='mainContent'>
                    <div className='searchRow'>
                        <input type="text" placeholder="Search..." />
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
                            <thead>
                                <tr>
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
                                {tableData.map((row, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='tdtitle'>
                                            <div>
                                                {row.title}
                                            </div>
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton-${index}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    ...
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                                    <a class="dropdown-item" href="#" onClick={() => handleDeleteRow(row._id)}>delete</a>
                                                    <a class="dropdown-item" href="#" onClick={() => handleEditRow(row._id)}>edit</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{row.endPoint}</td>
                                        <td>{row.createdBy}</td>
                                        <td>{row.createdAt}</td>
                                        <td>{row.modifiedBy}</td>
                                        <td>{row.modifiedAt}</td>
                                        <td>{row.status}</td>
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
