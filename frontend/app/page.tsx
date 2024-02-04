'use client';

import Container from "@/components/Container";
import Link from "next/link";
import Modal from "@/components/Modal";
import React from "react";
import ModalBody from "@/components/ModalBody";
import ModalFooter from "@/components/ModalFooter";
import {useRouter} from "next/navigation";

export default function Home({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const show = searchParams?.show;
    const router = useRouter();

    const navigateHome = () => {
        router.push('/');
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        console.log(data);
        fetch('/api/submit', {
            method: 'POST',
        }).then((res) => {

        }).catch((err) => {

        });

        //navigateHome();
    }

    return (
        <div className={'flex justify-center'}>
            <Container classes={'mt-24'}>
                <h1 className={'text-3xl font-bold'}>Counters</h1>
                <Link href={'/?show=true'}
                      className={'border-solid border-2 border-gray-800 rounded-md px-3 ml-auto hover:bg-gray-800 ' +
                          'hover:text-gray-200 transition duration-200 flex items-center'}>New Counter
                </Link>
            </Container>

            {show && (<Modal show={Boolean(show)} title={'Create a Counter'}>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <div className={'grid grid-cols-12 gap-4'}>
                            <div className={'flex items-center col-span-4 font-bold'}>
                                Counter Name:
                            </div>
                            <div className={'flex items-center col-span-8'}>
                                <input type={'text'} name={'counterName'}
                                       className={'border-solid border-[1px] border-gray-600 rounded-md p-2 w-full'}/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type={"submit"}
                                className={'px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:bg-gray-600'}>
                            Create
                        </button>
                    </ModalFooter>
                </form>
            </Modal>)}
        </div>
    );
}
