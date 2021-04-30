import styled from 'styled-components';

export const Wrapper = styled.div`
    /* max-width:1100px; */
    /* background-color:red; */
    margin:0 auto;
    /* margin-top:20px;
    display:grid;
    grid-template-columns:1fr 3fr; */
    @media(max-width: 768px) {
            margin-top:20px;
        }        
`;

export const Container =styled.div` 
    & >:nth-child(1){
        display:flex;
        justify-content:space-between;        
        padding-bottom:1.4rem;

        @media(max-width: 760px) {
            margin:2px 5px;
        }         
    }    
    & table{
        text-align:center;                
        
        & input[type=text]{
            width:100%; 
            border:none;
            border-bottom:1px solid #CCC;   
            font-weight:400;               
            font-size:1rem;
            outline:none;

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

    @media(max-width: 760px) {
        margin-top:50px;
    }     
`;


