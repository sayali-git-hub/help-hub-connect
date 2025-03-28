
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, Clock, Image, Upload } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  foodName: z.string().min(2, { message: 'Food name must be at least 2 characters' }),
  foodType: z.string().min(1, { message: 'Please select a food type' }),
  quantity: z.string().min(1, { message: 'Please specify quantity' }),
  expiryDate: z.string().min(1, { message: 'Please provide an expiration date' }),
  pickupLocation: z.string().min(5, { message: 'Please provide a valid pickup location' }),
  pickupTime: z.string().min(1, { message: 'Please provide a pickup time' }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DonationForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: '',
      foodType: '',
      quantity: '',
      expiryDate: '',
      pickupLocation: '',
      pickupTime: '',
      description: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageFile(null);
      setPreviewUrl(null);
      return;
    }

    const file = e.target.files[0];
    setImageFile(file);
    
    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const uploadImage = async () => {
    if (!imageFile || !user) return null;
    
    try {
      setUploading(true);
      
      // Create a unique file name
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('food_images')
        .upload(filePath, imageFile);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('food_images')
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to donate food');
        return;
      }
      
      // First upload the image if one was selected
      let uploadedImageUrl = null;
      if (imageFile) {
        uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl && imageFile) {
          // If there was an image to upload but it failed, alert the user
          toast.error('Image upload failed. Please try again.');
          return;
        }
      }

      // Format the data for Supabase
      const donationData = {
        user_id: user.id,
        food_name: values.foodName,
        food_type: values.foodType,
        quantity: values.quantity,
        expiry_date: values.expiryDate,
        pickup_location: values.pickupLocation,
        pickup_time: values.pickupTime,
        description: values.description || '',
        status: 'pending',
        image_url: uploadedImageUrl,
      };

      // Use the any type to bypass TypeScript's type checking for now
      // The types will be updated after running the migration
      const { error } = await (supabase as any).from('food_donations').insert(donationData);

      if (error) throw error;

      toast.success('Food donation posted successfully!');
      form.reset();
      setImageFile(null);
      setPreviewUrl(null);
      
      // Navigate to the track tab to see the new donation
      navigate('/donate?tab=track');
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error('Failed to post donation. Please try again.');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Package className="h-4 w-4" /> Food Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rice, Pasta, Canned Goods" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dry_goods">Dry Goods</SelectItem>
                        <SelectItem value="canned_food">Canned Food</SelectItem>
                        <SelectItem value="fresh_produce">Fresh Produce</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                        <SelectItem value="bakery">Bakery Items</SelectItem>
                        <SelectItem value="frozen">Frozen Food</SelectItem>
                        <SelectItem value="prepared_meals">Prepared Meals</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2kg, 3 bags, 5 items" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Expiry Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Pickup Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 123 Main St, City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Pickup Time Window
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2-5 PM weekdays" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <FormLabel className="flex items-center gap-2">
                <Image className="h-4 w-4" /> Food Image (Optional)
              </FormLabel>
              <div className="flex flex-col gap-4 items-center">
                {previewUrl && (
                  <div className="relative w-full max-w-xs rounded-md overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Food preview" 
                      className="w-full h-48 object-cover rounded-md border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setPreviewUrl(null);
                        setImageFile(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <div className={`w-full ${previewUrl ? 'hidden' : 'block'}`}>
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md border-muted-foreground/40 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-medium">
                        Click to upload a photo of the food
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or GIF (max 10MB)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any other information about the food items, storage requirements, etc."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Post Donation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
