import React from 'react'
import { observer } from 'mobx-react-lite';
import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDetails: React.FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openEditForm, cancelFormOpen } = activityStore;

  if (!activity) return <LoadingComponent />
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => openEditForm(activity!.id)} basic color='blue' content='Edit'></Button>
          <Button onClick={cancelFormOpen} basic color='grey' content='Cancel'></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(ActivityDetails);
