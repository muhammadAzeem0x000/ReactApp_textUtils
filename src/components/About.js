export default function About(props) {

    let myStyle = {
        color: props.mode === 'light'? '#362d2d':'white',
        backgroundColor: props.mode === 'dark'? '#362d2d':'white'
    }

  return (
            <div className='container my-3' style={myStyle}>
                <h1>About Us</h1>
                <h5 style={{color: "green"}}>Developed By MUHAMMAD AZEEM (20-SE-28)</h5>
            </div>
  )
}
