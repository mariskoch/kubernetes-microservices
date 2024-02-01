import React from "react";

export default function Container({children, classes}: { children: React.ReactNode, classes?: string }) {
    return (
        <div className={`flex justify-center w-screen max-w-3xl mx-3 p-3 shadow-md rounded-md bg-white ${classes}`}>
            {children}
        </div>
    );
}