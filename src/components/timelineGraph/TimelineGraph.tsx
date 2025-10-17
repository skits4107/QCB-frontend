import { useState, type JSX } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TimelineNode from "../node/TimelineNode";
import { line, curveCardinal } from "d3-shape";
import "./TimeLineGraph.css"

type Point = {
    x:number
    y:number
}

// returns how big the svg viewbox needs to be
function GenerateTreeElements(treeData:Record<number, Record<string, any>>, links:JSX.Element[], nodes:JSX.Element[], path_colors:JSX.Element[]):Point{
    let current_x:number = 50; 
    let current_y:number = 10; 
    let max_x = 100;
    let max_y = 100;

    let current_node:Record<string, any> | null = treeData[0];

    let index:number = 0;
    while (current_node){

        nodes.push(<TimelineNode data={current_node["data"]} x={current_x} y={current_y} live={current_node["live"]}/>);

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

                    nodes.push(<TimelineNode data={child_node["data"]} x={child_x} y={child_y} live={child_node["live"]}/>);
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

function TimelineGraph(){

    //example tree data for now. get from backend later (would be reutning as json fomrated like this).
    // tree data will probably be passed as a prop.
    const [tree, setTree] = useState<Record<number, Record<string, any>>>({
        0: {"children":[1,2], "data":"should I eat a burger or a milk shake", "live":true},
        1: {"children":[3], "data":"burger", "live":true},
        2: {"children":[], "data":"milk shake", "live":false},
        3: {"children":[4,5], "data":"should I watch show Y or Show X", "live":true},
        4: {"children":[], "data":"Y", "live":false},
        5: {"children":[6], "data":"X", "live":true},
        6: {"children":[7,8], "data":"question", "live":true},
        7: {"children":[], "data":"A", "live":false},
        8: {"children":[9], "data":"B", "live":true},
        9:  {"children":[10, 11, 12, 13, 14], "data":"q", "live":true},
        10: {"children":[], "data":"C", "live":true},
        11: {"children":[], "data":"D", "live":false},
        12: {"children":[], "data":"E", "live":false},
        13: {"children":[], "data":"F", "live":false},
        14: {"children":[], "data":"G", "live":false},
    });

    let links:JSX.Element[] = [];
    let nodes:JSX.Element[] = [];
    let path_colors:JSX.Element[] = [];
    let viewBoxsize:Point = GenerateTreeElements(tree, links, nodes, path_colors);
    let zoom = 1;
    if (viewBoxsize.y > 100){
        zoom = 1 + ((viewBoxsize.y - 100)/100)
    }
    return (
        <TransformWrapper limitToBounds={false} initialScale={zoom}  initialPositionX={-(zoom-1)* (window.innerWidth / 2)} initialPositionY={0}>
            <TransformComponent>
                <svg viewBox={`0 0 ${viewBoxsize.x} ${viewBoxsize.y}`}
                    style={{ width: "100vw", height: "100vh", position: "relative"}}>
                    <defs>
                        {path_colors}
                    </defs>
                    {links}
                    {nodes}
                </svg>
               
                
            </TransformComponent>
        </TransformWrapper>
    );
}
export default TimelineGraph