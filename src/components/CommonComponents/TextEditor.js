// https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/

// -------
import React, { useEffect, useState } from 'react';
import { ContentState, EditorState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './App.css';

function TextEditor({ convertedContent, setConvertedContent, setFormData, formData }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
//   const [editorState, setEditorState] = useState(() =>
//   EditorState.createWithContent(convertFromRaw(JSON.parse("<h1>Hello</h1>")))
// );;
  // const [convertedContent, setConvertedContent] = useState('<h1>ok</h1>');
  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(convertedContent))));

  }, [convertedContent])
  
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    // {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(currentContentAsHTML, 'this is current content as html');
    // setConvertedContent(currentContentAsHTML);
    if(formData)
    setFormData({...formData, bodyData: currentContentAsHTML});
  };

  return (
    <div style={{ border: '1px solid gray', borderRadius: 10, padding: '5px' }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
}

export default TextEditor;