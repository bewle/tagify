import FileEditorForm from "./FileEditorForm";
import { Card } from "./ui/card";

export default function FileEditor() {
    return (
        <>
            <div className="absolute top-0 left-0 grid w-full h-full place-items-center">
                {/* <div className="rounded-md bg-background size-64"></div> */}
                <Card>hi</Card>
            </div>
            <div className="opacity-20">
                <FileEditorForm />
            </div>
        </>
    );
}
