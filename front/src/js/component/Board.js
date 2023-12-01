import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../../css/Board.css";

const SERVER_URL = 'http://localhost:8090';

function Board({ BoardType }) {
    const [boardName, setBoardName] = useState('');
    const [post, setPost] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        { field: 'postNumber', headerName: '번호', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'postTitle', headerName: '제목', width: 500, headerAlign: 'center', align: 'center' },
        { field: 'postDate', headerName: '게시일', width: 150, headerAlign: 'center', align: 'center'},
        // { field: 'name', header: '작성자', width: 100, headerAlign:}
    ];

    const handleRowClick = (params) => {
        // 클릭한 행의 글 내용을 가져오기
        const selectedPost = post.find(p => p.postNo === params.id);
        setSelectedPost(selectedPost);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        // 게시판 이름 가져오기
        const fetchBrdName = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_divisions/${BoardType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoardName(data.brdName);
            } catch (error) {
                console.error('Error fetching brdName:', error);
            }
        };

        fetchBrdName();
    }, [BoardType]);

    useEffect(() => {
        // 게시글 목록 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/search/findByBrdNo?brdNo=brd_post/${BoardType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                setPost(data._embedded.brd_posts.map((post, index) => ({...post, postNumber: index + 1}))); //데이터가 없을 때 빈 배열 + 번호 추가
            } catch(err){
                console.error(err);
            }
        };

        fetchPost();
    }, [BoardType]);

    return (
        <div id="Board">
            <div className='background'>
                <div className="Board_title">
                    <h1>{boardName}</h1>
                </div>
                <div className="brd_post">
                    <DataGrid className='BoardList'
                        rows={post}
                        columns={columns} 
                        disableRowSelectionOnClick={true}
                        getRowId={row => row._links.self.href}
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>

            {/* Modal for displaying post details */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
                    <Typography variant="h6">{selectedPost?.postTitle}</Typography>
                    <Typography variant="body2">{selectedPost?.postSub}</Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Board;
