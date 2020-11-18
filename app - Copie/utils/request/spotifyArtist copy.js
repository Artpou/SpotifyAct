/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
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
        console.log(artists);
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

  function load() {
    let s = 0;
    let e = 0;
    let i = 0;
    var tmpArtists = [];
    artists
      .map(function filter(a) {
        return a.id;
      })
      .forEach(id => {
        const url = `https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=3&include_groups=album,single,compilation,appears_on&market=FR`;
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
            console.log(`${i} | success : ${s++}`);
            if (i >= artists.length) {
              setloadingAlbum(false);
              setAlbums(tmpArtists);
            }
          })
          .catch(error => {
            i++;
            console.log(error);
            console.error(`error : ${e++}`);
          });
      });
  }

  useEffect(() => {
    getArtistsRequest();
  }, []);

  useEffect(() => {
    if (!loadingAlbum) {
      console.log('done');
      console.log(albums);
    }
  });

  return (
    <div>
      <Button onClick={() => load()}>load</Button>
      <ul>
        {loadingArtists
          ? 'loadingArtists'
          : Array.from(artists).map(a => (
            <li>
              {a.name} : {a.id}
            </li>
          ))}
      </ul>
    </div>
  );
}
