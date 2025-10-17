import { useState } from "react"
import TimelineGraph from "../components/timelineGraph/TimelineGraph";
import CreateBranchUI from "../components/createBranchUI/createBranchUI";

function TimelinePage(){
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

    return (
    <>
        <TimelineGraph tree={tree}/>
        <CreateBranchUI tree={tree} setTree={setTree}/>
    </>);
}

export default TimelinePage