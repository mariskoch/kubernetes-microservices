export default function ModalFooter({children}: { children: React.ReactNode }) {
    return (
        <div className="flex justify-end mt-4">
            {children}
        </div>
    );
}