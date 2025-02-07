import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';

const ModalDeleteUser=(props)=> {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmitDeleteUser=async()=>{
    let data = await deleteUser(dataDelete.id)
    if(data && data.EC===0){
      toast.success(data.EM)
      handleClose()
      // await props.fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    }
    if(data && data.EC!==0){
      toast.error(data.EM)
      
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}  backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the user ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user. Email= <b>{dataDelete&&dataDelete.email?dataDelete.email :""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{handleSubmitDeleteUser()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;