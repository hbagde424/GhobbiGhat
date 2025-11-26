import { useState } from 'react';
import { Loader2, Package } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhotoUpload } from '@/components/PhotoUpload';
import { toast } from 'sonner';
import { orderAPI } from '@/services/order.service';

interface PickupConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId: string;
    orderNumber: string;
    onSuccess: () => void;
}

export const PickupConfirmationDialog = ({
    open,
    onOpenChange,
    orderId,
    orderNumber,
    onSuccess,
}: PickupConfirmationDialogProps) => {
    const [photos, setPhotos] = useState<File[]>([]);
    const [itemCount, setItemCount] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async () => {
        if (photos.length === 0) {
            toast.error('Please upload at least one photo');
            return;
        }

        if (!itemCount || parseInt(itemCount) <= 0) {
            toast.error('Please enter the number of items picked up');
            return;
        }

        try {
            setIsUploading(true);

            const formData = new FormData();
            photos.forEach((photo) => {
                formData.append('pickupPhotos', photo);
            });
            formData.append('totalItemsPickedUp', itemCount);

            await orderAPI.uploadPickupPhotos(orderId, formData);

            toast.success('Pickup confirmed successfully!');
            onOpenChange(false);
            onSuccess();

            // Reset form
            setPhotos([]);
            setItemCount('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to upload pickup photos');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Confirm Pickup - {orderNumber}
                    </DialogTitle>
                    <DialogDescription>
                        Upload photos of the clothes and enter the total number of items picked up
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Item Count Input */}
                    <div className="space-y-2">
                        <Label htmlFor="itemCount">
                            Total Items Picked Up <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="itemCount"
                            type="number"
                            min="1"
                            placeholder="Enter number of items"
                            value={itemCount}
                            onChange={(e) => setItemCount(e.target.value)}
                            disabled={isUploading}
                        />
                        <p className="text-xs text-muted-foreground">
                            Count all clothes items (shirts, pants, etc.)
                        </p>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                        <Label>
                            Pickup Photos <span className="text-destructive">*</span>
                        </Label>
                        <PhotoUpload
                            onPhotosSelected={setPhotos}
                            maxPhotos={20}
                            disabled={isUploading}
                        />
                        <p className="text-xs text-muted-foreground">
                            Take clear photos of all items for customer reference
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isUploading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Confirm Pickup'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
