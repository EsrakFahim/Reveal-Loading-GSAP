import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const MENU_ITEMS = [
      { label: 'ALL', count: 24 },
      { label: 'MIX', count: 15 },
      { label: 'SOUND DESIGN', count: 12 },
      { label: 'MUSIC', count: 7 },
];

const ACTIVE_SIZE = 110;
const INACTIVE_SIZE = 36;
const ACTIVE_COLOR = '#f248c8';
const INACTIVE_COLOR = '#c0b8b0';

export default function SideMenu() {
      const [active, setActive] = useState(1);
      const labelsRef = useRef([]);
      const countsRef = useRef([]);
      const isAnimating = useRef(false);

      useEffect(() => {
            labelsRef.current.forEach((el, i) => {
                  const on = i === 1;
                  gsap.set(el, {
                        fontSize: on ? ACTIVE_SIZE : INACTIVE_SIZE,
                        color: on ? ACTIVE_COLOR : INACTIVE_COLOR,
                        opacity: on ? 1 : 0.45,
                        letterSpacing: on ? '-0.02em' : '0em',
                  });
            });
            countsRef.current.forEach((el, i) => {
                  gsap.set(el, { opacity: i === 1 ? 1 : 0, x: i === 1 ? 0 : 8 });
            });
      }, []);

      const handleClick = (index) => {
            if (index === active || isAnimating.current) return;
            isAnimating.current = true;

            const tl = gsap.timeline({
                  defaults: { ease: 'expo.inOut', duration: 0.7 },
                  onComplete: () => { isAnimating.current = false; },
            });

            // Shrink old active
            tl.to(labelsRef.current[active], {
                  fontSize: INACTIVE_SIZE,
                  color: INACTIVE_COLOR,
                  opacity: 0.45,
                  letterSpacing: '0em',
                  duration: 0.6,
                  ease: 'expo.inOut',
            }, 0)
                  .to(countsRef.current[active], {
                        opacity: 0,
                        x: 8,
                        duration: 0.25,
                        ease: 'power2.in',
                  }, 0)

                  // Grow new active — starts 0.05s after, slightly longer duration
                  .to(labelsRef.current[index], {
                        fontSize: ACTIVE_SIZE,
                        color: ACTIVE_COLOR,
                        opacity: 1,
                        letterSpacing: '-0.02em',
                        duration: 0.75,
                        ease: 'expo.out',
                  }, 0.05)
                  .to(countsRef.current[index], {
                        opacity: 1,
                        x: 0,
                        duration: 0.45,
                        ease: 'power3.out',
                        delay: 0.15,
                  }, 0.05);

            setActive(index);
      };

      return (
            <MenuWrapper>
                  {MENU_ITEMS.map((item, i) => (
                        <MenuItem key={i} onClick={() => handleClick(i)}>
                              <Count ref={(el) => (countsRef.current[i] = el)}>
                                    ({item.count})
                              </Count>
                              <Label ref={(el) => (labelsRef.current[i] = el)}>
                                    {item.label}
                              </Label>
                        </MenuItem>
                  ))}
            </MenuWrapper>
      );
}

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  gap: 0;
  user-select: none;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 2px 0;
`;

const Count = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #999;
  min-width: 30px;
  text-align: right;
`;

const Label = styled.span`
  font-family: 'Arial Black', 'Helvetica Neue', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.88;
  display: block;
  transform-origin: right center;
`;