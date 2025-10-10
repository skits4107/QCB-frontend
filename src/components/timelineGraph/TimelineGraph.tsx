import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import TimelineNode from "../node/TimelineNode";


function TimelineGraph(){

    //example tree data for now. get from backend later (would be reutning as json fomrated like this).
    let tree:Record<number, Record<string, number[]|string|boolean>> = {
        0: {"children":[1,2], "data":"should I eat a burger or a milk shake", "live":true},
        1: {"children":[3], "data":"burger", "live":true},
        2: {"children":[], "data":"milk shake", "live":false},
        3: {"children":[4,5], "data":"should I watch show Y or Show X", "live":true},
        4: {"children":[], "data":"Y", "live":false},
        5: {"children":[], "data":"X", "live":true}
    }

    //TOOD: generate array of node and link positions.

    return (
        <TransformWrapper limitToBounds={false}>
            <TransformComponent>
                {
                    
                }


                {/* exmaple of node. nodes will be generated from data in future*/}
                <div style={{ width: "100vw", height: "100vh", position: "relative"}}>
                  <TimelineNode data="root question. do you like cheese or apples?" x={700} y={100}/>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
}

export default TimelineGraph