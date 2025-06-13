// QuillEditor.jsx
import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = ({field, form}) => {
  const [value, setValue] = useState('');

  // Set initial content if available (HTML string)
  useEffect(() => {
    if (field?.value) {
      setValue(field.value);
    }
  }, [field.value]);

  const handleChange = (content) => {
    setValue(content);
    form.setFieldValue(field.name, content); // Send HTML to formik/yup or custom form handler
  };

  return (
    <div className="quill-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Write something here..."
      />
    </div>
  );
};

export default QuillEditor;
