export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-48 bg-primary/20 rounded mb-4"></div>
                <div className="h-8 w-64 bg-muted rounded"></div>
            </div>
        </div>
    );
}
