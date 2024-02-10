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

    function handleUpdate(event: React.MouseEvent<HTMLButtonElement>) {
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

    function handleSet(event: React.MouseEvent<HTMLButtonElement>) {
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
        }).catch((err) => {
            toast.error('Could not connect to backend');
        });
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
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
        }).catch((err) => {
            toast.error('Could not connect to backend');
        });
    }

    return (
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
                        <button id={`button1-${index}`} onClick={handleUpdate} type={'button'} className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Inc.</button>
                        <button id={`button2-${index}`} onClick={handleUpdate} className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Dec.</button>
                        <input id={`input-${index}`} type={'number'} className={'border-solid border-2 w-[75px] rounded-md border-gray-800 text-sm h-[27.2px] text-center mr-1'} defaultValue={'1'}></input>
                        <button id={`button3-${index}`} onClick={handleSet} className={'border-solid border-2 w-[50px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200 mr-1'}>Set</button>
                        <button id={`button4-${index}`} onClick={handleDelete} className={'border-solid border-2 w-[70px] rounded-md border-gray-800 hover:bg-gray-800 hover:text-gray-200 transition duration-200'}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
