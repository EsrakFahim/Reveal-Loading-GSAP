import { gsap, CSSPlugin, Expo } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(CSSPlugin);

const BRANDS = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "Under Armour",
  "New Balance",
  "Asics",
];

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
  }, []);

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log('Completed');

        const track = document.querySelector(".ticker-track");
        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: -totalWidth,
          duration: 18,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(
              (x) => parseFloat(x) % totalWidth
            ),
          },
        });
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
      delay: 0.3,
      ease: Expo.easeInOut
    }).to('.content', {
      width: '100%',
      ease: Expo.easeInOut
    }).to('.title-line', {
      display: 'block',
      duration: 0.7
    }).to('.title-line', {
      opacity: 1,
      duration: 0.8,
      ease: Expo.easeInOut,
      stagger: 1.2
    });
  };

  return (
    <React.Fragment>
      <AppContainer>
        <Loading>
          <Follow className='follow' />
          <ProgressBar className='hide' style={{ width: counter + '%' }} />
          <Count className='hide'>{counter}%</Count>
        </Loading>

        <Content className='content'>
          <Ticker>
            <TickerTrack className="ticker-track">
              {[...BRANDS, ...BRANDS].map((text, index) => (
                <WaveText key={index} text={text} />
              ))}
            </TickerTrack>
          </Ticker>
        </Content>
      </AppContainer>
    </React.Fragment>
  );
};

export default App;


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: relative;
  text-align: center;
  color: #999;
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  background: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const Follow = styled.div`
  position: absolute;
  background: #f48049;
  height: 2px;
  width: 0%;
  left: 0;
  z-index: 2222;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  height: 2px;
  background: #fefefe;
  transition: 0.4s ease-out;
  width: 0;
`;

const Count = styled.div`
  position: absolute;
  font-size: 130px;
  color: #fefefe;
  font-weight: 500;
  transform: translateY(-15px);
  z-index: 5555;
`;

const Content = styled.div`
  height: 100%;
  width: 0%;
  position: absolute;
  left: 0;
  top: 0;
  background: #121212;
  z-index: 3333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #fff;
`;

const Ticker = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;        /* vertically center the row */
  justify-content: flex-start;
`;

const TickerTrack = styled.div`
  display: flex;
  flex-direction: row;        /* horizontal — was missing */
  flex-shrink: 0;             /* prevent squishing — was missing */
  align-items: flex-end;      /* baseline alignment for wave effect */
  gap: 80px;
  will-change: transform;
  white-space: nowrap;        /* prevent any wrapping */
`;


function WaveText({ text }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  const BASE_SIZE = 140;
  const MAX_SCALE = 2.5;
  const MAX_DIST = 220;

  useEffect(() => {
    const container = containerRef.current;

    lettersRef.current.forEach((el) => {
      gsap.set(el, { transformOrigin: "bottom center" });
    });

    const handleMove = (e) => {
      const mouseX = e.clientX;

      lettersRef.current.forEach((el) => {
        // Always read live rect — letter moves with the ticker scroll
        const rect = el.getBoundingClientRect();
        const center = rect.left + rect.width / 2;

        const dist = Math.abs(mouseX - center);
        const strength = Math.max(0, 1 - dist / MAX_DIST);
        const newScale = 1 + strength * (MAX_SCALE - 1);

        gsap.to(el, {
          scaleY: newScale,
          scaleX: 1,
          duration: 0.22,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    const handleLeave = () => {
      gsap.to(lettersRef.current, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "4px",
        cursor: "default",
        userSelect: "none",
        flexShrink: 0,
        minHeight: `${BASE_SIZE * MAX_SCALE}px`,
      }}
    >
      {text.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          style={{
            display: "inline-block",
            fontSize: `${BASE_SIZE}px`,
            lineHeight: "1",
            fontWeight: 900,
            willChange: "transform",
            transformOrigin: "bottom center",
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}