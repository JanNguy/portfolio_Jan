import { useState, useRef, useEffect } from 'react';
import './App.css';

function inputSetPositions(oldDiv1X: string, oldDiv1Y: string, oldDiv2X: string, oldDiv2Y: string) {
    let newDiv1: Position = {
        x: parseInt(oldDiv1X),
        y: parseInt(oldDiv1Y)
    };
    let newDiv2: Position = {
        x: parseInt(oldDiv2X),
        y: parseInt(oldDiv2Y)
};