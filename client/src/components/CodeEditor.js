import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
import axios from "axios";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";

const options = {
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true
}

function CodeEditor(props){
    // // Save changes as we go?
    // function handleChange(newValue){
    //     setCode(newValue);
    //     // axios.post("/api/code", {
    //     //     data: code
    //     // });
    // }

    return (
        <AceEditor
            mode="javascript"
            theme={props.editorTheme}
            value={props.code}
            readOnly={props.isReadOnly}
            // onChange={handleChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={options}
            highlightActiveLine={props.isHighLightActiveLine}
            style={{width: "100%", height: "300px"}}
        />
    )
}

export default CodeEditor;