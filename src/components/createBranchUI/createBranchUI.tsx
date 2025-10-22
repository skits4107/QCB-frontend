import "./CreateBranchUI.css"
import { useState, type JSX } from "react"
import OptionItem from "../optionItem/OptionItem.tsx";

type UpdateTreeProps  = { updateTree: (question: string, options: string[]) => void};


function CreateBranchUI({updateTree}: UpdateTreeProps){

    const [options, setOptions] = useState<string[]>([]);
    const [question, setQuestion] = useState("");

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

   const onSplitBtnClicked = () =>{
    setOptions([])
    updateTree(question, options)
   }

   const removeOption = (option:string) =>{
        setOptions(options.filter(item => item !== option))
   }
    
    options.forEach(
        option =>{
            optionElements.push(
                <OptionItem text={option} removeOption={removeOption}/>
            );
        }
    );

    return (
        <div className="BranchUIcontainer">
            <textarea key="questionTextarea" 
                className="BranchUItextarea" 
                placeholder="Enter question. EX: should I eat cheese burger or chicken nuggets"
                defaultValue=""
                onChange={(e) => setQuestion(e.target.value)} >
            </textarea>


            <textarea className="BranchUItextarea" onKeyDown={addOption} placeholder=" Enter option. EX: chese burger">
            </textarea>


            <div className="BranchUIoptionList">
                {optionElements}
            </div>
            <button className="splitBtn" onClick={onSplitBtnClicked}>Split the universe!</button>
        </div>
    );
}

export default CreateBranchUI;