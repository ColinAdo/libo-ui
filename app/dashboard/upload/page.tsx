import { PageTitle } from '@/components/dashboard';
import { UploadBookForm } from '@/components/dashboard/books';
import {
    Card,
    CardContent
} from "@/components/ui/card";


export default function Page() {
    return (
        <div className='mt-12 flex justify-center'>
            <Card className='w-[400px] py-6'>
                <CardContent>
                    <UploadBookForm />
                </CardContent>
            </Card>

        </div>
    );
}