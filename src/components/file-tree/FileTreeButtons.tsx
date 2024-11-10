import RemoveButton from "./buttons/RemoveButton";
import { SortDropdown } from "./buttons/SortDropdown";
import ToggleSelectButton from "./buttons/ToggleSelectButton";
import UploadButton from "./buttons/UploadButton";

export default function FileTreeButtons() {
    return (
        <>
            <div className="flex gap-2">
                <ToggleSelectButton />
                <SortDropdown />
            </div>
            <div className="flex gap-2">
                <RemoveButton />
                <UploadButton />
            </div>
        </>
    );
}
