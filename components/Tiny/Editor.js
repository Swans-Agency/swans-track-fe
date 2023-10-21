import React from 'react';
import { Editor } from "@tinymce/tinymce-react";

export default function CustomEditor({ form, fieldName }) {
    return (
        <Editor
            apiKey="muqw4vqklpg5cjxpp74y3p3q359jwlljqbqveear0xawdv0y"
            value={form.getFieldValue(fieldName)}
            init={{
                height: 300,
                menubar: false,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "fullscreen",
                    "insertdatetime",
                    "table",
                    "codesample",
                    "help",
                    "wordcount",
                    "hr",
                    "blockquote", 
                ],
                toolbar:
                    "undo redo | formatselect | bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | link | hr | codesample | blockquote",
                content_style: "codesample { display: block; background-color: #f1f1f1; padding: 10px; }",
            }}
            onEditorChange={(e) => form.setFieldValue(fieldName, e)}
        />
    );
};