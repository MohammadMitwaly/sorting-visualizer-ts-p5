import React, { useState } from 'react';
import './App.css';
import { BubbleSortSketch } from './Components/BubbleSortSketch';
import { QuickSortSketch } from './Components/QuickSortSketch';

const App = () => {
    const [sortingSelector, setSortingSlecetorState] = useState<boolean>(true);

    const handleSortingSelectorState = () => {
        setSortingSlecetorState(!sortingSelector);
    };
    return (
        <>
            <button
                className={'button'}
                onClick={() => handleSortingSelectorState()}
            >
                {sortingSelector ? 'Switch to QuickSort' : 'Back to BubbleSort'}
            </button>
            {sortingSelector ? <BubbleSortSketch /> : <QuickSortSketch />}
        </>
    );
};

export default App;
