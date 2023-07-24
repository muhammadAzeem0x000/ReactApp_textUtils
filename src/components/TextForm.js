import React, {useState} from "react";


export default function TextForm(prop) {
    const [text, setText] = useState("");

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
        prop.showAlert("Converted to UPPERCASE", "Success");
    }

    const handlelowClick = ()=>{
      let newText = text.toLowerCase();
      setText(newText);
      prop.showAlert("Converted to lowercase", "Success");
    }

    const handleCopy = ()=>{
      navigator.clipboard.writeText(text);
      prop.showAlert("Copied to Clipboard", "Success");
    }

    const handleExtraSpaces = ()=>{
      let newText = text.split(/[ ]+/);
      setText(newText.join(" "));
      prop.showAlert("Extra spaces removed", "Success")
    }

    const handleOnChange = (event)=>{
        setText(event.target.value);
    }
    
  return (
    <>
    <div className="container" style={{color: prop.mode === 'light' ? 'black' : 'white'}}>
        <h1>{prop.heading}</h1>
      <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8" style={{backgroundColor: prop.mode === 'light' ? 'white' : 'rgb(21, 76, 76)', color: prop.mode === 'light' ? 'black' : 'white'}}></textarea>
      </div>
      <button disabled={text.length === 0} className="btn btn-success mx-2 my-2" onClick={handleUpClick}>Convert to UPPERCASE</button>
      <button disabled={text.length === 0} className="btn btn-success mx-2 my-2" onClick={handlelowClick}>Convert to lowercase</button>
      <button disabled={text.length === 0} className="btn btn-success mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
      <button disabled={text.length === 0} className="btn btn-success mx-2 my-2" onClick={handleCopy}>Copy</button>
    </div>
    <div className="container my-3" style={{color: prop.mode === 'light' ? 'black' : 'white'}}>
      <h1>Word and Character count</h1>
      <p>Typed {text.split(" ").filter((element)=>{return element.length!==0}).length} Words & {text.length} Characters</p>
      <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
      <h2>Preview</h2>
      <p>{text.length>0 ? text : "Nothing to previe"}</p>
    </div>
    </>
  );
}
