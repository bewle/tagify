import RemoveButton from "./RemoveButton";
import { SortDropdown } from "./SortDropdown";
import ToggleSelectButton from "./ToggleSelectButton";
import UploadButton from "./UploadButton";

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
