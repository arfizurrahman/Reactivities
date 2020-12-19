import React, { Fragment } from 'react';
import { Item, Label, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
    const { activityStore: { activitiesByDate } } = useStore();
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group} >
                    <Divider horizontal>{group}</Divider>
                    {/* <Label size="large" color="blue">
                        
                    </Label> */}
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}

        </Fragment>
    );
};

export default observer(ActivityList);
