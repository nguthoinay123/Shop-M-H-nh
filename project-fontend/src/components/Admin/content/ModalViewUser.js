import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateNewUser,putUpdateUser } from '../../../services/apiService';
import _ from "lodash";

const ModalViewUser=(props)=> {
  const {show, setShow, dataUser}=props;
  const handleClose = () =>{
     setShow(false)
     setEmail("");
     setUsername("");
     setRole("USER");
     setImage("");
     setPreviewImage("");
     props.resetViewData();
    }
  ;
  const [email, setEmail]=useState("");
  const [username, setUsername]=useState("");
  const [role, setRole]=useState("USER");
  const [image, setImage]=useState("");
  const [previewImage, setPreviewImage]=useState("");

  useEffect(()=>{
    if(!_.isEmpty(dataUser)){
        setEmail(dataUser.email);
        setUsername(dataUser.username);
        setRole(dataUser.role);
        setImage("");
        if(dataUser.image){
            setPreviewImage(`data:image/jpeg;base64,${dataUser.image}`);
        }
      
    }
  },[props.dataUser]);



  return (
    <>
  
      <Modal show={show} onHide={handleClose} animation={false} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(event)=>setEmail(event.target.value)} disabled/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(event)=>setUsername(event.target.value)} disabled/>
            </div>
            <div className="col-md-4">
                <label className="form-label">Role</label>
                
                <input type="text" className="form-control" value={role} onChange={(event)=>setRole(event.target.value)} disabled/>

            </div>
          
            <div className='col-md-12 img-preview' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {previewImage ? (
                    <img src={previewImage} style={{ width: '50%' , height:'300px'}} alt="Preview" />
                ) : (
                    <span>Preview image</span>
                )}
            </div>


           
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
}

export default ModalViewUser;