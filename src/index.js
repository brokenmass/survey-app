import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Main from './Main';
import store, {history} from './redux/store';
/* eslint-disable import/no-unassigned-import */
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
/* eslint-enable import/no-unassigned-import */

const applicationRoot = document.getElementById('main');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    applicationRoot
  );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Main', () => {
    // eslint-disable-next-line no-console
    console.log('Reloading UI');

    // eslint-disable-next-line global-require
    render(require('./Main').default);
  });
}
