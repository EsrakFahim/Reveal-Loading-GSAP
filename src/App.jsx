import { gsap, CSSPlugin, Expo } from 'gsap';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


gsap.registerPlugin(CSSPlugin);

const App = () => {
  const [counter, setCounter] = useState(0);


  useEffect(() => {
    const count = setInterval(() => {
      setCounter(
        (counter) => (
          counter < 100 ? counter + 14 : clearInterval(count), setCounter(100)
        )
      )
    }, 25);
  }, [])




  return (
    <React.Fragment>
      <AppContainer>
        <Loading>
          <Follow className='follow'></Follow>
          <ProgressBar className='hide' style={{ width: counter + '%' }} >
          </ProgressBar>
          <Count className='hide'>{counter}%</Count>
        </Loading>

        <Content>
          <p className='title-line'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className='title-line'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className='title-line'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className='title-line'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </Content>


      </AppContainer>
    </React.Fragment>
  );
};

export default App;




const AppContainer = styled.div`
      width:100vw;
      height:100vh;
      background:transparent;
      position;relative;
      text-align:center;
      color:#999;
`

const Loading = styled.div`
    height:100%;
    width:100%;
    background:#121212;
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:0;
`;

const Follow = styled.div`
    position:absolute;
    background:#f48049;
    height:2px;
    width: 0;
    left:0;
    z-index:2222;
`;
const ProgressBar = styled.div`
    position:absolute;
    left:0;
    height:2px;
    background:#fefefe;
    transition: 0.4s ease-out;
    width:0;

`;
const Count = styled.div`
    position:absolute;
    font-size:130px;
    color:#fefefe;
    font-weight: 500;
    transform: translateY(-15px);

`; 
const Content = styled.div`
    height:100%;
    width:0%;
    position:absolute;
    left:0;
    top:0;
    background:#121212;
    z-index:3333;
    display:flex;
    align-items;center;
    justify-content:center;
    flex-direction:column;
    overflow:hidden;
    color:#fff;

  p{
    text-align:center;
    font-size:104px;
    font-weight:500;
    margin:0;
    opacity:0;
    display:none;
  }
`;