import { useState } from "react"
import TimelineGraph from "../components/timelineGraph/TimelineGraph";
import CreateBranchUI from "../components/createBranchUI/CreateBranchUI";

/* exmaple data {
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
    }*/
//temporary function for testing front end, will be replaced with API calls to get quantum random selection.
async function selectOption(options:string[]):Promise<string>{
    // have to use proxy due to CORS not working with the API. I am using this API: https://www.lfdr.de/QRNG/
     const response = await fetch(
    "https://patient-breeze-5ec6.aaronjosua719.workers.dev"
  );


    const data = await response.json();

    const num = parseInt(data.qrn, 16)

    const index = num % options.length;

    return options[index];
}

function getLatestLiveNode(tree:Record<number, Record<string, any>>):Record<string, any>{
    let current_node: Record<string, any>|null = tree[0]
    let most_recent_live = current_node;
    while (current_node){
        if (current_node["children"].length === 0){
            break; //current node will be most recent live child
        }

        let next_node = null;
        current_node["children"].forEach((child: number) =>{
            let child_node = tree[child];
            if (child_node && child_node["live"]){
                most_recent_live = child_node; // go to next child.
                next_node = child_node;
            }
        })
        current_node = next_node;
    }
    return most_recent_live;
}


function getLatestId(tree:Record<number, Record<string, any>>):number{
    let latest_id = 0;
    for(const id in tree){
        const numId = Number(id); // javascript/typescript is stupid
        if (numId > latest_id){
            latest_id = numId;
        }
    }
    return latest_id;
}


function TimelinePage(){
    //example tree data for now. get from backend later (would be reutning as json fomrated like this).
    // tree data will probably be passed as a prop.
    const [tree, setTree] = useState<Record<number, Record<string, any>>>({
        0: {"children":[], "data":"start", "live":true},
    });

    const updateTree = async (question:string, options:string[]) =>{
        if (options.length <= 1){
            alert("need at least 2 options");
            return;
        }

        let live_option = await selectOption(options);
        setTree( prevTree => {
            let new_tree: Record<number, Record<string, any>> = {
                ...prevTree    
            };
            console.log(new_tree);
            
            let latest_id = getLatestId(tree);

            let most_recent_live = getLatestLiveNode(new_tree);

            //question id is latest_id + 1
            most_recent_live["children"] = [latest_id+1]; //most reecent shouldnt have any previous children currently
            latest_id++;

            let question_children:number[] = [];
            for (let i=0; i<options.length; i++){
                question_children.push(latest_id+i+1); //start at 1, because latest_id is the id for the question now.
                new_tree[latest_id+i+1] = {"children":[], "data":options[i], "live":options[i] === live_option}
            }

            let questionNode: Record<string, any> = {"children":question_children, "data":question, "live":true}
            new_tree[latest_id] = questionNode;

            return new_tree;
        });
    }

    return (
    <>
        <TimelineGraph tree={tree}/>
        <CreateBranchUI updateTree={updateTree}/>
    </>);
}

export default TimelinePage;