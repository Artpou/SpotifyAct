import axios from 'axios';
import { useState } from 'react';

export function getAlbums(artists) {
  let s = 0;
  let e = 0;
  let i = 0;
  let albums = [];
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
              albums.push(album);
            }
          });
          console.log(`${i} | success : ${s++}`);
          if (i >= artists.length) {
            return albums;
          }
        })
        .catch(error => {
          i++;
          console.log(error);
          console.error(`error : ${e++}`);
        });
    });
}

export function getArtists() {
  const [loading,setLoading] = useState(true);
  var artists = [];

  async function recursiveGetArtistsRequest(next = '') {
    const nextPath = next !== '' ? `&after=${next}` : '';
    const url = `https://api.spotify.com/v1/me/following?type=artist${nextPath}&limit=50`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        artists = [...artists, ...res.data.artists.items];
        if (res.data.artists.cursors.after) {
          recursiveGetArtistsRequest(res.data.artists.cursors.after);
        } else {
        }
        console.log(loading);
        artists = [...artists, ...res.data.artists.items];
      })
      .catch(error => {
        console.error(error);
      });
  }

  return recursiveGetArtistsRequest();
}
