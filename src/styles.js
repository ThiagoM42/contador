import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Wrapper = styled.div`
    max-width:1100px;
    /* background-color:red; */
    margin:0 auto;
    margin-top:20px;
    display:grid;
    grid-template-columns:1fr 3fr;
`;

export const Container =styled.div`     
    & table{
        text-align:center;        
        margin-left:2rem;
        

        & input[type=text]{
            width:20rem; 
            border:none;
            border-bottom:1px solid #CCC;   
            font-weight:400;               
            font-size:1.25rem;

            & :focus, :hover{
                border:none!important;
            }
        }

        & input[type=number]{
            width:3rem;
            text-align:center;            
        }  
        
        & input[type=text], input[type=number]{
            height:1.8rem;            
        }
        & thead > tr{
            padding-bottom:18px !important;
        }
    }
`;

//import {MdAdd, MdDone, MdDoneAll, MdList } from 'react-icons/md';

