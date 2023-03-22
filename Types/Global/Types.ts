import { Timestamp } from "firebase/firestore"
import internal from "stream"

export type user = {
        uid: string
        photoURL: string
        displayName: string
        username: string
}

export type post = {
        content: string
        createdAt: Timestamp
        heartCount: number
        published: boolean
        slug: string
        title: string
        uid: string
        updatedAt: Timestamp
        username: string   
}

export type PostFeed = {
    posts: [
        post
    ]
    admin: boolean | null
}

export type PostItem = {
    post : post
    admin: boolean | null
}

export type ServerSideProps = Promise<{
        props: {
            user: any;
            posts: any;
        };
    }>
