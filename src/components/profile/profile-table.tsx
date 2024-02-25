'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { setLocalStorage } from '@/lib/localStorage';
import { useProfile } from '@/contexts/ProfileContext';
import { useProfileSession } from '@/contexts/ProfileSessionContext';
import { EditProfile } from './edit-profile';
import { ipcParser } from '@/lib/ipcPaser';

export default function ProfileTable({ profiles }: { profiles: Profile[] }) {
  const [profileList, setProfileList] = useProfile();
  const [profileSession, setProfileSession] = useProfileSession();
  const [selectedRoles, setSelectedRoles] = useState<{ [key: number]: string }>({});

  const handleSelectRole = (selectProfile: Profile, role: string): void => {
    setSelectedRoles(prev => ({ ...prev, [selectProfile.idx]: role }));
    // profileList 상태에서 idx 값이 일치하는 프로필을 찾아 그의 역할을 업데이트합니다.
    setProfileList(prevProfileList => prevProfileList.map(profile => 
      profile.idx === selectProfile.idx ? { ...profile, selectRole: role } : profile
    ));
    setLocalStorage('profileList', selectProfile.profileName, {
      selectRole: role,
    });
  };

  const handleDeleteProfile = (idx: number) => {
    const profileToDelete = profileList.find(profile => profile.idx === idx);
    if (profileToDelete) {
      window.electron.profile.send('delete-profile', profileToDelete.profileName);
      window.electron.profile.on('delete-profile', (deleteProfileString: string) => {
        ipcParser(deleteProfileString);
        setProfileList(profileList.filter(profile => profile.idx !== idx));
        // newData 인수 없이 setLocalStorage를 호출하여 프로필을 삭제합니다.
        setLocalStorage('profileList', profileToDelete.profileName);
      });
      if (profileToDelete.profileName === profileSession) {
        setProfileSession('Select Profile');
      }
    }
  };

  return (
    <Table className="border shadow-sm rounded-lg p-2">
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Profile</TableHead>
          <TableHead className="w-64 pl-8" >Role</TableHead>
          <TableHead className="w-64">Account ID</TableHead>
          <TableHead className="w-1 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...profiles].sort((a, b) => a.idx - b.idx).map((profile) => (
          <TableRow key={profile.idx}>
            <TableCell>{profile.profileName}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-expanded="true" variant="ghost">
                    {selectedRoles[profile.idx] || profile.selectRole || "Select Role"}
                  </Button>
                </DropdownMenuTrigger>
                {profile.roles !== undefined && (
                  <DropdownMenuContent align="start">
                  {profile.roles.sort((a, b) => a.localeCompare(b)).map((role) => (
                    <DropdownMenuItem key={role} onClick={() => handleSelectRole(profile, role)}>{role}</DropdownMenuItem>
                  ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </TableCell>
            <TableCell>{profile.accountId}</TableCell>
            <TableCell className="flex flex-row justify-center">
              {/* <EditProfile idx={profile.idx} profile={profile} /> */}
              <Button size="icon" variant="ghost" onClick={() => handleDeleteProfile(profile.idx)}>
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
