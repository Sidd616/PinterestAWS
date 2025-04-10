import { Storage } from 'aws-amplify';

async function uploadPhoto(file) {
  try {
    const user = await Auth.currentAuthenticatedUser(); // Get the current user
    const fileName = `${Date.now()}-${file.name}`; // Unique file name
    await Storage.put(fileName, file, {
      level: 'private', // Restrict to the user
      contentType: file.type, // Set the correct MIME type
    });
    console.log('Photo uploaded successfully');
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
}

// Example usage in a component
function PhotoUploader() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) uploadPhoto(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
