type ipcProfile = typeof ipcProfileEvents[number];

interface ProfileData {
  idx: number;
  accountId: string;
  selectRole?: string;
  roles: string[];
}

interface Profile extends ProfileData {
  profileName: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

interface ConfigureProfile {
  idx?: number;
  profileName: string;
  accountId: string;
  roles: string[];
}

interface EditConfigureProfile {
  oldProfileName: string;
  newProfileData: {
    profileName: string;
    accountId: string;
    roles: string[];
  }
}

interface EditProfileData {
  idx?: number;
  profileName?: string;
  accountId?: string;
  selectRole?: string;
  roles?: string[];
}

interface ProfileCredentials {
  oldProfileName?: string;
  profileName: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

interface EditProfileProps {
  profile: ProfileCredentials;
}

interface ProfileSession {
  profileName: string;
  createdAt: string;
}