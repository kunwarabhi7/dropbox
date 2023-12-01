import { auth } from "@clerk/nextjs";
import DropZoneComponents from "@/components/DropZoneComponents";

const Dashboard = async () => {
  const { userId } = auth();
  console.log(userId);
  return (
    <div>
      Dashboard
      <DropZoneComponents />
    </div>
  );
};

export default Dashboard;
