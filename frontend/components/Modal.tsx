'use client';

import Link from "next/link";
import React, {useEffect} from "react";

export default function Modal({show, title, children}: { show: boolean, title: string, children: React.ReactNode}) {
    useEffect(() => {
        if (show) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-4 border w-full max-w-xl shadow-lg rounded-md bg-white">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                {children}
            </div>
        </div>
    );
}
