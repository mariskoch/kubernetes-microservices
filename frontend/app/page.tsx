import Container from "@/components/Container";

export default function Home() {
    return (
        <div className={'flex justify-center'}>
            <Container classes={'mt-24'}>
                <h1 className={'text-3xl font-bold'}>Counters</h1>
                <button className={'border-solid border-2 border-gray-800 rounded-md px-3 ml-auto hover:bg-gray-800 ' +
                    'hover:text-gray-200 transition duration-200'}>New Counter
                </button>
            </Container>
        </div>
    );
}

