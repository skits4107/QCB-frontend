
import "./OptionItem.css"

type optionItemProp = {text:string, removeOption:(option:string)=>void}

function OptionItem({text, removeOption}:optionItemProp){
    

    return (
        <span className="optionItem">
            <span className="optionText">{text}</span>
            <button className="removeOptionBtn" onClick={() => {removeOption(text)}}>x</button>
        </span>
    );
}

export default OptionItem;