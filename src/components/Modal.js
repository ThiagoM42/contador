import React from 'react';
import style from './modal.module.css';
import ModalSemDados from './ModalSemDados';

function Modal({dados}){    
    return (
        <div className={style.modal}>            
            {!dados.length && <ModalSemDados/>}
            <ul>
                {dados.map((dado, index)=>(
                    <>
                    <li key={index}>{dado}</li>                  
                        <br/>
                    </>
                ))}
            </ul>

        </div>
    )        
}

export default Modal;