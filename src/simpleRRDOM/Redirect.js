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

class Redirect extends React.Component {
    static defaultProps = {
        push: false
      }
    static propTypes = {
        to: PropTypes.string.isRequired,
        push: PropTypes.bool
    }
    componentDidMount() {
        const { to, push } = this.props
    
        push ? historyPush(to) : historyReplace(to)
      }
    render() {
        return null
    }
}

export default Redirect;