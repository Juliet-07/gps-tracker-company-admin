import { useState } from "react";
import qs from "qs";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios";

interface GeofenceData {
  id: number | null;
  name: string;
  area: string;
  description: string;
  calendarId: number | null;
  attributes: {};
}

export const GeofenceForm = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();

  const initialValues: GeofenceData = {
    id: null,
    name: "",
    area: "CIRCLE (30.0567 -1.9438, 1000)",
    description: "",
    calendarId: null,
    attributes: {},
  };

  const [geofenceData, setGeofenceData] = useState<GeofenceData>(initialValues);

  const { name, area, description } = geofenceData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGeofenceData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const url = `${apiURL}/geofences`;

    try {
      const response = await axiosInstance.post(url, geofenceData, {
        // headers: {
        //   "Content-Type": "application/json",
        // },
        withCredentials: true,
      });
      alert("Geofence Successfully Created");
      console.log("Geofence created:", response.data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Geofence Name
              </Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter geofence name"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Area
              </Label>
              <Input
                type="text"
                name="area"
                value={area}
                onChange={handleChange}
                placeholder="Enter area"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-gray-700 text-sm font-medium mb-2">
                Description
              </Label>
              <Textarea
                name="description"
                value={description}
                onChange={handleChange}
                rows={3}
                placeholder="Enter geofence description"
                className="w-full"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
