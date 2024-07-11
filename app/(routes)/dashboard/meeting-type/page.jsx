import { Input } from "@/components/ui/input";
import MeetingEventList from "./_components/MeetingEventList";

const MeetingType = () => {
  return (
    <div className=" p-5">
      <div className=" flex flex-col gap-6 shadow-sm">
        <h2 className=" font-bold text-3xl">Meeting Type</h2>
        <Input placeholder="Search..." className=" max-w-xs" />
        <hr />
      </div>
      <MeetingEventList />
    </div>
  );
};

export default MeetingType;
