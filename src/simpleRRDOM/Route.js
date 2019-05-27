//伪代码
//Route这个组件是干嘛的？ 当 url 匹配到你在 Route 的 path 这个props时，展示一些UI
// 匹配到？
import React, { Component} from 'react';
import PropTypes from 'prop-types';

//Route组件的实例
let instances = []

const register = (comp) => instances.push(comp)
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1)


class Route extends Component {
    static propTypes = {
        exact: PropTypes.bool,
        path: PropTypes.string,
        component: PropTypes.func,
        render: PropTypes.func
    }
    componentWillMount() {
        window.addEventListener('popstate', this.handlePop)
        register(this)
    }
    //组件被移除时触发  
    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePop)
        unregister(this)
    }

    handlePop = () => {
        console.log('路由变化了')
        this.forceUpdate()
    }
    render() {
        const { path, exact, component, render} = this.props;
        //判断是否匹配
        const match = matchPath(window.location.pathname, {path, exact})

        if(!match) {
            //location doesn't match the path prop
            return null
        }
        if(component) {
            //match ? what? 就是跟路由相关的一些info
            return React.createElement(component, { match })
        }
        if(render) {
            return render({ match})
        }
        return null
    }
}
//判断当前 url 与Route的 path props是否匹配

const matchPath = (pathname, options) => {
    const { exact=false, path} = options;
    // .exec 如果找到匹配项,则返回一个包含匹配文本的数组，否则返回null
    const match = new RegExp(`^${path}`).exec(pathname)
    console.log(match)
    if(!match) {
        return null
    }
    const url = match[0];
    const isExact = pathname === url;
    if(exact && !isExact) {
        return null
    }
    return {
        path,
        url,
        exact
    }
}

export { Route, matchPath, instances}