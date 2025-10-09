import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function TimelineGraph(){
    //buttons for testing. replace with actual timeline graph later.
    return (
        <TransformWrapper limitToBounds={false}>
            <TransformComponent>
                <div style={{ width: "100vw", height: "100vh", position: "relative"}}>
                    <button style={{ position: "absolute", left: 400, top: 300 }}
                        onClick={() => alert("Root button clicked")}>
                        Root Node
                    </button>
                    <button style={{ position: "absolute", left: 600, top: 600 }}
                        onClick={() => alert("other button clicked")}>
                        Other node
                    </button>
                     <button style={{ position: "absolute", left: 2000, top: 600 }}
                        onClick={() => alert("other other button clicked")}>
                        Other othet node
                    </button>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
}

export default TimelineGraph