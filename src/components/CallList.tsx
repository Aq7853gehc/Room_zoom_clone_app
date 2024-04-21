// @ts-nocheck
"use client";
import { useGetCall } from "@/hooks/useGetCall";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";

type Props = {
  type: "ended" | "upcoming" | "recordings";
};

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, isLoading, callsRecordings } =
    useGetCall();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;

      case "upcoming":
        return upcomingCalls;

      case "recordings":
        return recordings;

      default:
        return [];
    }
  };
  const getNoCallsMsg = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";

      case "upcoming":
        return "No Upcoming Calls";

      case "recordings":
        return "No Recordings";

      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecording = async () => {
      try {
        const callDatas = await Promise.all(
          callsRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recording = callDatas
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        console.log(recording);
        setRecordings(recording);
      } catch (error) {
        toast({ title: "Try Again Later" });
      }
    };

    if (type === "recordings") fetchRecording();
  }, [type, callsRecordings]);

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsg();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              meeting.state?.custom?.description?.substring(0, 20) ||
              meeting?.filename?.substring(0, 20) ||"Personal Meeting"||
              "No discription"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold">{noCallsMsg}</h1>
      )}
    </div>
  );
};

export default CallList;
