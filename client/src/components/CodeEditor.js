import React, {useState} from "react";
import AceEditor from "react-ace";
import axios from "axios";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

const options = {
    enableLiveAutocompletion: true
}

function CodeEditor(){
    const [code,setCode] = useState(`function(a,b){
    return a + b
}`);

    function handleChange(newValue){
        setCode(newValue);
        axios.post("/api/code", {
            data: code
        });
    }

    return (
        <AceEditor
            mode="javascript"
            theme="github"
            value={code}
            onChange={handleChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={options}
        />
    )
}

export default CodeEditor;