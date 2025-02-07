import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiService";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';


const ManageUser=(prosp)=>{
    const LIMIT_USER= 3;
    const [pageCount, setPageCount]=useState(0);
    const [currentPage, setCurrentPage]=useState(1);
    const [showModalCreatUser, setShowModalCreatUser]=useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser]=useState(false);
    const [showModalViewUser, setShowModalViewUser]=useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser]=useState(false)
    const [dataUser, setDataUser] = useState({});
    const [dataUpdate, setDataUpdate]=useState({})
    const [dataDelete, setDataDelete] = useState({});

    const [listUser, setListUser]=useState([])
    useEffect(()=>{
        // fetchListUser();
        fetchListUserWithPaginate(1);
    },[]);
    const fetchListUser = async()=>{
        let res = await getAllUser();
        if(res.EC === 0){
            setListUser(res.DT)
        }
    }
    const fetchListUserWithPaginate = async(page)=>{
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if(res.EC === 0){
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }
    const handleClickBtnUpdate=(user)=>{
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }
    const resetUpdateData=()=>{
        setDataUpdate({});
    }
    const handleClickBtnView=(user)=>{
        setShowModalViewUser(true);
        setDataUser(user);
    }
    const resetViewData=(user)=>{
        setDataUser(user);
    }
    const handleClickBtnDelete=(user)=>{
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={()=>setShowModalCreatUser(true)}>
                        <FcPlus/> add user
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUser={listUser} handleClickBtnView={handleClickBtnView} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnDelete={handleClickBtnDelete}/> */}
                    <TableUserPaginate 
                        listUser={listUser} 
                        handleClickBtnView={handleClickBtnView} 
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete} 
                        fetchListUserWithPaginate={fetchListUserWithPaginate} 
                        pageCount={pageCount} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}/>
                </div>
                <ModalCreateUser
                 show={showModalCreatUser} 
                 setShow={setShowModalCreatUser}
                 fetchListUser={fetchListUser} 
                 fetchListUserWithPaginate={fetchListUserWithPaginate} 
                 currentPage={currentPage} 
                 setCurrentPage={setCurrentPage}/>
                <ModalUpdateUser 
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser} 
                    dataUpdate={dataUpdate} 
                    fetchListUser={fetchListUser} 
                    resetUpdateData={resetUpdateData} 
                    fetchListUserWithPaginate={fetchListUserWithPaginate} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}/>
                <ModalViewUser   
                    show={showModalViewUser} 
                    setShow={setShowModalViewUser} 
                    dataUser={dataUser} 
                    fetchListUser={fetchListUser} 
                    resetViewData={resetViewData} f
                    etchListUserWithPaginate={fetchListUserWithPaginate} 
                    currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                <ModalDeleteUser 
                    show={showModalDeleteUser} 
                    setShow={setShowModalDeleteUser} 
                    dataDelete={dataDelete} 
                    fetchListUser={fetchListUser} 
                    fetchListUserWithPaginate={fetchListUserWithPaginate} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}/>
            </div>
            
        </div>
    )
}

export default ManageUser;