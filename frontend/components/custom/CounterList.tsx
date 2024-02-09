'use client';

import React, {MouseEventHandler, useEffect, useState} from "react";
import {toast} from "sonner";

interface Counter {
    name: string;
    count: number;
}

export default function CounterList({modalShow}: { modalShow: boolean }) {
    const [counters, setCounters] = useState<Counter[]>([]);
    const [i, setI] = useState<number>(0);

    useEffect(() => {
        fetch('/api/counter/get')
            .then(response => response.json())
            .then(data => setCounters(data))
            .catch(error => toast.error('Could not connect to backend'));
    }, [modalShow, i]);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        const index = parseInt(event.currentTarget.id.split('-')[1]);
        const value = (document.getElementById(`input-${index}`) as HTMLInputElement).value;
        const inc = event.currentTarget.id.split('-')[0] === 'button1';
        const body = inc ? {
            incrementBy: parseInt(value),
        } : {
            decrementBy: parseInt(value),
        }

        fetch(`/api/counter/${inc ? 'increment': 'decrement'}/${counters[index].name}`, {
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
        }).catch((err) => {
            toast.error('Could not connect to backend');
        });
    }

    return (
        <table className={'w-1/2'}>
            <thead>
            <tr className={'border-b-[1px] border-solid'}>
                <th>Name</th>
                <th>Count</th>
            </tr>
            </thead>
            <tbody>
            {counters.map((counter, index) => (
                <tr key={index} className={'border-b-[1px] border-solid'}>
                    <td className={''}>{counter.name}</td>
                    <td className={'text-center'}>{counter.count}</td>
                    <td>
                        <button id={`button1-${index}`} onClick={handleClick} type={'button'} className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Inc.</button>
                        <button id={`button2-${index}`} onClick={handleClick} className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Dec.</button>
                        <input id={`input-${index}`} type={'number'} className={'border-solid border-2 w-[75px] rounded-md border-gray-800 text-sm h-[27.2px] text-center'} defaultValue={'1'}></input>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}