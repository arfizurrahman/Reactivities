import React from 'react'
import { observer } from 'mobx-react-lite';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/' >
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                Reactivities
            </Menu.Item>

                <Menu.Item
                    name='activities' as={NavLink} to='/activities'
                />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' type='button' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);