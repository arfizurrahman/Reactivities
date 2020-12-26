import React, { useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import LoginForm from '../../features/user/LoginForm';
import NotFound from '../../app/layout/NotFound';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useStore } from '../stores/store';
import ModalContainer from '../common/modals/ModalContainer'
import LoadingComponent from './LoadingComponent';

const App: React.FC<RouteComponentProps> = observer(({ location }) => {
  const { commonStore: { setAppLoaded, token, appLoaded }, userStore: { getUser } } = useStore();

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
});

export default withRouter(App);
