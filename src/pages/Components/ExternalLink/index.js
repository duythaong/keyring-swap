import React from 'react'

const ExternalLink = ({ url, children }) => {
  let className = children.props.className || ''
  if (url) {
    return (
      <a href={url} target="_blank" without rel="noopener noreferrer">
        {React.cloneElement(children, { className })}
      </a>
    )
  }
  return React.cloneElement(children, { className })
}

export default ExternalLink
