import { storage, auth } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, DocumentReference, increment, writeBatch } from 'firebase/firestore';
import { stringify } from 'querystring';

// Allows user to heart or like a post
export default function Heart({ postRef } : {postRef : DocumentReference}) {
  // Listen to heart document for currently logged in user
    const heartsRef = collection(postRef, 'hearts');

    const heartRef = doc(heartsRef, auth.currentUser ?  auth.currentUser.uid : "");
    const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
    const addHeart = async () => {
    const uid = auth.currentUser ? auth.currentUser.uid: "";
    const batch = writeBatch(storage);

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = writeBatch(storage);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
}