import './TimelineNode.css'

type NodeData = {
    data:string,
    x:number,
    y:number
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + "...";
}

function TimelineNode({data, x, y}:NodeData){
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