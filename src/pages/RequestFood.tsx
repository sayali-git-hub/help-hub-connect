
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NearbyNotification from '@/components/NearbyNotification';
import TrackDonation, { DonationStatus } from '@/components/TrackDonation';
import ChatInterface, { Message } from '@/components/ChatInterface';

const mockDonations: DonationStatus[] = [
  {
    id: "n123e45f67",
    status: 'pending',
    foodItems: ['Rice (2kg)', 'Canned beans (3)', 'Pasta (1kg)'],
    donor: 'Sarah Wilson',
    location: '123 Main St, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: "n789a01b23",
    status: 'pending',
    foodItems: ['Fresh vegetables', 'Bread (2 loaves)'],
    donor: 'Michael Brown',
    location: '456 Oak Ave, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: "n456f78g90",
    status: 'pending',
    foodItems: ['Milk (1L)', 'Eggs (dozen)', 'Cheese (500g)'],
    donor: 'Jennifer Garcia',
    location: '789 Elm St, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  }
];

const mockAcceptedDonations: DonationStatus[] = [
  {
    id: "a123e45f67",
    status: 'accepted',
    foodItems: ['Rice (2kg)', 'Canned beans (3)', 'Pasta (1kg)'],
    donor: 'Sarah Wilson',
    receiver: 'Current User',
    location: '123 Main St, City',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
  }
];

const mockMessages: Message[] = [
  {
    id: "m1",
    text: "Hi there! I have some food available for pickup.",
    sender: {
      id: "donor-1",
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
  },
  {
    id: "m2",
    text: "Thank you! What time can I come by to pick it up?",
    sender: {
      id: "current-user",
      name: "Current User",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 40) // 40 minutes ago
  },
  {
    id: "m3",
    text: "I'll be home from 4pm to 8pm today. Does that work for you?",
    sender: {
      id: "donor-1",
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 35) // 35 minutes ago
  }
];

const RequestFood = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [nearbyDonations, setNearbyDonations] = useState<DonationStatus[]>(mockDonations);
  const [acceptedDonations, setAcceptedDonations] = useState<DonationStatus[]>(mockAcceptedDonations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [activeTab, setActiveTab] = useState("notifications");

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error('Please login to access this page');
    }
  }, [isAuthenticated, navigate]);

  const handleAcceptDonation = (donationId: string) => {
    const donationToAccept = nearbyDonations.find(d => d.id === donationId);
    if (donationToAccept) {
      const updatedDonation = {
        ...donationToAccept,
        status: 'accepted' as const,
        receiver: user?.user_metadata?.name || user?.email || 'Current User',
        updatedAt: new Date()
      };
      
      setAcceptedDonations([...acceptedDonations, updatedDonation]);
      setNearbyDonations(nearbyDonations.filter(d => d.id !== donationId));
    }
  };

  const handleIgnoreDonation = (donationId: string) => {
    setNearbyDonations(nearbyDonations.filter(d => d.id !== donationId));
  };

  const handleStatusUpdate = (donation: DonationStatus, newStatus: DonationStatus['status']) => {
    const updatedDonations = acceptedDonations.map(d => {
      if (d.id === donation.id) {
        return { ...d, status: newStatus, updatedAt: new Date() };
      }
      return d;
    });
    setAcceptedDonations(updatedDonations);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      text: message,
      sender: {
        id: "current-user",
        name: user?.user_metadata?.name || user?.email || "Current User",
      },
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto py-6">
          <FadeIn className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request Food</h1>
            <p className="text-xl text-muted-foreground">
              Find available food donations in your area
            </p>
          </FadeIn>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="notifications" className="relative">
                Notifications
                {nearbyDonations.length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs bg-primary text-white rounded-full">
                    {nearbyDonations.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="track">My Pickups</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <FadeIn delay={100}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Available Food</CardTitle>
                      <CardDescription>
                        Browse food donations near you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                        <p className="text-muted-foreground">Food search interface will go here</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                        Browse Donations
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>

                <FadeIn delay={200}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Request Specific Items</CardTitle>
                      <CardDescription>
                        Let donors know what you need
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                        <p className="text-muted-foreground">Request form will go here</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => toast.success('This feature will be implemented soon!')}>
                        Create Request
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>

                <FadeIn delay={300}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pickup Information</CardTitle>
                      <CardDescription>
                        Arrange to collect your food items
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center mb-4">
                        <p className="text-muted-foreground">Pickup scheduler will go here</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => setActiveTab('track')}>
                        View My Pickups
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyDonations.length > 0 ? (
                  nearbyDonations.map((donation) => (
                    <FadeIn key={donation.id}>
                      <NearbyNotification
                        donation={donation}
                        onAccept={handleAcceptDonation}
                        onIgnore={handleIgnoreDonation}
                      />
                    </FadeIn>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No new notifications</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="track">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {acceptedDonations.length > 0 ? (
                  acceptedDonations.map((donation) => (
                    <FadeIn key={donation.id}>
                      <TrackDonation
                        donation={donation}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </FadeIn>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">You haven't accepted any donations yet</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                <FadeIn>
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    recipientName="Sarah Wilson"
                    recipientAvatar="https://randomuser.me/api/portraits/women/65.jpg"
                  />
                </FadeIn>
              </div>
            </TabsContent>
          </Tabs>

          <FadeIn delay={400} className="mt-12 text-center">
            <Button variant="outline" onClick={() => navigate('/purpose')}>
              Back to Purpose Selection
            </Button>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default RequestFood;
