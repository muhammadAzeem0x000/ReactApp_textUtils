import React from 'react'
import propType from 'prop-types'
import {Link} from 'react-router-dom'

export default function navbar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className={`navbar-brand text-${props.mode === 'light' ? 'dark' : 'light'}`} to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'} active`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link text-${props.mode === 'light' ? 'dark' : 'light'}`} to="/about">{props.aboutText}</Link>
        </li>
      </ul>
          <div className="form-check form-switch">
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
            <label className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'}`} htmlFor="flexSwitchCheckDefault">Switch Mode</label>
          </div>
    </div>
  </div>
</nav>
    </div>
  )
}

navbar.propType = {
    title: propType.string,
    aboutText: propType.string
}

navbar.defaultProps = {
    title: "Default title",
    aboutText: "Default About"
}