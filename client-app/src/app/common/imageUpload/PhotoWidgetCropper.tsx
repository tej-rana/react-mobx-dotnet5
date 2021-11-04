import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
    setCropper: (cropper: Cropper) => void;
    imagePreview: string;
}

export default function PhotoWidgetCropper({setCropper,imagePreview } : Props) {

    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <Cropper
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            initialAspectRatio={1}
            aspectRatio={1}
            preview={'.img-preview'}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />

    )

}
