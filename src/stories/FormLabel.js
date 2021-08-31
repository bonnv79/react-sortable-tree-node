
import React from 'react';

const FormLabel = ({ children, label, style, labelStyle, contentStyle }) => (
  <div style={{ display: 'flex', marginBottom: 8, marginRight: 12, ...style }}>
    {
      label && (
        <div
          style={{
            marginRight: 6,
            color: '#bdbdbd',
            fontSize: '0.8em',
            display: 'flex',
            alignItems: 'center',
            ...labelStyle
          }}
        >
          {label}
        </div>
      )
    }
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        fontSize: '0.9em',
        ...contentStyle
      }}
    >
      {children}
    </div>
  </div>
)

export default FormLabel;