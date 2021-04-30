import styled from 'styled-components';

export const Container = styled.div`
    font-size:1.1rem;
    display:grid;
    grid-template-rows: auto;    
    row-gap:40px;
    height:350px;    
    padding:6px;

    & >:nth-child(2){
        & label{
            /* font-weight:600; */
            font-size:1.1rem;
        }
        & input{
            font-size:0.8rem;
            font-style:italic;
        }
        & label > input[type='checkbox']{
            /* display:block;            
            width:100%; */
            /* & + span{
                font-weight:500!important;
                background-color:red;
            } */
        }

    }

    input[type='text'] {
        width: 100%;
        height:1.8rem;
    }        

    @media print{  
        display: none;
    }
`;