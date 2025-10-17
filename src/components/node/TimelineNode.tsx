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
    const [radius, setRadius] = useState(1);
    if (data){
        content =  <text 
                    key="answer" 
                    className="NodeText"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    onMouseOver={()=>setRadius(2)} 
                    onMouseOut={()=>setRadius(1)}
                    fill={live?'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}>
                        {truncateText(data, 10)}
                    </text>;
    }
    
    let color:string = "rgba(221, 76, 50, 0.5)";
    if (live){
        color = "rgba(255, 191, 0, 1)";
    }
    
    return (
        <>
            
            
            <circle className="NodeCircle" cx={x} cy={y} r={radius} fill={color}
                onMouseOver={()=>setRadius(2)} 
                onMouseOut={()=>setRadius(1)}
                style={{ filter: `drop-shadow(0px 0px 1px ${color})` }}/>
                
            {content}
            
       
        </>
    );
}

export default TimelineNode