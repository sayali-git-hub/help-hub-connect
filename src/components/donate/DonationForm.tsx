
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, Clock } from 'lucide-react';

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

  const onSubmit = async (values: FormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to donate food');
        return;
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
      };

      const { error } = await supabase.from('food_donations').insert(donationData);

      if (error) throw error;

      toast.success('Food donation posted successfully!');
      form.reset();
      
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

            <Button type="submit" className="w-full">
              Post Donation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
