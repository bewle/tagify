import RemoveButton from "./RemoveButton";
import ToggleSelectButton from "./ToggleSelectButton";
import UploadButton from "./UploadButton";

export default function FileTreeButtons() {
    return (
        <>
            <ToggleSelectButton />
            <div className="flex gap-2">
                <RemoveButton />
                <UploadButton />
            </div>
        </>
    );
}
