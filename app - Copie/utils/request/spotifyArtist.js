/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import axios from 'axios';

export function GetArtists() {
  const [artists, setArtists] = useState([]);
  const [loadingArtists, setloadingArtists] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbum, setloadingAlbum] = useState(true);

  function getArtistsRequest(next = '') {
    const nextPath = next !== '' ? `&after=${next}` : '';
    const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        // setArtists([...artists, ...['res.data.artists.items']]);
        setArtists(Array.prototype.push.apply(artists, res.data.artists.items));
        setArtists([...artists, ...res.data.artists.items]);
        if (res.data.artists.cursors.after) {
          getArtistsRequest(res.data.artists.cursors.after);
        } else {
          setloadingArtists(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getAlbums() {
    let i = 0;
    const tmpArtists = [];
    artists
      .map(function filter(a) {
        return a.id;
      })
      .forEach(id => {
        const url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=3&include_groups=album&market=FR`;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(res => {
            i++;
            res.data.items.forEach(album => {
              if (new Date(album.release_date) > new Date('2020-11')) {
                tmpArtists.push(album);
              }
            });
            if (i >= artists.length) {
              setloadingAlbum(false);
              console.log(tmpArtists);
              setAlbums(tmpArtists);
            }
          })
          .catch(error => {
            i++;
            console.log(error);
          });
      });
  }

  useEffect(() => {
    getArtistsRequest();
  }, []);

  useEffect(() => {
    if (!loadingArtists && loadingAlbum) {
      getAlbums();
    }
  });

  return (
    <div>
      <Button onClick={() => getAlbums()}>getAlbums</Button>
      <Grid container spacing={3}>
        {Array.from(albums).map(a => (
          <Grid id={a.id} item xs={3}>
            <Paper>
              <img src={a.images[1].url} style={{display: 'block'}}/>
              {a.artists[0].name} : {a.name}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
