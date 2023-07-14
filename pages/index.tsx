import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { storage, fromMillis, postToJSON } from '../lib/firebase';
import { collectionGroup, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// o máximo de posts pesquisados por página
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(storage,"posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const querySnapshot = await getDocs(postsQuery);
  const posts = querySnapshot.docs.map(postToJSON)

  return {
    props: { posts }, // will be passed to the page component as props
  };
}


export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);


  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const morePostsQuery = query(
      collectionGroup(storage,"posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const morePostsQuerySnapshot = await getDocs(morePostsQuery);
    const newPosts = morePostsQuerySnapshot.docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
        {/* post Fixo temporário */}
        <div className="cardFixo"><a href="/lucasdev">
          <strong>Autor <span className="link-text">@lucasdev</span></strong></a><a href="/lucasdev/bem-vindo"><h2>Bem Vindo!</h2></a><footer><span>265 palavras. Leitura de ~4minutos.</span><span className="push-left"></span></footer>
        </div>

        <PostFeed posts={posts} admin={false} />

        {!postsEnd && <button onClick={getMorePosts}>Carregar Mais</button>}

        <Loader show={loading} />

        {postsEnd && 'Acabaram os posts!'}
      </main>
      
  )
 }

