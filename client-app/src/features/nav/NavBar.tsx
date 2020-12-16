import React from 'react'
import { observer } from 'mobx-react-lite';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

const NavBar: React.FC = () => {
    const { activityStore } = useStore();
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                Reactivities
            </Menu.Item>

                <Menu.Item
                    name='activities'
                />
                <Menu.Item>
                    <Button onClick={activityStore.openCreateForm} type='button' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);