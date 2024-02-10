'use client';

import Container from "@/components/Container";
import Link from "next/link";
import Modal from "@/components/Modal";
import React, {useEffect, useState} from "react";
import ModalBody from "@/components/ModalBody";
import ModalFooter from "@/components/ModalFooter";
import {useRouter} from "next/navigation";
import {toast, Toaster} from "sonner";

interface Counter {
    name: string;
    count: number;
}

export default function Home({searchParams}: { searchParams: { [_key: string]: string | string[] | undefined } }) {
    const show = searchParams?.show;
    const router = useRouter();

    const [avg, setAvg] = useState<number>(0);
    const [sum, setSum] = useState<number>(0);
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);
    const [counters, setCounters] = useState<Counter[]>([]);
    const [i, setI] = useState<number>(0);

    useEffect(() => {
        fetch('/api/statistics')
            .then(response => response.json())
            .then(data => {
                setAvg(data.average);
                setSum(data.sum);
                setMin(data.min);
                setMax(data.max);
            })
            .catch(_error => toast.error('Could not connect to backend'));
    }, [show, i]);

    useEffect(() => {
        fetch('/api/counter/get')
            .then(response => response.json())
            .then(data => setCounters(data))
            .catch(_error => toast.error('Could not connect to backend'));
    }, [show, i]);

    const navigateHome = () => {
        router.push('/');
    };

    function handleModalSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    function handleCounterUpdate(event: React.MouseEvent<HTMLButtonElement>) {
        const index = parseInt(event.currentTarget.id.split('-')[1]);
        const value = (document.getElementById(`input-${index}`) as HTMLInputElement).value;
        const inc = event.currentTarget.id.split('-')[0] === 'button1';
        const body = inc ? {
            incrementBy: parseInt(value),
        } : {
            decrementBy: parseInt(value),
        }

        fetch(`/api/counter/${inc ? 'increment' : 'decrement'}/${counters[index].name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            if (res.ok) {
                setI(i + 1);
                toast.success('Counter updated successfully');
            } else {
                toast.error((await res.json()).message);
            }
        }).catch((_err) => {
            toast.error('Could not connect to backend');
        });
    }

    function handleCounterSet(event: React.MouseEvent<HTMLButtonElement>) {
        const index = parseInt(event.currentTarget.id.split('-')[1]);
        const value = (document.getElementById(`input-${index}`) as HTMLInputElement).value;

        fetch(`/api/counter/set/${counters[index].name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({count: parseInt(value)}),
        }).then(async (res) => {
            if (res.ok) {
                setI(i + 1);
                toast.success('Counter updated successfully');
            } else {
                toast.error((await res.json()).message);
            }
        }).catch((_err) => {
            toast.error('Could not connect to backend');
        });
    }

    function handleCounterDelete(event: React.MouseEvent<HTMLButtonElement>) {
        const index = parseInt(event.currentTarget.id.split('-')[1]);

        fetch(`/api/counter/delete/${counters[index].name}`, {
            method: 'DELETE',
        }).then(async (res) => {
            if (res.ok) {
                setI(i + 1);
                toast.success('Counter deleted successfully');
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
                    <table className={'w-3/4'}>
                        <thead>
                        <tr className={'border-b-[1px] border-solid'}>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {counters.map((counter, index) => (
                            <tr key={index} className={'border-b-[1px] border-solid'}>
                                <td className={''}>{counter.name}</td>
                                <td className={'text-center'}>{counter.count}</td>
                                <td className={'text-center'}>
                                    <button id={`button1-${index}`} onClick={handleCounterUpdate} type={'button'}
                                            className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Inc.
                                    </button>
                                    <button id={`button2-${index}`} onClick={handleCounterUpdate}
                                            className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Dec.
                                    </button>
                                    <input id={`input-${index}`} type={'number'}
                                           className={'border-solid border-2 w-[75px] rounded-md border-gray-800 text-sm h-[27.2px] text-center mr-1'}
                                           defaultValue={'1'}></input>
                                    <button id={`button3-${index}`} onClick={handleCounterSet}
                                            className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Set
                                    </button>
                                    <button id={`button4-${index}`} onClick={handleCounterDelete}
                                            className={'border-solid border-2 w-[70px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200'}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Container>

            <Container classes={'flex-col mt-12'}>
                <h1 className={'text-3xl font-bold'}>Statistics</h1>
                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-3'}>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Avg.:</div>
                        <div
                            className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{avg}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Sum:</div>
                        <div
                            className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{sum}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Min:</div>
                        <div
                            className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{min ?? 'NaN'}</div>
                    </div>
                    <div className={'grid grid-cols-12 gap-2 items-center'}>
                        <div className={'col-span-2 md:col-span-3'}>Max:</div>
                        <div
                            className={'col-span-10 md:col-span-9 w-full bg-gray-800 text-white text-center rounded-xl py-1'}>{max ?? 'NaN'}</div>
                    </div>
                </div>
            </Container>

            {show && (<Modal show={Boolean(show)} title={'Create a Counter'}>
                <form onSubmit={handleModalSubmit}>
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
