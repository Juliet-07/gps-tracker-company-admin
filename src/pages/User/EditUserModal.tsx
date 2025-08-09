import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  readonly: boolean;
  useristrator: boolean;
  map: any;
  latitude: number;
  longitude: number;
  zoom: number;
  coordinateFormat: any;
  disabled: boolean;
  expirationTime: any;
  deviceLimit: number;
  userLimit: number;
  deviceReadonly: boolean;
  limitCommands: boolean;
  disableReports: boolean;
  fixedEmail: boolean;
  poiLayer: any;
  role: string;
  companyId: number;
  totpKey: any;
  temporary: boolean;
  password?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    companyId: string;
    companyType?: string;
    role: string;
    status: string;
    avatar?: string;
  };
};

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const EditUserModal = ({ open, onClose, user }: Props) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  const updateUser = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user) throw new Error("user is null");

      const payload = {
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      const res = await axiosInstance.put(`/users/${user.id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "users-table"] });
      alert("Updated Successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update user", error);
    },
  });

  const onSubmit = (data: FormData) => {
    updateUser.mutate(data);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update User information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="text"
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Phone</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
