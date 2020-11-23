import React from 'react';

import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu, {} from './components/Menu/menu';
import MenuItem, {} from './components/Menu/menuItem';
import SubMenu, {} from './components/Menu/subMenu';

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
        <h4>menu</h4>
        <Menu>
          <MenuItem>菜单0</MenuItem>
          <MenuItem disabled>菜单1</MenuItem>
          <MenuItem>菜单2</MenuItem>
          <SubMenu title="drop1">
            <MenuItem>菜单3-0</MenuItem>
            <MenuItem>菜单3-1</MenuItem>
          </SubMenu>
          <SubMenu title="drop2">
            <MenuItem>菜单4-0</MenuItem>
            <MenuItem>菜单4-1</MenuItem>
          </SubMenu>
        </Menu>
        <Menu mode="vertical">
          <MenuItem>菜单0</MenuItem>
          <MenuItem>菜单1</MenuItem>
          <MenuItem>菜单2</MenuItem>
          <SubMenu title="drop1">
            <MenuItem>菜单3-0</MenuItem>
            <MenuItem>菜单3-1</MenuItem>
          </SubMenu>
          <SubMenu title="drop2">
            <MenuItem>菜单4-0</MenuItem>
            <MenuItem>菜单4-1</MenuItem>
          </SubMenu>
        </Menu>
      </div>
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
