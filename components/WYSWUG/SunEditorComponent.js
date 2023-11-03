import React, { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});
import 'suneditor/dist/css/suneditor.min.css';

export default function SunEditorComponent({ form, fieldName, defaultValue, callBack = () => { } }) {
    const [editorDefaultValue, setEditorDefaultValue] = useState(form.getFieldValue(fieldName))

    useEffect(() => {
        setEditorDefaultValue(form.getFieldValue(fieldName))
    }, [fieldName])

    return (
        <>
            <SunEditor

                height={150}
                defaultValue={form.getFieldValue(fieldName)}
                onChange={(e) => { form.setFieldValue(fieldName, e); callBack(e) }}
                setContents={form.getFieldValue(fieldName)}

                
                setOptions={{
                    "mode": "inline",
                    "defaultTag": "",
                    "textTags": {
                        "bold": "b",
                        "underline": "u",
                        "italic": "i",
                        "strike": "s"
                    },
                    "katex": "window.katex",
                    "buttonList": [
                        [
                            "undo",
                            "redo",
                            "font",
                            "fontSize",
                            "formatBlock",
                            "paragraphStyle",
                            "blockquote",
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                            "fontColor",
                            "hiliteColor",
                            "textStyle",
                            "removeFormat",
                            "outdent",
                            "indent",
                            "align",
                            "horizontalRule",
                            "list",
                            "lineHeight",
                            "table",
                            "link",
                            "math",
                            "image",
                            "video",
                            "audio",
                            "fullScreen",
                            "showBlocks",
                            "codeView",
                            "preview",
                            "print",
                            "save",
                        ]
                    ],
                    "lang(In nodejs)": "en"
                }}
            />
        </>
    );
};