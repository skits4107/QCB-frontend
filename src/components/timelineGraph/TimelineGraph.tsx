import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../node/TimelineNode'
import TimelineNode from "../node/TimelineNode";


function TimelineGraph(){

    //example tree data for now. get from backend later.
    let tree:Record<number, Record<string, number[]|string>> = {
        0: {"children":[1,2], "data":"should I eat a burger or a milk shake"},
        1: {"children":[3], "data":"burger"},
        2: {"children":[], "data":"milk shake"},
        3: {"children":[4,5], "data":"should I watch show Y or Show X"},
        4: {"children":[], "data":"Y"},
        5: {"children":[], "data":"X"}
    }

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