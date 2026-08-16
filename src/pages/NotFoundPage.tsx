import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-6">
        <div className="h-16 w-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
          <Cpu className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-brand-600 uppercase">404 // PAGE NOT FOUND</span>
          <h1 className="font-display text-4xl font-black text-slate-950">
            Node Disconnected
          </h1>
          <p className="text-slate-600 text-sm">
            The page you are trying to reach does not exist or has been moved in the VENOVATION 26 portal.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="h-4 w-4 mr-1" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/programs">
            <Button variant="outline" size="md">
              View Programs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
