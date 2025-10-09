import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../node/TimelineNode'
import TimelineNode from "../node/TimelineNode";

function TimelineGraph(){
    //buttons for testing. replace with actual timeline graph later.
    return (
        <TransformWrapper limitToBounds={false}>
            <TransformComponent>
                {/* exmaple of node. nodes will be generated from data in future*/}
                <div style={{ width: "100vw", height: "100vh", position: "relative"}}>
                  <TimelineNode answer="cheesefi3n i" question="root question. do you like cheese or apples?" x={500} y={500}/>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
}

export default TimelineGraph