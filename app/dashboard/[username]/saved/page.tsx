import { PageTitle, ProfileTabs } from "@/components/dashboard";
import { PostsGrid } from "@/components/dashboard";

const posts = [
    {
        id: "1",
        fileUrl: "/assets/demo.jpeg",
        likes_count: 40,
        bookmark_count: 50,
        description: "description"
    },
    {
        id: "2",
        fileUrl: "/assets/demo.jpeg",
        likes_count: 40,
        bookmark_count: 50,
        description: "description"
    },
    {
        id: "3",
        fileUrl: "/assets/demo.jpeg",
        likes_count: 40,
        bookmark_count: 50,
        description: "description"
    },
];

export default function Page() {
    return (
        <div>
            <PageTitle title="Your profile" />
            <ProfileTabs isCurrentUser={true} username="ado" />
            <PostsGrid posts={posts} />
        </div>
    );
}