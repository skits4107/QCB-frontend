import { useState, type JSX } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TimelineNode from "../node/TimelineNode";


function TimelineGraph(){

    //example tree data for now. get from backend later (would be reutning as json fomrated like this).
    const [tree, setTree] = useState<Record<number, Record<string, any>>>({
        0: {"children":[1,2], "data":"should I eat a burger or a milk shake", "live":true},
        1: {"children":[3], "data":"burger", "live":true},
        2: {"children":[], "data":"milk shake", "live":false},
        3: {"children":[4,5], "data":"should I watch show Y or Show X", "live":true},
        4: {"children":[], "data":"Y", "live":false},
        5: {"children":[], "data":"X", "live":true}
    });

    //TOOD: generate array of node and link positions.
    let current_x:number = 50; //50vw
    let current_y:number = 10; //10vh

    let current_node:Record<string, any> | null = tree[0];
    let links:JSX.Element[] = [];
    let nodes:JSX.Element[] = [];

    while (current_node){

        nodes.push(<TimelineNode data={current_node["data"]} x={current_x.toString()+"vw"} y={current_y.toString()+"vh"} live={current_node["live"]}/>);

        let children:number[] = current_node["children"];

        //how far left to start placing children nodes
        let child_offset:number = 5 * (children.length-1);

        let child_x = current_x - child_offset;

        let next_node:Record<string, any> | null = null;
        children.forEach( (child:number) =>{
            let child_node = tree[child];
            if (!child_node["live"]){
                 nodes.push(<TimelineNode data={child_node["data"]} x={child_x.toString()+"vw"} y={(current_y+15).toString()+"vh"} live={child_node["live"]}/>);
            }
            else{
                //there should only be one live node.
                next_node = child_node;
                current_x = child_x
            }
            child_x += 10;
        });

        
        current_y += 15
        current_node = next_node;
    }

    return (
        <TransformWrapper limitToBounds={false}>
            <TransformComponent>
                <svg style={{ width: "100vw", height: "100vh", position: "relative"}}>
                {
                    nodes
                }
                </svg>

                
            </TransformComponent>
        </TransformWrapper>
    );
}

export default TimelineGraph