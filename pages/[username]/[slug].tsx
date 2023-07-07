import AuthCheck from "@/components/AuthCheck";
import Heart from "@/components/HeartButton";
import PostContent from "@/components/PostContent";
import { getUserWithUsername, postToJSON, storage } from "@/lib/firebase";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useDocumentData } from 'react-firebase-hooks/firestore'
import styles from '../../styles/Post.module.css';


export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);
  
    let post;
    let path;
  
      
    if (userDoc) {
    const postRef = doc(userDoc.ref, 'posts', slug);
      post = postToJSON(await getDoc(postRef));
  
      path = postRef.path;
    }
  
    return {
      props: { post, path },
      revalidate: 5000,
    };
}

export async function getStaticPaths() {
    // Improve using Admin SDK to select empty docs
    const snapshot = await getDocs(collectionGroup(storage, 'posts'));
  
    const paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();
      return {
        params: { username, slug },
      };
    });
  
    return {
      // must be in this format:
      // paths: [
      //   { params: { username, slug }}
      // ],
      paths,
      fallback: 'blocking',
    };
  }

export default function PostPage (props) {
    const postRef = doc(storage, props.path)
    const [realtimePost] =  useDocumentData(postRef)

    const post = realtimePost || props.post

    return (
        <main className={styles.container}>

            <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                <strong>{post.heartCount < 1 ? "Sem" : post.heartCount} {post.heartCount > 1 ? "Curtidas" : "Curtida"} </strong>
                </p>
                <AuthCheck
                  fallback={
                    <Link href="/enter">
                      <button>💗 Se Cadastrar</button>
                    </Link>
                  }
                >
                  <Heart postRef={postRef} />
                </AuthCheck>

            </aside>
    </main>
    )
}