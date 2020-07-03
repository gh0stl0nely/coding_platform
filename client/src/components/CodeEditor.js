import React from "react";
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";

const options = {
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
}

function CodeEditor(props){

    return (
        <AceEditor
            mode="javascript"
            theme={props.editorTheme}
            value={props.code}
            readOnly={props.isReadOnly}
            // debounceChangePeriod={1500}
            onChange={props.saveCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={options}
            highlightActiveLine={props.isHighLightActiveLine}
            style={{width: "100%", height: "300px"}}
        />
    )
}

export default CodeEditor;