import React, { useEffect, useState } from "react";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Sketch from "react-p5";
import { generateRandomArray } from "../Utils/GenerateRandomArray";

interface QuickSortSketchProps {
	//Your component props
    //See annotations in JS for more information
}

export const QuickSortSketch: React.FC<QuickSortSketchProps> = (props: QuickSortSketchProps) => {
    
    const [width, setWidth] = useState(10);
	const [arrayOfValues, setArrarrayOfValues] = useState<number[]>([]);
    let valueStatus : number[] = []
	let i = 0;

	useEffect(()=>{
		setArrarrayOfValues(generateRandomArray(window.innerWidth, 5 ,window.innerHeight-50));
        arrayOfValues.forEach(item => valueStatus.push(-1));
	}, []);

    

    const delaySwap = (duration: number) =>{
        return new Promise(resolve => setTimeout(resolve, duration));
    }

	const swapItems = async (arrayOfValues: number[], index: number, indexToSwap: number) => {
        await delaySwap(100);
		const temp = arrayOfValues[index]
		arrayOfValues[index] = arrayOfValues[indexToSwap]
		arrayOfValues[indexToSwap] = temp 
		setArrarrayOfValues(arrayOfValues);
	}

     const quickSort = async (array: number[], startIndex:number, endIndex: number) => {
        if (startIndex >= endIndex) {
          return;
        }
        ///@ts-ignore
        let pivotIndex : number= await partition(array, startIndex, endIndex);
        valueStatus[pivotIndex] = -1;
      
        await Promise.all([
          quickSort(array, startIndex, pivotIndex - 1),
          quickSort(array, pivotIndex + 1, endIndex)
        ]);
      }

      const partition = async (array: number[], startIndex:number, endIndex: number) => {
        for (let i = startIndex; i < endIndex; i++) {
            valueStatus[i] = 1;
          }
        
          let pivotValue = array[endIndex];
          let pivotIndex = startIndex;
          valueStatus[pivotIndex] = 0;
          for (let i = startIndex; i < endIndex; i++) {
            if (array[i] < pivotValue) {
              await swapItems(array, i, pivotIndex);
              valueStatus[pivotIndex] = -1;
              pivotIndex++;
              valueStatus[pivotIndex] = 0;
            }

            await swapItems(arrayOfValues, pivotIndex, endIndex);

            for (let i = startIndex; i < endIndex; i++) {
              if (i != pivotIndex) {
                valueStatus[i] = -1;
              }
            }
          
            return pivotIndex;
      }
    }

    const setup = (p5: p5Types, canvasParentRef : Element) => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        quickSort(arrayOfValues, 0, arrayOfValues.length - 1);
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
        arrayOfValues.forEach((value, index) => {
            p5.noStroke();
            if (valueStatus[index] == 0) {
              p5.fill('#E0777D');
            } else if (valueStatus[index] == 1) {
              p5.fill('#D6FFB7');
            } else {
              p5.fill(255);
            }
            p5.rect(i * width, p5.height - value, width, value);
        })
	};
    return <Sketch setup={setup} draw={draw} />;
}