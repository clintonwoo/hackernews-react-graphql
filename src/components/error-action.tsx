import * as React from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";

export function ErrorAction(): JSX.Element {

    const [show, setShow] = React.useState(true);

    const router = useRouter();
  
    const handleClose = () => setShow(false);

    const handleLogin = () => {
        router.push(`/login?goto=${router.pathname}`);       
    }
  
    return (
      <React.Fragment>
        <Modal show={show} onHide={handleClose} style={{fontFamily: "Verdana, Geneva, sans-serif", fontSize: "10pt"}}>    
          <Modal.Body>      
            <p>You have not logged in yet. Please login to continue!</p>
            <div className="float-right" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                <input type="submit" value="login" onClick={handleLogin} />
            </div>
            <div className="float-right mr-1" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                <input type="submit" value="cancel"  onClick={handleClose} />
            </div>            
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }