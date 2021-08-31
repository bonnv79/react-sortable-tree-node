import React from 'react';

export default function BlankA({ path, children, ...props }) {

  return (
    <a
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        textDecoration: 'none',
        fontSize: 12
      }}
      target="blank"
      href={path}
      {...props}
    >
      {children}
    </a>
  )
}