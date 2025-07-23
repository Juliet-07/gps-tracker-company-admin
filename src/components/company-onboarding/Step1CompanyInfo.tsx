
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building, Image, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const SubscriptionPlanCard = ({ title, price, description, features, selected, onSelect }: { title: string, price: string, description: string, features: string[], selected: boolean, onSelect: () => void }) => {
    return (
        <div
            className={cn(
                "border-2 rounded-lg p-4 cursor-pointer hover:border-primary transition-all",
                selected ? "border-primary bg-blue-50 shadow-sm" : "border-gray-200"
            )}
            onClick={onSelect}
        >
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{title}</h4>
                <span className="text-2xl font-bold text-primary">${price}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            <ul className="text-sm text-gray-600 space-y-1">
                {features.map(feature => <li key={feature}>• {feature}</li>)}
            </ul>
        </div>
    )
};

const Step1CompanyInfo = ({ onContinue }: { onContinue: () => void }) => {
    const [selectedPlan, setSelectedPlan] = useState('Professional');

    const subscriptionPlans = [
        { title: 'Starter', price: '29', description: 'Perfect for small businesses', features: ['Up to 10 devices', 'Basic tracking', 'Email support'] },
        { title: 'Professional', price: '79', description: 'Most popular choice', features: ['Up to 50 devices', 'Advanced features', 'Priority support'] },
        { title: 'Enterprise', price: '199', description: 'For large organizations', features: ['Unlimited devices', 'Custom features', 'Dedicated support'] }
    ];

    return (
        <Card className="p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <Building className="text-primary mr-3 h-5 w-5" />
                Company Information
            </h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onContinue(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <Label>Company Logo</Label>
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Image className="text-gray-400 h-8 w-8" />
                            </div>
                            <Button type="button" variant="outline">Upload Logo</Button>
                            <span className="text-gray-500 text-sm">Optional - JPG, PNG up to 2MB</span>
                        </div>
                    </div>

                    <div className="space-y-2"><Label htmlFor="company-name">Company Name *</Label><Input id="company-name" placeholder="Enter company name" required /></div>
                    <div className="space-y-2"><Label htmlFor="reg-number">Registration Number</Label><Input id="reg-number" placeholder="Business registration number" /></div>

                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select required><SelectTrigger id="industry"><SelectValue placeholder="Select industry" /></SelectTrigger><SelectContent><SelectItem value="logistics">Transportation & Logistics</SelectItem><SelectItem value="construction">Construction</SelectItem><SelectItem value="delivery">Delivery Services</SelectItem><SelectItem value="field">Field Services</SelectItem><SelectItem value="emergency">Emergency Services</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company-size">Company Size</Label>
                        <Select><SelectTrigger id="company-size"><SelectValue placeholder="Select size" /></SelectTrigger><SelectContent><SelectItem value="1-10">1-10 employees</SelectItem><SelectItem value="11-50">11-50 employees</SelectItem><SelectItem value="51-200">51-200 employees</SelectItem><SelectItem value="201-500">201-500 employees</SelectItem><SelectItem value="500+">500+ employees</SelectItem></SelectContent></Select>
                    </div>

                    <div className="md:col-span-2 space-y-2"><Label htmlFor="address">Business Address *</Label><Textarea id="address" placeholder="Enter complete business address" rows={3} required/></div>

                    <div className="space-y-2"><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required /></div>
                    <div className="space-y-2"><Label htmlFor="email">Company Email *</Label><Input id="email" type="email" placeholder="company@example.com" required /></div>
                    <div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" type="url" placeholder="https://company.com" /></div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone *</Label>
                        <Select required><SelectTrigger id="timezone"><SelectValue placeholder="Select time zone" /></SelectTrigger><SelectContent><SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem><SelectItem value="utc-7">UTC-7 (Mountain Time)</SelectItem><SelectItem value="utc-6">UTC-6 (Central Time)</SelectItem><SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem><SelectItem value="utc-0">UTC+0 (GMT)</SelectItem></SelectContent></Select>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-bold mb-4">Subscription Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {subscriptionPlans.map((plan) => (
                            <SubscriptionPlanCard key={plan.title} {...plan} selected={selectedPlan === plan.title} onSelect={() => setSelectedPlan(plan.title)} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                     <Button variant="ghost" asChild type="button" className="text-gray-600 hover:text-gray-800">
                        <Link to="/companies"><ArrowLeft className="mr-2 h-4 w-4" />Cancel</Link>
                    </Button>
                    <Button type="submit">
                        Continue to Admin Setup
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Card>
    );
};
export default Step1CompanyInfo;
