import React from 'react';

import Button, {ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h4>button</h4>
        <Button>null</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>danger large</Button>
        <Button btnType={ButtonType.Link} href='www.baidu.com'>link</Button>
        <Button disabled btnType={ButtonType.Link} href='www.baidu.com'>disabled link</Button>
        <Button disabled btnType={ButtonType.Primary} size={ButtonSize.Small}>disabled primary small</Button>
      </div>
    </div>
  );
}

export default App;
