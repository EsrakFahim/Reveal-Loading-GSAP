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
          counter < 100 ? counter + 14 : clearInterval(count), setCounter(100),
          console.log(counter),
          reveal()
        )
      )
    }, 25);
  }, [])

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log('Completed');
      },
    });
    t1.to(".follow", {
      width: '100%',
      duration: 1.2,
      delay: 0.7,
      ease: Expo.easeInOut
    }).to(".hide", {
      opacity: 0,
      duration: 0.3
    }).to(".hide", {
      display: "none",
      duration: 0.3
    }).to(".follow", {
      height: '100%',
      duration: 1.2,
      delay:0.3,
      ease: Expo.easeInOut
    }).to('.content',{
      width:'100%',
      ease:Expo.easeInOut
    }).to('.title-line',{
      display:'block',
      duration:0.7
    }).to('.title-line',{
      opacity:1,
      duration:0.8,
      ease:Expo.easeInOut,
      stagger:1.2
    })
  }



  return (
    <React.Fragment>
      <AppContainer>
        <Loading>
          <Follow className='follow'></Follow>
          <ProgressBar className='hide' style={{ width: counter + '%' }} >
          </ProgressBar>
          <Count className='hide'>{counter}%</Count>
        </Loading>

        <Content className='content'>
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
    width: 0%;
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
    z-index:5555;
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
    font-size:40px;
    font-weight:500;
    margin:0 20px;
    opacity:0;
    display:none;
  }
`;