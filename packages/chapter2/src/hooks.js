import {isEqual} from "lodash";

export function createHooks(callback) {

  let states = []
  let stateIndex = 0;

  let memoizedStates = [];
  let memoizedIndex = 0;


  const useState = (initialValue) => {
    if (!states[stateIndex]) {
      states[stateIndex] = initialValue;
    }

    const currentIndex = stateIndex;

    const setState = (newValue) => {
      if (states[currentIndex] !== newValue) {
        states[currentIndex] = newValue
        callback()
      }
    }

    stateIndex++

    return [states[currentIndex], setState]
  };


  const useMemo = (fn, refs) => {
    if(!memoizedStates[memoizedIndex]) {
      const newValue = fn();
      memoizedStates[memoizedIndex] = [newValue, refs];
      memoizedIndex++;
      return newValue;
    }

    let newDeps = refs; // 이전 의존성 배열 저장
    let [prevValue, prevDeps] = memoizedStates[memoizedIndex]; // 이전에 계산된 값 저장

    if (prevDeps.length === newDeps.length && isEqual(prevDeps, newDeps)) {
      memoizedIndex++
      return prevValue;
    }

    const updateValue = fn();
    memoizedStates[memoizedIndex] = [updateValue, newDeps];
    memoizedIndex++;
    return updateValue;
  };

  const resetContext = () => {
    stateIndex = 0;
    memoizedIndex = 0;
  }

  return { useState, useMemo, resetContext };
}
