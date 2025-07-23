
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddDeviceFormProps {
  onSubmit: (deviceData: { name: string; lat: number; lng: number }) => void;
}

export const AddDeviceForm = ({ onSubmit }: AddDeviceFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lng: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.lat || !formData.lng) {
      return;
    }

    onSubmit({
      name: formData.name,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    });

    setFormData({ name: '', lat: '', lng: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="deviceName">Device Name</Label>
        <Input
          id="deviceName"
          type="text"
          placeholder="Enter device name (e.g., Vehicle 004)"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          step="any"
          placeholder="Enter latitude (e.g., 40.7128)"
          value={formData.lat}
          onChange={(e) => handleInputChange('lat', e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="number"
          step="any"
          placeholder="Enter longitude (e.g., -74.0060)"
          value={formData.lng}
          onChange={(e) => handleInputChange('lng', e.target.value)}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="px-6">
          Add Device
        </Button>
      </div>
    </form>
  );
};
