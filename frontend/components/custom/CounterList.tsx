'use client';

import {useEffect, useState} from "react";
import {toast} from "sonner";

interface Counter {
    name: string;
    count: number;
}

export default function CounterList({modalShow}: { modalShow: boolean }) {
    const [counters, setCounters] = useState<Counter[]>([]);

    useEffect(() => {
        fetch('/api/counter/get')
            .then(response => response.json())
            .then(data => setCounters(data))
            .catch(error => toast.error('Could not connect to backend'));
    }, [modalShow]);

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Count</th>
            </tr>
            </thead>
            <tbody>
            {counters.map((counter, index) => (
                <tr key={index}>
                    <td>{counter.name}</td>
                    <td>{counter.count}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}