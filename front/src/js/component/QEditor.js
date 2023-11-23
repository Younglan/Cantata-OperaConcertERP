 import React from "react";
import ReactQuill, {Quill} from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import "../../css/QEditor.css";
import { useRef, useEffect } from "react";


Quill.register("modules/imageResize", ImageResize);


const QEditor = ({ placeholder, value, ...rest }) => {

  

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
]; 


// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
  imageResize: {
    // https://www.npmjs.com/package/quill-image-resize-module-react 참고
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};


  
  useEffect(() => {
    
    
    if (quillRef.current) {
      const {getEditor} = quillRef.current;
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      // toolbar.addHandler("image", handleImage);

      //toolbar를 선택해서 핸들러를 추가해주는 방법
      const handleImage = () => {
  //       const input = document.createElement("input");
  //       input.setAttribute("type", "file");
  //       input.setAttribute("accept", "image/*");
  //       input.click();
  //       input.onchange = async () => {
  //         const file = input.files[0];

  //         // 현재 커서 위치 저장
  //         const range = getEditor().getSelection(true);

  //         // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
  //         getEditor().insertEmbed(range.index, "image", `/images/loading.gif`);

  //         try {
  //             // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다 
  //             // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다 
  //             const filePath = `contents/temp/${Date.now()}`;
  //             const url = await uploadImage(file, filePath); 
              
  //             // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
  //             getEditor().deleteText(range.index, 1);
  //             // 받아온 url을 이미지 태그에 삽입
  //             getEditor().insertEmbed(range.index, "image", url);
              
  //             // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
  //             getEditor().setSelection(range.index + 1);
  //         } catch (e) {
  //             getEditor.deleteText(range.index, 1);
  //         }
  // };
};


    }



    
  }, []);


   // quill 에디터 컴포넌트 ref
  const quillRef = useRef(null);
  
  return (
    <div className="aaa">
  {/* 테마 (bubble, snow, custom) https://quilljs.com/docs/themes/ */}
      <ReactQuill
                  {...rest}
                  ref={quillRef}
                  value={value || ""}
                  theme="snow"
                  modules={{
                    ...modules,
                    imageResize: {
                      parchment: Quill.import("parchment"),
                      modules: ["Resize", "DisplaySize", "Toolbar"],
                    },
                  }}
                  formats={formats}
                  placeholder={placeholder}
                  preserveWhitespace
                  className="customQEdit"
    ></ReactQuill>

    <button>등록</button>
    </div>
  );
};

export default QEditor;