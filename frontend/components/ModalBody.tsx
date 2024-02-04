import React from "react";

export default function ModalBody({children}: { children: React.ReactNode }) {
    return (
        <div className="text-lg text-gray-500 mt-3">
            {children}
        </div>
    );
}
