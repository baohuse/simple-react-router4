import React from 'react'
import PropTypes from 'prop-types'
//所有Route实例
import { instances } from './Route'

const historyPush = (path) => {
    window.history.pushState({}, null,path)
    instances.forEach(instance => instance.forceUpdate())
}
const historyReplace = (path) => {
    window.history.replaceState({}, null,path)
    instances.forEach(instance => instance.forceUpdate())
}

class Link extends React.Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
        replace: PropTypes.bool
    }
    handleClick = (event) => {
        const { replace, to } = this.props
        event.preventDefault()
        //history操作
        replace ? historyReplace(to) : historyPush(to)
    }
    render() {
        const { to, children} = this.props
        return (
            <a href={to} onClick={this.handleClick}>
                {children}
            </a>
        )
    }
}

export default Link;