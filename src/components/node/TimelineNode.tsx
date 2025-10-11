import './TimelineNode.css'
import { useState } from "react"

type NodeData = {
    data:string,
    x:number|string,
    y:number|string,
    live:boolean
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + "...";
}

function TimelineNode({data, x, y, live}:NodeData){
    let content;
    const [radius, setRadius] = useState(50);
    if (data){
        content =  <text 
                    key="answer" 
                    className="NodeText"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    onMouseOver={()=>setRadius(60)} 
                    onMouseOut={()=>setRadius(50)}
                    fill="white">
                        {truncateText(data, 10)}
                    </text>;
    }
    
    let color:string = "#cf1818ff";
    if (live){
        color = "#12d18eff"
    }
    
    return (
        <>
            
            
            <circle className="NodeCircle" cx={x} cy={y} r={radius} fill={color}
                onMouseOver={()=>setRadius(60)} 
                onMouseOut={()=>setRadius(50)}/>
                
            {content}
            
       
        </>
    );
}

export default TimelineNode