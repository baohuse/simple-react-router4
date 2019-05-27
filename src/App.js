import React from 'react';
import { Route, Link } from './simpleRRDOM/index'

const Test = () => <h1>测试</h1>
const New = () => <h1>新闻</h1>

function App() {
  return (
    <div>
      <Link to="/test">测试</Link>
      <Link to="/new">新闻</Link>

      😯
      <Route path="/test" component={Test}/>
      <Route path="/new" component={New}/>
    </div>
  );
}

export default App;
