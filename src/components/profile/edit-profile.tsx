'use client';
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogHeader, DialogFooter, DialogContent, Dialog, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FileEditIcon } from "lucide-react"
import { useProfile } from '@/contexts/ProfileContext';
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";

export function EditProfile({ idx, profile }: EditProfileProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditProfileData>();
  const [profileList, setProfileList] = useProfile();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: EditProfileData) => {
    setOpen(false);
    editProfileToResult(data);
  };

  const editProfileToResult = (editProfileData: EditProfileData) => {
    const updatedProfileData = {
      idx: editProfileData.idx,
      profileName: editProfileData.profileName,
      accessKey: editProfileData.accessKey,
      secretKey: editProfileData.secretKey,
      accountId: '123456789012',
      selectRole: 'Administrator',
      roles: ['Administrator','Developers'],
    }
    const updatedProfiles = profileList.map(profile => 
      profile.idx === idx ? { ...profile, ...updatedProfileData } : profile
    );
    setProfileList(updatedProfiles);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FileEditIcon className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 md:w-1/2 lg:w-1/3">
        <DialogHeader>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="p-6 space-y-6">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="index">
                List Number
                <span className="text-red-600">{errors.idx?.message}</span>
              </label>
              <Input
                id="index"
                placeholder="Enter your index"
                defaultValue={idx.toString()}
                {...register('idx',{
                  required: ' is required.',
                })}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="profileName">
                Profile
                <span className="text-red-600">{errors.profileName?.message}</span>
              </label>
              <Input
                id="profileName"
                placeholder="Enter your profile"
                defaultValue={profile.profileName}
                {...register('profileName',{
                  required: ' is required.',
                })}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="accessKey">
                Access Key
                <span className="text-red-600">{errors.accessKey?.message}</span>
              </label>
              <Input
                id="accessKey"
                placeholder="Enter your access key"
                defaultValue={profile.accessKey}
                {...register('accessKey',{
                  required: ' is required.',
                })}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="secretKey">
                Secret Key
                <span className="text-red-600">{errors.secretKey?.message}</span>
              </label>
              <Input
                id="secretKey"
                placeholder="Enter your secret key"
                defaultValue={profile.secretKey}
                {...register('secretKey',{
                  required: ' is required.',
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="ml-auto">Enter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
