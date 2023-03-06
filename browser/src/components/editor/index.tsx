import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// const CKEditorCustomBuild = require("../../ckeditor5");
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Editor.css";
import { CustomUploadAdapter } from "./imageUploadAdapter";
interface IEditor {
  inititalData?: string;
  data: string;
  setData: (data: string) => void;
}

const extraPLugins = [CustomUploadAdapter];

const Editor = ({ data, setData }: IEditor) => {
  return (
    <div className="w-full h-full">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
          image: {
            resizeUnit: "%",
            resizeOptions: [
              {
                name: "resizeImage:original",
                value: null,
                icon: "original",
              },
            ],
            styles: {
              options: [
                "inline",
                "alignLeft",
                "alignRight",
                "alignCenter",
                "alignBlockLeft",
                "alignBlockRight",
                "block",
                "side",
              ],
            },

            toolbar: [
              "imageStyle:inline",
              "imageStyle:wrapText",
              "imageStyle:breakText",
              "|",
              // "toggleImageCaption",
              "imageTextAlternative",
              "linkImage",
            ],
          },
        }}
        onReady={(editor) => {
          extraPLugins.forEach((plugin) => {
            plugin(editor);
          });
        }}
        onChange={(event, editor) => {
          setData(editor.getData());
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default Editor;
