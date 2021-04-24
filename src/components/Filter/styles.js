import styled from 'styled-components';

export const Container = styled.div`
    font-size:1.1rem;
    display:grid;
    grid-template-rows: auto;    
    row-gap:40px;
    height:100px;    
    input[type='text'] {
        width: 100%;
        height:1.8rem;
    }        

@media print{  
    display: none;
}
`;