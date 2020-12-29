import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

const ProfilePhotos = () => {
    const { profileStore:
        { profile,
            isCurrentUser,
            uploadPhoto,
            uploadingPhoto,
            setMainPhoto,
            deletePhoto,
            loading
        } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser &&
                        <Button floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />}
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadPhoto} loading={uploadingPhoto} />
                    ) : (
                            <Card.Group itemsPerRow={5}>
                                {profile && profile.photos.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser &&
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    name={photo.id}
                                                    onClick={(e) => {
                                                        setTarget(e.currentTarget.name);
                                                        setMainPhoto(photo)
                                                    }}
                                                    loading={loading && target === photo.id}
                                                    disabled={photo.isMain}
                                                    basic positive content='Main' />
                                                <Button
                                                    name={photo.id}
                                                    onClick={(e) => {
                                                        setDeleteTarget(e.currentTarget.name);
                                                        deletePhoto(photo)
                                                    }}
                                                    disabled={photo.isMain}
                                                    loading={loading && deleteTarget === photo.id}
                                                    basic negative icon='trash' />
                                            </Button.Group>
                                        }
                                    </Card>
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
