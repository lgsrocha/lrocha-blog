
import { getDownloadURL, ref, StorageReference, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { auth, fileStorage, STATE_CHANGED } from '../lib/firebase';
import Loader from './Loader';

// Uploads images to Firebase Storage
export default function ImageUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file : any= Array.from(e.target.files)[0];
    const extension : string = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    let bucketRef : any
    if(auth.currentUser){
    bucketRef = ref(fileStorage, `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    }
    setUploading(true);

    // Starts the upload
    const task = uploadBytesResumable(bucketRef,file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct : any = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
        .then((d) => getDownloadURL(bucketRef))
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
          onUploadComplete && onUploadComplete(`![alt](${url})`);
        });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}
    
      {!uploading && (
        <>
          <label className="btn">
            📸 Carregar Imagem
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
        </>
      )}

      {downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>}
    </div>
  );
}