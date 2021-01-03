import React from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {
    const { profileStore: { profile, followings, activeTab, loading } } = useStore()

    return (
        <Tab.Pane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={
                            activeTab === 3
                                ? `People following ${profile!.displayName}`
                                : `People ${profile!.displayName} is following`
                        }
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={5}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default ProfileFollowings;
