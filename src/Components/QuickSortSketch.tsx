import React, { useEffect, useState } from 'react';
import p5Types from 'p5';
import Sketch from 'react-p5';
import { generateRandomArray } from '../Utils/GenerateRandomArray';

interface QuickSortSketchProps {}

export const QuickSortSketch: React.FC<QuickSortSketchProps> = (
    props: QuickSortSketchProps
) => {
    const [width, setWidth] = useState(10);
    const [arrayOfValues, setArrarrayOfValues] = useState<number[]>(
        generateRandomArray(window.innerWidth / 10, 5, window.innerHeight - 50)
    );
    let [valueStatus, setValueStatus] = useState<number[]>(
        new Array(10).fill(-1)
    );

    const delaySwap = (duration: number) => {
        return new Promise((resolve) => setTimeout(resolve, duration));
    };

    const swapItems = async (
        arrayOfValues: number[],
        index: number,
        indexToSwap: number
    ) => {
        await delaySwap(50);
        const tempArray = arrayOfValues;
        const temp = tempArray[index];
        tempArray[index] = tempArray[indexToSwap];
        tempArray[indexToSwap] = temp;
        setArrarrayOfValues(tempArray);
    };

    const quickSort = async (
        array: number[],
        startIndex: number,
        endIndex: number
    ) => {
        if (startIndex >= endIndex) {
            return;
        }
        let pivotIndex: number = await partition(array, startIndex, endIndex);
        let tempArr = valueStatus;
        tempArr[pivotIndex] = -1;
        setValueStatus(tempArr);

        await Promise.all([
            quickSort(array, startIndex, pivotIndex - 1),
            quickSort(array, pivotIndex + 1, endIndex),
        ]);
    };

    const partition = async (
        array: number[],
        startIndex: number,
        endIndex: number
    ) => {
        let tempArr = valueStatus;
        for (let i = startIndex; i < endIndex; i++) {
            tempArr[i] = 1;
        }
        setValueStatus(tempArr);

        let pivotValue = array[endIndex];
        let pivotIndex = startIndex;
        tempArr[pivotIndex] = 0;
        for (let i = startIndex; i < endIndex; i++) {
            if (array[i] < pivotValue) {
                await swapItems(array, i, pivotIndex);
                tempArr[pivotIndex] = -1;
                pivotIndex++;
                tempArr[pivotIndex] = 0;
            }
        }

        await swapItems(arrayOfValues, pivotIndex, endIndex);

        for (let i = startIndex; i < endIndex; i++) {
            if (i != pivotIndex) {
                tempArr[i] = -1;
            }
        }
        setValueStatus(tempArr);
        return pivotIndex;
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
        quickSort(arrayOfValues, 0, arrayOfValues.length - 1);
    };

    const draw = (p5: p5Types) => {
        p5.background('#F2D7EE');
        arrayOfValues.forEach((value, index) => {
            p5.noStroke();
            if (valueStatus[index] == 0) {
                p5.fill('#A5668B');
            } else if (valueStatus[index] == 1) {
                p5.fill('#69306D');
            } else {
                p5.fill('#0E103D');
            }
            p5.rect(index * width, p5.height - value, width, value);
        });
    };
    return <Sketch setup={setup} draw={draw} />;
};
