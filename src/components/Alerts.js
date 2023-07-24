import React from 'react'

export default function Alerts(props) {
  return (
    <div style={{height: '60px'}}>
      {props.alert && <div className="alert alert-success alert-dismissible fade show" role="alert">
                          <strong>{props.alert.type}</strong>: {props.alert.message}
              </div>}
              </div>
  )
}
