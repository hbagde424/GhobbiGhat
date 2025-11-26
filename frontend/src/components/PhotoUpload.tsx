import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface PhotoUploadProps {
    onPhotosSelected: (files: File[]) => void;
    maxPhotos?: number;
    existingPhotos?: string[];
    disabled?: boolean;
}

export const PhotoUpload = ({
    onPhotosSelected,
    maxPhotos = 10,
    existingPhotos = [],
    disabled = false,
}: PhotoUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length + selectedFiles.length + existingPhotos.length > maxPhotos) {
            toast.error(`Maximum ${maxPhotos} photos allowed`);
            return;
        }

        // Validate file types
        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image file`);
                return false;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error(`${file.name} is too large. Maximum 5MB allowed`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Create preview URLs
        const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));

        const updatedFiles = [...selectedFiles, ...validFiles];
        const updatedPreviews = [...previewUrls, ...newPreviewUrls];

        setSelectedFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
        onPhotosSelected(updatedFiles);
    };

    const removePhoto = (index: number) => {
        // Revoke the object URL to free memory
        URL.revokeObjectURL(previewUrls[index]);

        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);

        setSelectedFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
        onPhotosSelected(updatedFiles);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled}
            />

            {/* Upload Button */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    disabled={disabled || (selectedFiles.length + existingPhotos.length >= maxPhotos)}
                    className="flex-1"
                >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    disabled={disabled || (selectedFiles.length + existingPhotos.length >= maxPhotos)}
                    className="flex-1"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photos
                </Button>
            </div>

            {/* Photo Count */}
            <p className="text-sm text-muted-foreground">
                {selectedFiles.length + existingPhotos.length} / {maxPhotos} photos
            </p>

            {/* Existing Photos */}
            {existingPhotos.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium mb-2">Existing Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {existingPhotos.map((url, index) => (
                            <Card key={`existing-${index}`} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <img
                                        src={url}
                                        alt={`Existing photo ${index + 1}`}
                                        className="w-full h-24 object-cover"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Preview Selected Photos */}
            {previewUrls.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium mb-2">New Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                            <Card key={`preview-${index}`} className="relative overflow-hidden">
                                <CardContent className="p-0">
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover"
                                    />
                                    {!disabled && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6"
                                            onClick={() => removePhoto(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
