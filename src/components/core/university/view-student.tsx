import StudentProfileDetail from "./student-profile-detail";
import { UserFieldProps } from "@/types/user-field";
import StudentSeedList from "./student-seed-list";

interface ErrorFieldProps {
  isError: boolean;
  msg: string
}

type ProfilePageProps = UserFieldProps & ErrorFieldProps;
export default function ProfilePage({ userData,isError, msg  }: ProfilePageProps) {
    return (
        <div className="py-6 px-2">
            <div className="w-full max-w-10xl space-y-6">
                {/* Profile Card */}
                <StudentProfileDetail userData={userData} isError={isError} msg={msg} />

        {/* Reports Section */}
        <StudentSeedList userData={userData} />
      </div>
    </div>
  );
}
