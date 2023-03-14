import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import {Table, TableHead, TableCell, TableRow, TableBody, styled } from "@mui/material";

export default function AdminHome({ userData }) {
    const [data, setData] = useState([]);
    const [limit,setLimit]=useState(5);
  const [pageCount,setPageCount]=useState(1);
  const currentPage = useRef(1);

    const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px auto 0 auto;
  `
  
  const THead = styled(TableRow)`
    background: purple;
    & > th {
      color: white;
      font-size: 15px;
    }
  `
  useEffect(() => {
    currentPage.current=1;
    // getAllUser();
    getPaginatedUsers();
  }, []);

useEffect (() => {
    fetch("http://localhost:8000/getAllUser", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "User Data");
        setData(data.data);
    });
}, []);

function handlePageClick(e) {
    console.log(e)
    currentPage.current=e.selected+1;
    getPaginatedUsers();
}

// function changeLimit(){
//   currentPage.current=1;
//   getPaginatedUsers();
// }

function getPaginatedUsers(){
  fetch(`http://localhost:8000/paginatedUser?page=${currentPage.current}&limit=${limit}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setPageCount(data.pageCount);
      setData(data.result)
      
     
    });

}

    const logOut = () => {
        window.localStorage.clear();
        window.location.href="./sign-in";
    }
    return(
      <>
        {/* // <div className="auth-wrapper"> */}
            {/* <div className="auth-inner" style={{ width: "auto" }}> */}
            <Table>
      <TableHead>
        <THead>
          <TableCell>Name</TableCell>
          <TableCell>UserName</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Lacality</TableCell>
          <TableCell>User Type</TableCell>
        </THead>
        </TableHead>
        
        {data.map((i) => {
            return(
                <TableBody>
                    <TableRow>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.username}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell>{i.mobileNo}</TableCell>
              <TableCell>{i.locality}</TableCell>
              <TableCell>{i.userType}</TableCell>
            </TableRow>
                </TableBody>
            )
        })}

      </Table>

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
      />
      
            <button onClick={logOut} className="btn btn-primary">Logout</button>
            {/* // </div>
            // </div> */}
            </>
    )
}
