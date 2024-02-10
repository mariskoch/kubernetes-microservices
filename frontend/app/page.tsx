'use client';

import Container from "@/components/Container";
import Link from "next/link";
import Modal from "@/components/Modal";
import React, {useEffect, useState} from "react";
import ModalBody from "@/components/ModalBody";
import ModalFooter from "@/components/ModalFooter";
import {useRouter} from "next/navigation";
import {toast, Toaster} from "sonner";
import CounterList from "@/components/custom/CounterList";

export default function Home({searchParams}: { searchParams: { [_key: string]: string | string[] | undefined } }) {
    const show = searchParams?.show;
    const router = useRouter();

    const [avg, setAvg] = useState<number>(0);
    const [sum, setSum] = useState<number>(0);
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);

    useEffect(() => {
        fetch('/api/statistics')
            .then(response => response.json())
            .then(data => {
                setAvg(data.average);
                setSum(data.sum);
                setMin(data.min);
                setMax(data.max);
            })
            .catch(error => toast.error('Could not connect to backend'));
    }, [show]);

    const navigateHome = () => {
        router.push('/');
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        fetch('/api/counter/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            if (res.ok) {
                navigateHome();
                toast.success('Counter created successfully');
            } else {
                toast.error((await res.json()).message);
            }
        }).catch((_err) => {
            toast.error('Could not connect to backend');
        });
    }

    return (
        <div className={'flex flex-col justify-center w-full items-center'}>
            <Toaster richColors={true} position={"top-right"}/>
            <Container classes={'mt-24 flex-col'}>
                <div className={'flex w-full basis-full'}>
                    <h1 className={'text-3xl font-bold'}>Counters</h1>
                    <Link href={'/?show=true'}
                          className={'border-solid border-2 border-gray-800 rounded-md px-3 ml-auto hover:bg-gray-800 ' +
                              'hover:text-gray-200 transition duration-200 flex items-center'}>New Counter
                    </Link>
                </div>
                <div className={'flex basis-full justify-center mt-12'}>
                    <CounterList modalShow={show === 'true'}/>
                </div>
            </Container>

            <Container classes={'flex-col mt-12'}>
                <h1 className={'text-3xl font-bold'}>Statistics</h1>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-3'}>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Avg.:</div>
                        <div className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{avg}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Sum:</div>
                        <div className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{sum}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Min:</div>
                        <div className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{min ?? 'NaN'}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Max:</div>
                        <div className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{max ?? 'NaN'}</div>
                    </div>
                </div>
            </Container>

            {show && (<Modal show={Boolean(show)} title={'Create a Counter'}>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <div className={'grid grid-cols-12 gap-4'}>
                            <div className={'flex items-center col-span-4 font-bold'}>
                                Counter Name:
                            </div>
                            <div className={'flex items-center col-span-8'}>
                                <input type={'text'} name={'name'}
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
