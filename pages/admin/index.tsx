import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { storage, auth, serverTimestamps } from '../../lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { collection, doc, DocumentData, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { post } from '@/Types/Global/Types';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
    var posts
    if (auth.currentUser) {
    const ref = collection(doc(storage, 'users', auth.currentUser.uid), 'posts');
    const busca = query(ref,orderBy("createdAt"))
    const [querySnapshot] = useCollection(busca);
    posts = querySnapshot?.docs.map((doc) => doc.data());
    }else{}

  return (
    <>
      <h1>Administrar seus Posts</h1>
      <PostFeed posts={posts as [post]} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    if(auth.currentUser){
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = doc(storage, 'users', uid, 'posts', slug);
        // Tip: give all fields a default value here
        const data = {
        title,
        slug,
        uid,
        username,
        published: false,
        content: 'Deixe sua mensagem aqui!',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
        };

        await setDoc(ref, data);

        toast.success('Post Criado!')

        // Imperative navigation after doc is set
        router.push(`/admin/${slug}`);
    }
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título para um novo post..."
        className={styles.input}
      />
      { title.length > 0 && title.length < 4 &&<span className="warning">Dê um nome para o seu post com ao menos 4 caracteres.</span>}
      {/* <p>
        <strong>url:</strong> {'/'}{slug}
      </p> */}
      <button type="submit" disabled={!isValid} className="btn-green">
        Criar novo post
      </button>
    </form>
  );
}