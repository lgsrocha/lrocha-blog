import { getUserWithUsername, postToJSON, storage } from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { post, userType } from '@/Types/Global/Types';
import {  collection, getDocs, limit, orderBy, query as queue, where} from 'firebase/firestore';


export async function getServerSideProps({query} : {query : {username: string}}) {
  const {username} : {username: string} = query;
  
  const userDoc = await getUserWithUsername(username);

   // If no user, short circuit to 404 page
    if (!userDoc) {
      return {
        notFound: true,
      };
    }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    console.log(typeof query)
    user = userDoc.data();
    const postsQuery = queue(collection(storage, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
      );
    posts = ((await getDocs(postsQuery)).docs.map(postToJSON));
  }
  
  return {
    props: { user, posts}, // will be passed to the page component as props
  };
}
export default function UserProfilePage({ user, posts } :{user : userType, posts: [post]}) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}