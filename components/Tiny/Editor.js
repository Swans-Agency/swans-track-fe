import React from 'react';
import { Editor } from "@tinymce/tinymce-react";

export default function CustomEditor({ form, fieldName, callBack = ()=>{}}) {
    return (
        <Editor
            apiKey="muqw4vqklpg5cjxpp74y3p3q359jwlljqbqveear0xawdv0y"
            value={form.getFieldValue(fieldName)}
            init={{
                height: 300,
                menubar: false,
                skin: "oxide-dark",
                content_css: "dark",
                plugins: ['tinycomments','mentions','anchor','autolink','charmap','codesample','emoticons','image','link','lists','media','searchreplace','table','visualblocks','wordcount','checklist','mediaembed','casechange','export','formatpainter','pageembed','permanentpen','footnotes','advtemplate','advtable','advcode','editimage','tableofcontents','mergetags','powerpaste','tinymcespellchecker','autocorrect','a11ychecker','typography','inlinecss'],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | hr | codesample | blockquote',
                tinycomments_mode: 'embedded',
                content_style: "codesample { display: block; background-color: #f1f1f1; padding: 10px; } * {background-color: #141414}",
            }}
            onEditorChange={(e) => { form.setFieldValue(fieldName, e); callBack(e) }}
        />
    );
};