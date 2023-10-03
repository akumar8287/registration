import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';

const Test = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [fdata, setFdata] = useState({
        name: '',
        email: '',
        identifier: '',
        role: '',
        password: '',
        cpassword: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);


    //get user data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3000/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    


    //export excel function
    const handleExportClick = () => {
        // Make a GET request to your export route using fetch
        fetch('http://localhost:3000/export')
            .then((response) => response.blob())
            .then((blob) => {
                // Trigger download of the Excel file
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'user_data.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
                // Handle error
            });
    };

    // Function to handle the creation of a new user
    const SendToBackend = () => {
        if (
            fdata.name === '' ||
            fdata.email === '' ||
            fdata.password === '' ||
            fdata.cpassword === '' ||
            fdata.role === '' ||
            fdata.identifier === ''
        ) {
            setError('All fields are required');
            return;
        } else {
            if (fdata.password !== fdata.cpassword) {
                setError('Password and Confirm Password must be the same');
                return;
            } else {
                // Send a POST request to your backend API
                fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(fdata),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message === 'User registered successfully') {
                            // Reset the form and show success message
                            setFdata({
                                name: '',
                                email: '',
                                identifier: '',
                                role: '',
                                password: '',
                                cpassword: '',
                            });
                            setSuccess(true);
                            setError(null);
                            // Reload the page after a short delay (you can adjust the delay time)
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000); // 1000 milliseconds (1 second)
                        } else if (data.error === 'Email is already in use') {
                            setError('Email is already in use');
                            setSuccess(false);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        setError('An error occurred while creating the user');
                        setSuccess(false);
                    });
            }
        }

    };

    //delete method
    const handleDeleteClick = async (_id) => {
        try {
            const response = await fetch(`http://localhost:3000/delete-user-record/${_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('Failed to delete record');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };





    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

                <a className="navbar-brand ps-3" href="index.html">Dashboard</a>

                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

                {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form> */}

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Login</a></li>
                            <li><a className="dropdown-item" href="#!">Register</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading"></div>
                                <Link className="nav-link collapsed" to="/dashboard">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </Link>
                                <div className="sb-sidenav-menu-heading text-left ml-3">Create New Entry</div>
                                <Link className='nav-link collapsed' to='/test'>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Add New User
                                </Link>

                                <div className="sb-sidenav-menu-heading text-left ml-3">Configuration</div>
                                <Link className="nav-link" to="/admin">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Users
                                </Link>

                                {/* <a className="nav-link " href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Configure Parking

                                </a> */}

                                <Link className="nav-link collapsed" to="/form">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Field Regions
                                </Link>

                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                            Super Admin
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h2 class="mt-4 text-left">Users</h2>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active"></li>
                            </ol>

                            <div class="row mb-4">
                                <div className="row ">
                                    <div className="col-md-6 col-lg-6">
                                        <input
                                            type="text"
                                            placeholder="Search tasks"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button onClick={handleSearch}>Search</button>
                                    </div>

                                    <div className="col-md-6 col-lg-6 text-end">
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-toggle="modal"
                                            data-target="#importdata"
                                        >
                                            Import
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-success ml-3"
                                            onClick={handleExportClick}
                                        >
                                            Export
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary ml-3"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                        >
                                            Add New User
                                        </button>

                                    </div>
                                </div>




                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog " role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Add Users</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="container2">
                                                <div className="s2">
                                                    {/* <h2 className="head1">Create New User</h2> */}
                                                    <div className="formgroup">
                                                        <label className="label text-left">Name</label>
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Enter Name"
                                                            value={fdata.name}
                                                            onChange={(e) => setFdata({ ...fdata, name: e.target.value })}
                                                            onFocus={() => setError(null)}
                                                        />
                                                    </div>
                                                    <div className="formgroup">
                                                        <label className="label text-left">Email</label>
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Enter Email"
                                                            value={fdata.email}
                                                            onChange={(e) => setFdata({ ...fdata, email: e.target.value.toLowerCase() })}
                                                            onFocus={() => setError(null)}
                                                        />
                                                    </div>
                                                    <div className="formgroup">
                                                        <label className="label text-left">Indentifier</label>
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Enter Indentifier"
                                                            value={fdata.identifier}
                                                            onChange={(e) => setFdata({ ...fdata, identifier: e.target.value })}
                                                            onFocus={() => setError(null)}
                                                        />
                                                    </div>
                                                    <div className="formgroup">
                                                        <label className="label text-left">Role</label>
                                                        <select
                                                            className="input"
                                                            value={fdata.role}
                                                            onChange={(e) => setFdata({ ...fdata, role: e.target.value })}
                                                            onFocus={() => setError(null)}
                                                        >
                                                            <option value="">Select a role</option> {/* Default placeholder with an empty value */}
                                                            <option value="Super Admin">Super Admin</option>
                                                            <option value="Allocator">Allocator</option>
                                                            {/* Add more roles as needed */}
                                                        </select>
                                                    </div>
                                                    <div className="formgroup">
                                                        <label className="label text-left">Password</label>
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Enter Password"
                                                            value={fdata.password}
                                                            onChange={(e) => setFdata({ ...fdata, password: e.target.value })}
                                                            onFocus={() => setError(null)}
                                                        />
                                                    </div>
                                                    <div className="formgroup">
                                                        <label className="label text-left">Confirm Password</label>
                                                        <input
                                                            className="input"
                                                            type="text"
                                                            placeholder="Enter Confirm Password"
                                                            value={fdata.cpassword}
                                                            onChange={(e) => setFdata({ ...fdata, cpassword: e.target.value })}
                                                            onFocus={() => setError(null)}
                                                        />
                                                    </div>
                                                    {error && <p className="errormessage">{error}</p>}
                                                    {success && <p className="successmessage">Form submitted successfully</p>}
                                                    <button
                                                        type='button'
                                                        className="button1"
                                                        onClick={SendToBackend}
                                                    >
                                                        Create User
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* import */}
                                <div class="modal fade" id="importdata" tabindex="-1" role="dialog"
                                    aria-labelledby="importdataLabel" aria-hidden="true">
                                    <div class="modal-dialog " role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="importdataLabel">Add Users</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="container2">
                                                <div className="s2">
                                                    <input
                                                        type="file"
                                                        accept=".xlsx, .xls"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <button onClick={() => document.querySelector('input[type="file"]').click()}>Select Excel File</button>

                                                    {error && <p className="errormessage">{error}</p>}
                                                    {success && <p className="successmessage">Excel submitted successfully</p>}

                                                    <button
                                                        type='button'
                                                        className="button1"
                                                        onClick={handleUpload}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Users
                                </div>
                                <div class="card-body">
                                    <table id="" class="cell-border display dataTable">
                                        <thead>
                                            <tr>
                                                <th className='text-center'> Name</th>
                                                <th className='text-center'>Email</th>
                                                <th className='text-center'>Indentifier</th>
                                                <th className='text-center'>Role</th>
                                                <th className='text-center'>Allocated Colonies</th>
                                                <th className='text-center'>Created On</th>


                                                <th className='text-center'>Edit</th>
                                                <th className='text-center'>Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.map((item) => (
                                                <tr key={item._id}>
                                                    <td >{item.name}</td>
                                                    <td >{item.email}</td>
                                                    <td >{item.identifier}</td>
                                                    <td >{item.role}</td>
                                                    <td >{item.address}</td>
                                                    <td >{item.created_at}</td>

                                                    <td ><Link to={`/edit/${item._id}`}>
                                                        <button class="btn">
                                                            <i class="fa fa-pencil"></i>
                                                        </button>
                                                    </Link></td>
                                                    <td ><button class="btn" onClick={() => handleDeleteClick(item._id)}><i class="fa fa-trash"></i></button></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                        <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                                marginPagesDisplayed={2}

                                containerClassName="pagination justify-content-center"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                forcePage={currentPage.current - 1}
                            />
                                    </table>
                                </div>


                            </div>


                        </div>


                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Test