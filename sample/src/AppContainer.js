import React from 'react';
import { connect } from 'react-redux';
import App from './App';
import { login, logout } from '@junicus_/react-msal-redux';

const AppContainer = props => {
  return <App user={props.auth.user} accessToken={props.auth.accessToken} login={props.login} logout={props.logout} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login({ popup: true, scopes: ['openid'] })),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
