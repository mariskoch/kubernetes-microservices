import Container from "@/components/Container";
import Link from "next/link";
import Modal from "@/components/Modal";

export default function Home({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const show = searchParams?.show;

    return (
        <div className={'flex justify-center'}>
            <Container classes={'mt-24'}>
                <h1 className={'text-3xl font-bold'}>Counters</h1>
                <Link href={'/?show=true'}
                      className={'border-solid border-2 border-gray-800 rounded-md px-3 ml-auto hover:bg-gray-800 ' +
                          'hover:text-gray-200 transition duration-200 flex items-center'}>New Counter
                </Link>
            </Container>

            {show && (<Modal show={Boolean(show)}></Modal>)}
        </div>
    );
}
