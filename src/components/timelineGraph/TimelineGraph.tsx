import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TimelineNode from "../node/TimelineNode";
import "./TimeLineGraph.css"
import { useState, type JSX } from "react"
import TimelineNodePopover from "../timelineNodePopover/TimelineNodePopover";
type Point = {
    x:number
    y:number
}

type NodePopover = {
    content:string,
    x:number,
    y:number
}

type NodeHoverType = (nodeInfo: NodePopover | null) => void

// returns how big the svg viewbox needs to be
function GenerateTreeElements(treeData:Record<number, Record<string, any>>, links:JSX.Element[], 
    nodes:JSX.Element[], path_colors:JSX.Element[], onNodeHover:NodeHoverType, onNodeLeave:() => void):Point{

    let current_x:number = 50; 
    let current_y:number = 50; 
    let max_x = 100;
    let max_y = 100;

    let current_node:Record<string, any> | null = treeData[0];

    let index:number = 0;
    while (current_node){

        nodes.push(<TimelineNode data={current_node["data"]} x={current_x} y={current_y} live={current_node["live"]}
        onHover={onNodeHover} onLeave={onNodeLeave}
        />);

        let children:number[] = current_node["children"];

        //how far left to start placing children nodes
        let child_offset:number = 5 * (children.length-1);

        let child_x = current_x - child_offset;

        let child_y = current_y+20;

        let next_node:Record<string, any> | null = null;
        let next_x:number = current_x;
        children.forEach( (child:number) =>{
            let child_node = treeData[child];

            let line_color:string = "rgba(255, 191, 0, 1)";
            
            // NOTE: no need to explore dead nodes because they will never have children. Unless we develop technology to communicate across the multiverse of course.
            if (!child_node["live"]){
                    path_colors.push(<linearGradient id={`lineSeg${index}`} gradientUnits="userSpaceOnUse" x1={current_x} y1={current_y} x2={child_x} y2={child_y}>
                                        <stop offset="0%"  stopColor="rgba(255, 191, 0, 1)"/>
                                        <stop offset="75%"  stopColor="rgba(221, 76, 50, 0.5)"/>
                                    </linearGradient>)

                    line_color = `url(#lineSeg${index})`

                    nodes.push(<TimelineNode data={child_node["data"]} x={child_x} y={child_y} live={child_node["live"]}
                     onHover={onNodeHover} onLeave={onNodeLeave}
                     />);
                }
            else{
                //there should only be one live node.
                next_node = child_node;
                next_x = child_x;
            }

            links.push(<line x1={current_x} y1={current_y} x2={child_x} y2={child_y} className="TimelinePath" stroke={line_color} strokeWidth="0.5"/>)

            child_x += 10;
            if (child_x > max_x) max_x = child_x;
            index++;
        });
        current_x = next_x;

        
        current_y += 20
        if (current_y > max_y) max_y = current_y;
        current_node = next_node; 
        index++;
    }

    return{x:max_x, y:max_y};

   
}
type timelineTree = {tree: Record<number, Record<string, any>>};
function TimelineGraph({tree}:timelineTree){

    let links:JSX.Element[] = [];
    let nodes:JSX.Element[] = [];
    let path_colors:JSX.Element[] = [];

    const [popOver, setPopOver] = useState<NodePopover|null>(null);

    const onNodeHover = (nodeInfo:NodePopover|null) => {
        if (nodeInfo){
            setPopOver(nodeInfo);
        }
    }
    const onNodeLeave = () => {
        
            setPopOver(null);
        
    }

    let viewBoxsize:Point = GenerateTreeElements(tree, links, nodes, path_colors, onNodeHover, onNodeLeave);
    viewBoxsize.y *= 2;// to expand the size of the grid

    //xoom based on graph size
    let zoom = 1;
    if (viewBoxsize.y > 100){
        zoom = 1 + ((viewBoxsize.y - 100)/100)
    }
    
    //grid lines
    let lines:JSX.Element[] = [];
    let height:number = (window.innerHeight > viewBoxsize.y) ? window.innerHeight : viewBoxsize.y;
    let width:number = (window.innerWidth > viewBoxsize.x) ? window.innerWidth : viewBoxsize.x;
    for (let i =-width; i<=width; i += 5){ 
        lines.push(<line x1={i} y1="0" x2={i} y2={window.innerHeight} stroke="white" strokeWidth={0.2} strokeOpacity={0.2}/>); 
    } 
    for (let i =-height; i<=height; i += 5){ 
        lines.push(<line y1={i} x1={-window.innerWidth /2} y2={i} x2={window.innerWidth} stroke="white" strokeWidth={0.2} strokeOpacity={0.2}/>); 
    }



    return (
        <div>
            <TransformWrapper limitToBounds={false} initialScale={zoom}  initialPositionX={-(zoom-1)* (window.innerWidth / 2)} initialPositionY={-window.innerHeight/4}>
                
                <TransformComponent>

                       
                    <svg className="TimelineSVG" viewBox={`0 0 ${viewBoxsize.x} ${viewBoxsize.y}`}
                        style={{ width: "100vw", height: "100vh", position: "relative"}}>
                            {lines}
                        <defs>
                            {path_colors}
                        </defs>
                        {links}
                        {nodes}
                    </svg>
                        
              
                        
                </TransformComponent>
                
            </TransformWrapper>

            {popOver && (
            <TimelineNodePopover
                    text={popOver.content}
                    x={popOver.x}
                    y={popOver.y}
                    />
                )}
        </div>
    );
}
export default TimelineGraph