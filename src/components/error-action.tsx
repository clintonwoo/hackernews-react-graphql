import * as React from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal'
import "bootstrap/dist/css/bootstrap.min.css";

import useSound from 'use-sound';
import { useSoundContext } from '../context/state';

export interface IErrorActionProps {
  onCancel: any;
  onNotLoggedIn: boolean;
}

export function ErrorAction(props: IErrorActionProps): JSX.Element {
    const { onCancel, onNotLoggedIn } = props;
    const [show, setShow] = React.useState(onNotLoggedIn);
    const router = useRouter();

    React.useEffect(() => {
      setShow(onNotLoggedIn);
    }, [onNotLoggedIn]);
  
    const handleClose = () => {
      if(state) { playClick(); }
      setShow(false);
      onCancel();
    };

    const handleLogin = () => {
        if(state) { playClick(); }
        router.push(`/login?goto=${router.pathname}`);       
    }

    const { state } = useSoundContext();
    const [playClick] = useSound(
      '/click.mp3',
      { volume: 0.5 }
    );
  
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