/* eslint-disable react/display-name */
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export default ({ route, children, activeOnlyWhenExact = true }) => {
  let className = children.props.className || ''
  let match = useRouteMatch({
    path: route,
    exact: activeOnlyWhenExact,
  })
  if (match) {
    className = `${className} selected`
  }
  if (route) {
    return <Link to={route}>{React.cloneElement(children, { className })}</Link>
  }
  return React.cloneElement(children, { className })
}
