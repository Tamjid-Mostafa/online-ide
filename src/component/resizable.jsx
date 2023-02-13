import './resizable.css'
import React, { useEffect, useState } from 'react'
import { ResizableBox } from 'react-resizable';

const Resizable = ({ direction, children }) => {
    let resizableProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timer;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)
            }, 100)

        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [])


    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            width: innerWidth * 0.75,
            resizeHandles: ['e'],
        }
    } else {
        resizableProps = {
            minConstraints: [Infinity, 24],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
        }
    }
    return (
        <ResizableBox {...resizableProps}

        >{children}</ResizableBox>
    )
}

export default Resizable