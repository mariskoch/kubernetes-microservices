'use client';

import Link from "next/link";
import {useEffect} from "react";

export default function Modal({show}: { show: boolean }) {
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
                <h3 className="text-2xl font-bold text-gray-900">Modal Title</h3>
                <div className="text-lg text-gray-500 mt-3">
                    Modal Body
                </div>
                <div className="flex justify-end mt-4">
                    <Link
                        href="/"
                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Create
                    </Link>
                </div>
            </div>
        </div>
    );
}
