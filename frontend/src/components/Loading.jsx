import styled from 'styled-components'

const Loading = () => {
  return(
    <LoadingStyled>
        <div className="font-bold text-blue-800 text-2xl">Loading...</div>
        <div className="dot-container">
           <div className="dot"></div>
           <div className="dot"></div>
           <div className="dot"></div>
           <div className="dot"></div>
        </div>
    </LoadingStyled>
  )
}

export default Loading

const LoadingStyled = styled.div`
    .dot-container{
        display: flex;
        align-items: center;
        border: 1px;
        height: 2rem;
        width: fit-content;
    }
    .dot{
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        animation:pulse 1.2s ease-in-out infinite;
        margin: 3px;
    }
    @keyframes pulse {
        0%{
            background-color: #0000ff52;
        }
        50%{
            background-color: blue;
        }
        0%{
            background-color: #0000ff52;
        }
    }

    .dot:nth-child(1){
        animation-delay:0.2s ;
    }
    .dot:nth-child(2){
        animation-delay:0.4s ;
    }
    .dot:nth-child(3){
        animation-delay:0.6s ;
    }
    .dot:nth-child(1){
        animation-delay:0.8 ;
    }
`