import { observer } from 'mobx-react-lite';
import React from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
    const { userStore: { isLoggedIn } } = useStore();

    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />}
        />
    )
}

export default observer(PrivateRoute)
