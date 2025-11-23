import { useTransformContext } from "react-zoom-pan-pinch";
import "./TimelineNodePopover.css"


type NodePopoverProp = {
  text: string;
  x: number;
  y: number;
};

function TimelineNodePopover({text, x, y}:NodePopoverProp){



    return (
        <div className="TimelinePopover" style={{left: x, top: y}}>
            {text}
        </div>
    );
}

export default TimelineNodePopover;