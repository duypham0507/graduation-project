import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorCustomBuild from "../../ckeditor5/";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Editor = () => {
  return (
    <>
      <CKEditor
        editor={CKEditorCustomBuild}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </>
  );
};

export default Editor;