import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core'; 

import { SearchBar, VideoList, VideoDetail } from './components';

import youtube from './api/youtube';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectVideo, setSelectVideo] = useState(null)
    
    const handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { 
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'API KEY',
                q: searchTerm
            }
        });

        setVideos(response.data.items)
        setSelectVideo(response.data.items[0])
    }

    const onVideoSelect = (video) => {
        setSelectVideo(video);
    }
    
    useEffect(() => {
        handleSubmit('javascript')
    }, [])

    return (
        <Grid justify="center" container spacing={10}>
            <Grid item xs={12}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onForSubmit={handleSubmit}/>
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetail video={selectVideo}/>
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={onVideoSelect}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default App;