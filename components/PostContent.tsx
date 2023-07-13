import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useUserData } from '@/lib/hooks';

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  const formattedDate = createdAt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Escrito por{" "}
        <Link className="text-info" href={`/${post.username}/`}>
          @{post.username}
        </Link>{' '}
        em {formattedDate}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}