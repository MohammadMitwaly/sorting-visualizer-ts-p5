import React, { useEffect, useState } from 'react';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import Sketch from 'react-p5';
import { generateRandomArray } from '../Utils/GenerateRandomArray';

interface BubbleSortSketchProps {}

export const BubbleSortSketch: React.FC<BubbleSortSketchProps> = (
    props: BubbleSortSketchProps
) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [arrayOfValues, setArrarrayOfValues] = useState<number[]>([]);
    let i = 0;

    useEffect(() => {
        setArrarrayOfValues(
            generateRandomArray(width, 5, window.innerHeight - 5)
        );
    }, []);

    const swapItems = (
        arrayOfValues: number[],
        index: number,
        indexToSwap: number
    ) => {
        const temp = arrayOfValues[index];
        arrayOfValues[index] = arrayOfValues[indexToSwap];
        arrayOfValues[indexToSwap] = temp;
        setArrarrayOfValues(arrayOfValues);
    };

    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
        p5.frameRate(10);
    };

    const draw = (p5: p5Types) => {
        p5.background('#172121');

        if (i < arrayOfValues.length) {
            for (let j = 0; j < arrayOfValues.length - i - 1; j++) {
                let a = arrayOfValues[j];
                let b = arrayOfValues[j + 1];
                if (a > b) {
                    p5.stroke(255, 0, 0);
                    p5.line(i, p5.height, i, p5.height - arrayOfValues[i]);
                    swapItems(arrayOfValues, j, j + 1);
                }
            }
        } else {
            console.log('Array is sorted');
            p5.noLoop();
        }
        i++;

        for (let i = 0; i < arrayOfValues.length; i++) {
            p5.stroke('#E5D0CC');
            p5.line(i, p5.height, i, p5.height - arrayOfValues[i]);
        }
    };

    return <Sketch setup={setup} draw={draw} />;
};
