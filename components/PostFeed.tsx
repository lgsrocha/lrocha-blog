import Link from 'next/link';
import { PostFeedType, PostItem } from '@/Types/Global/Types';
export default function PostFeed({ posts, admin } : PostFeedType) : any {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false } : PostItem) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead : number  = +(wordCount / 100 + 1).toFixed(0);

  return (  
    <div className="card">
      <Link href={`/${post.username}`}>
          <strong>Autor{' '}
           <span className="link-text">@{post.username}</span>
          </strong>
          
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          {post.title}
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} palavras. Leitura de ~{minutesToRead} {minutesToRead > 1 ? "minutos" : "minuto"}.
        </span>
        <span className="push-left">👍 {post.heartCount || 0} Curtidas</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Editar</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Publicado!</p> : <p className="text-danger">Não publicado</p>}
        </>
      )}
    </div>
  );
}