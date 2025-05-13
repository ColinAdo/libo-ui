import { Read } from "@/components/dashboard/books";

interface Props {
    params: {
        id: string;
    };
}

export default function Page({ params: { id } }: Props) {
    return (
        <div className="mt-12">
            <Read id={id} />
        </div>
    );
}