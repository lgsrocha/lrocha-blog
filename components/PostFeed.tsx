import Link from 'next/link';
import { PostFeedType, PostItem } from '@/Types/Global/Types';
import ReactMarkdown from 'react-markdown';
import React, { useState } from 'react';



export default function PostFeed({ posts, admin } : PostFeedType) : any {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }: PostItem) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead: number = +(wordCount / 100 + 1).toFixed(0);

  const MAX_PREVIEW_LENGTH = 35;

  // Truncate the content while preserving the last word
  const words = post.content.trim().split(/\s+/g);
  const shouldShowReadMore = words.length > MAX_PREVIEW_LENGTH;
  const truncatedContent = words.slice(0, MAX_PREVIEW_LENGTH).join(' ');

  // Add an ellipsis if the content is truncated
  const displayContent = shouldShowReadMore ? truncatedContent + '...' : truncatedContent;

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
          <strong>Autor{' '}
           <span className="link-text">@{post.username}</span>
          </strong>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>

      <div className="content-preview">
        <ReactMarkdown>{displayContent}</ReactMarkdown>
      </div>

      {shouldShowReadMore && !admin && (
        <Link href={`/${post.username}/${post.slug}`}>
          <button className="read-more-button">
            Continuar Lendo
          </button>
        </Link>
      )}

      <footer>
        <span>
          {wordCount} palavras. Leitura de ~{minutesToRead} {minutesToRead > 1 ? "minutos" : "minuto"}.
        </span>
        <span className="push-left">👍 {post.heartCount || 0} Curtidas</span>
      </footer>

      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">
              Editar
            </button>
          </Link>

          {post.published ? (
            <p className="text-success">Publicado!</p>
          ) : (
            <p className="text-danger">Não publicado</p>
          )}
        </>
      )}
    </div>
  );
}



