import './TimelineNode.css'

type NodeData = {
    data:string,
    x:number,
    y:number,
    live:boolean
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + "...";
}

function TimelineNode({data, x, y, live}:NodeData){
    let content;
    let radius:number = 50;
    if (data){
        content =  <text 
                    key="answer" 
                    className="NodeText"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white">
                        {truncateText(data, 10)}
                    </text>;
    }
    
    let color:string = "#0bc8c8ff";
    if (live){
        color = "#12d18eff"
    }
    
    return (
        <>
            <svg width="100vw" height="100vh">
                <circle className="NodeCircle" cx={x} cy={y} r={radius} fill={color}/>
                {content}
            </svg>
        </>
    );
}

export default TimelineNode