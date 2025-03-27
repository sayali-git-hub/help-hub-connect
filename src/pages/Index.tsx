
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import FadeIn from '@/components/FadeIn';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="space-y-6">
                  <div className="inline-block mb-4">
                    <Logo size="lg" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Share Food.<br />
                    <span className="text-primary">Build Community.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Connect those with extra to those in need. 
                    A simple platform to donate or request food in your community.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {isAuthenticated ? (
                      <Link to="/purpose">
                        <Button size="lg" className="group">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/register">
                          <Button size="lg" className="group">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button variant="outline" size="lg">
                            Sign In
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300} className="hidden md:block">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/30 rounded-xl overflow-hidden shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl font-medium text-primary/80">Food sharing illustration</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-secondary rounded-full -z-10" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it works</h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              <FadeIn delay={100} className="bg-white p-8 rounded-xl shadow-subtle">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Create an account</h3>
                <p className="text-muted-foreground">
                  Sign up quickly and easily to join our food sharing community.
                </p>
              </FadeIn>

              <FadeIn delay={200} className="bg-white p-8 rounded-xl shadow-subtle">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose your purpose</h3>
                <p className="text-muted-foreground">
                  Select whether you want to donate food or request food assistance.
                </p>
              </FadeIn>

              <FadeIn delay={300} className="bg-white p-8 rounded-xl shadow-subtle">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Connect locally</h3>
                <p className="text-muted-foreground">
                  Get matched with people in your community to share food responsibly.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make a difference?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of others who are already sharing food and building stronger communities.
              </p>
              
              {isAuthenticated ? (
                <Link to="/purpose">
                  <Button size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button size="lg">
                    Get Started
                  </Button>
                </Link>
              )}
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/30 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Logo className="mx-auto mb-6" />
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} SharePlate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
