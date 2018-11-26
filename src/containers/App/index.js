import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router';
import {Container, Dimmer, Loader, Message} from 'semantic-ui-react';
import {getErrors, getIsLoading, getUserID} from '../../redux/app/selectors';
import {start} from '../../redux/app/actions';
import ROUTES from '../../routes';

class App extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    onStart: PropTypes.func.isRequired,
    userID: PropTypes.string
  };

  static defaultProps = {
    isLoading: false,
    userID: null
  }

  componentDidMount () {
    this.props.onStart();
  }

  render () {
    return (
      <div>
        <Dimmer active={this.props.isLoading} inverted={true}>
          <Loader size='huge'>Loading</Loader>
        </Dimmer>
        {this.props.errors && <>
          <br />
          <Container>
            {
              Object.entries(this.props.errors)
                // eslint-disable-next-line react/forbid-component-props
                .map(([key, error]) => <Message negative={true} key={key} style={{zIndex: 1000}}>
                  <Message.Header>{error.title}</Message.Header>
                  <p>{error.message}</p>
                </Message>)
            }
          </Container>
        </>
        }
        {this.props.userID && <Switch>
          {Object.entries(ROUTES).map(([key, route]) => <Route key={key} {...route} />)}
        </Switch>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: getErrors(state),
  userID: getUserID(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  onStart: () => dispatch(start())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
