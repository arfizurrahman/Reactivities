import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import LoadingComponent from '../../app/layout/LoadingComponent';

interface RouteParams {
    username: string;
}

const ProfilePage: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
    const { profileStore: { loadingProfile, loadProfile, profile, follow, unfollow, isCurrentUser, loading, setActiveTab } } = useStore()

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match]);

    if (loadingProfile) return <LoadingComponent content="Loading profile..." />

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!}
                    isCurrentUser={isCurrentUser}
                    loading={loading}
                    follow={follow}
                    unfollow={unfollow} />
                <ProfileContent setActiveTab={setActiveTab} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage)
