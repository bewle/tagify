import Image from "next/image";

export default function GetStartedText() {
    return (
        <div>
            no files? click here to get started!
            <Image src="/media/arrow.png" alt="arrow" width={32} height={32} />
        </div>
    );
}
