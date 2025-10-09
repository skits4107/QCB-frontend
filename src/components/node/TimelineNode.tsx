import type { JSX } from "react";
import './TimelineNode.css'

type NodeData = {
    answer?:string,
    question?:string,
    x:number,
    y:number
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + "...";
}

function TimelineNode({answer, question, x, y}:NodeData){
    let content:JSX.Element[] = [];
    let radius:number = 50;
    if (answer){
        content.push(
        <text 
        key="answer" 
        className="NodeText"
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white">
            {truncateText(answer, 10)}
        </text>
        );
    }
    if (question){
        content.push(<text 
            key="question"
            className="NodeText"
            x={x}
            y={y+20}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white">
                {truncateText(question, 10)}
            </text>
            );
    }
    return (
        <>
            <svg width="100vw" height="100vh">
                <circle className="NodeCircle" cx={x} cy={y} r={radius} fill="#00CCCC"/>
                {content}
            </svg>
        </>
    );
}

export default TimelineNode