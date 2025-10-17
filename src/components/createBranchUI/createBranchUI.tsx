import "./CreateBranchUI.css"
import { Children, useState, type JSX } from "react"

type timelineTreeProp = {tree: Record<number, Record<string, any>>, setTree: React.Dispatch<React.SetStateAction<Record<number, Record<string, any>>>>};

//temporary function for testing front end, will be replaced with API calls to get quantum random selection.
function selectOption(options:string[]):string{
     return options[Math.floor(Math.random() * options.length)];
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

function CreateBranchUI({tree, setTree}: timelineTreeProp){

    const [options, setOptions] = useState<string[]>([]);
    const [question, setQuestion] = useState("Enter question. EX: should I eat cheese burger or chicken nuggets");

    let optionElements: JSX.Element[] = [];

    const addOption = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>{
        if (event.key === "Enter"){
            event.preventDefault();

            const textarea = event.currentTarget; //dont why, but I need to to store it in a variable
            const value = textarea.value.trim();
        
            if (value) {
                setOptions(prev => [...prev, value.trim()]);
                event.currentTarget.value = "";
            }
            
        }
    };

    const updateTree = () =>{
        if (options.length <= 1){
            alert("need at least 2 options");
            return;
        }
        setOptions([]);
        setTree( prevTree => {
            let new_tree: Record<number, Record<string, any>> = {
                ...prevTree    
            };
            console.log(new_tree);
            let live_option = selectOption(options);

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
    
    options.forEach(
        option =>{
            optionElements.push(
                <li className="BranchUIoption">
                    {option}
                </li>
            );
        }
    );

    return (
        <div className="BranchUIcontainer">
            <textarea key="questionTextarea" 
                className="BranchUItextarea" 
                defaultValue={question} 
                onChange={(e) => setQuestion(e.target.value)} >
            </textarea>


            <textarea className="BranchUItextarea" onKeyDown={addOption} defaultValue=" Enter option. EX: chese burger">
            </textarea>


            <ol className="BranchUIoptionList">
                {optionElements}
            </ol>
            <button onClick={updateTree}>Choose!</button>
        </div>
    );
}

export default CreateBranchUI;