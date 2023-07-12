import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { storage, auth } from '../../lib/firebase';
import ImageUploader from '../../components/ImageUploader';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { doc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
        <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { slug } = router.query;
    let post
    let postRef = doc(storage, 'users', 'default', 'posts', 'default');
    if(auth.currentUser){
        postRef = doc(storage, 'users', auth.currentUser.uid, 'posts', slug as string);
    }

    [post] = useDocumentData(postRef);

    async function deletePost() {
        if (window.confirm("Tem certeza de que deseja excluir este post?")) {
            await deleteDoc(postRef);
            toast.success('Post deletado!');
            router.push('/admin'); // redirect to admin page after post deletion
        }
    }

    return (
        <main className={styles.container}>
        {post && (
            <>
                <section>
                    <h1>{post.title}</h1>
                    {/* <p>ID: {post.slug}</p> */}

                    <PostForm postRef={postRef} defaultValues={post} preview={preview} />
                </section>

                <aside>
                <h3>Ferramentas</h3>
                    <button onClick={() => setPreview(!preview)}>{preview ? 'Editar' : 'Prévia'}</button>
                    <button className="btn-red" onClick={deletePost}>Excluir</button>
                    {/* <Link href={`/${post.username}/${post.slug}`}>
                    <button className="btn-blue">Live view</button>
                    </Link> */}
                </aside>
            </> 
        )}
        </main>
    );
}

function PostForm({ defaultValues, postRef, preview }) {
    const { register, handleSubmit, reset, watch, formState, formState: { errors } } = useForm({ defaultValues, mode: 'onChange' });
    const { isValid, isDirty } = formState;
    const updatePost = async ({ content, published }) => {
        await updateDoc(postRef,{
        content,
        published,
        updatedAt: serverTimestamp(),
        });

        reset({ content, published });

        toast.success('Post publicado!')
    };

    const handleImageUpload = (snippet) => {
        // The callback function: merges the snippet with the current content value
        reset({ content: watch('content') + '\n' + snippet, published: watch('published') });
      };

    return (
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (
                <div className="card">
                <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
            )}

            <div className={preview ? styles.hidden : styles.controls}>
                <ImageUploader onUploadComplete={handleImageUpload} />

                <textarea
                    {...register(
                            "content",{
                                maxLength: { value: 20000, message: 'O conteúdo Passou dos limites' },
                                minLength: { value: 10, message: 'Escreva ao menos 11 caracteres' },
                                required: { value: true, message: 'É necessário algum contéudo para o seu post'}
                            }
                        )
                    }>
                </textarea>
        
                {errors.content && <p className="text-danger">{errors.content.message as string}</p>}

                <fieldset>
                    <input className={styles.checkbox} type="checkbox" {...register("published")} />
                    <label>Publicar</label>
                </fieldset>

                <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
                    Salvar Alterações
                </button>
            </div>
        </form>
    );
}