import { useState, type JSX } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TimelineNode from "../node/TimelineNode";
import { line, curveCardinal } from "d3-shape";
import "./TimeLineGraph.css"

type Point = {
    x:number
    y:number
}

function GenerateTreeElements(treeData:Record<number, Record<string, any>>, links:JSX.Element[], nodes:JSX.Element[], path_colors:JSX.Element[]){
    let current_x:number = 50; //50vw
    let current_y:number = 10; //10vh

    let current_node:Record<string, any> | null = treeData[0];

    //stores the points to construct each timeline curve out of.
    let paths:Point[][] = [[]]

    while (current_node){
        paths[0].push({x: current_x, y: current_y})

        nodes.push(<TimelineNode data={current_node["data"]} x={current_x} y={current_y} live={current_node["live"]}/>);

        let children:number[] = current_node["children"];

        //how far left to start placing children nodes
        let child_offset:number = 5 * (children.length-1);

        let child_x = current_x - child_offset;

        let child_y = current_y+20;

        let next_node:Record<string, any> | null = null;
        children.forEach( (child:number) =>{
            let child_node = treeData[child];
            if (!child_node["live"]){
                    nodes.push(<TimelineNode data={child_node["data"]} x={child_x} y={(child_y)} live={child_node["live"]}/>);
                    
                    let child_path = structuredClone(paths[0]);
                    child_path.push({x: child_x, y: child_y});
                    paths.push(child_path);
                }
            else{
                //there should only be one live node.
                next_node = child_node;
                current_x = child_x
            }
            child_x += 10;
        });

        
        current_y += 20
        current_node = next_node; 
    }


    //NOTE: path should probably be its own component in the future.
    const lineGenerator = line<Point>().x(d => d.x).y(d => d.y).curve(curveCardinal.tension(0.5));

    let index:number = 0;

    paths.forEach(path =>{
        let gradiant_stops:JSX.Element[] = [];

        // the amount each space between each stop in percetnage
        let stop_diff:number = 100 / path.length;

        for (let i=0; i< path.length-1; i++){
            gradiant_stops.push(
                <stop offset={`${i*stop_diff}%`}  stopColor="green"/>
            )
        }
        if (index === 0){ // if it is the live path
            gradiant_stops.push(<stop offset="100%" stopColor="green"/>)
        }
        else{
            gradiant_stops.push(<stop offset="100%" stopColor="red"/>)
        }
        

        path_colors.push(
            <linearGradient id={`path${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                {gradiant_stops}
            </linearGradient>
        );

        let path_data:string|null = lineGenerator(path);
        if (path_data){
            links.push(<path className="TimelinePath" d={path_data} stroke={`url(#path${index})`} strokeWidth="0.5" fill="none" strokeLinejoin="round"/> )
        }

        index++;
    });
   
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
        8: {"children":[], "data":"B", "live":true}
    });

    let links:JSX.Element[] = [];
    let nodes:JSX.Element[] = [];
    let path_colors:JSX.Element[] = [];
    GenerateTreeElements(tree, links, nodes, path_colors);

    return (
        <TransformWrapper limitToBounds={false}>
            <TransformComponent >
                {/* TODO: replace viewbox with some other method for endless rendering*/}
                <svg viewBox="0 0 100 100" style={{ width: "100vw", height: "100vh", position: "relative"}}>
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