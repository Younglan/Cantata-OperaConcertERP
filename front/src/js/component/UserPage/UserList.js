import "./UserList.css";
import { IconButton, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";


const UserList = () => {
    const [ memList, setMemList] = useState([]);
    const [open, setOpen] = useState(false);
    const columns = [
        {field: 'auth', headerName: '구분', width: 150},
        {field: 'id', headerName: '아이디', width: 200},
        {field: 'username', headerName: '이름', width: 150},
        {field: 'email', headerName: '메일 주소', width: 400},
        {field: 'join_date', headerName: '가입일', width: 200},
        {field: 'recent_date', headerName: '최근 접속일', width: 200},
        {
          field: 'row.id',
          headerName: '탈퇴',
          sortable: false,
          filterable: false,
          renderCell: row =>
              <IconButton className="userListIconButton"
                  onClick={() => onDelClick(row.id)}>
                      <DeleteIcon color="error"/>
              </IconButton>
      }
    ];

    const getMemList = async() => {
        const token = sessionStorage.getItem("jwt");
        
        fetch(`http://localhost:8090/admin/member`, {
            headers: { 'Authorization' : token}
        })
        .then(response => response.json())
        .then(data => setMemList(data))
        .catch(err => console.error(err));     
    }

    const onDelClick = (id) => {
      if(window.confirm("회원 강제 탈퇴를 진행합니까?")) {
          const token = sessionStorage.getItem("jwt");
          fetch(`http://localhost:8090/admin/remove/?id=${id}`, {method: 'DELETE',
                      headers: {'Authorization' : token}
                  })
          .then(response => {
              if(response.ok){
                  getMemList();
                  setOpen(true);
              }
              else{
                  alert('Something went wrong!');
              }
              
          })
          .catch(err => console.error(err))
      } 
    }

  

    useEffect(() => {
        getMemList();
    }, []);
    
    
    
   

    return(
        <React.Fragment>    
            <div style={{ height: 500, width: '100%'}}>
                <DataGrid
                    rows={memList}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.id}
                   
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car deleted"
                />
            </div>
        </React.Fragment> 
    );
}

export default UserList;
