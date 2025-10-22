

type NodePopoverProp = {text:string, x:number|string, y:number|string}

function TimelineNodePopover({text, x, y}:NodePopoverProp){

    return (
        <div className="TimelinePopover" style={{left: x, top: y}}>
            {text}
        </div>
    );
}

export default TimelineNodePopover;