// import { Storage } from 'aws-amplify';
// import { useState, useEffect } from 'react';

// function ProfileTab() {
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     fetchPhotos();
//   }, []);

//   async function fetchPhotos() {
//     try {
//       const photoList = await Storage.list('', { level: 'private' }); // List files in user's private directory
//       const photoUrls = await Promise.all(
//         photoList.results.map(async (photo) => {
//           const url = await Storage.get(photo.key, { level: 'private' });
//           return { key: photo.key, url };
//         })
//       );
//       setPhotos(photoUrls);
//     } catch (error) {
//       console.error('Error fetching photos:', error);
//     }
//   }

//   return (
//     <div>
//       <h2>Your Photos</h2>
//       {photos.map((photo) => (
//         <img key={photo.key} src={photo.url} alt="User upload" style={{ maxWidth: '200px' }} />
//       ))}
//     </div>
//   );
// }

// export default ProfileTab;
