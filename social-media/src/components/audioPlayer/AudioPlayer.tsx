import { useEffect, useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

interface AudioPlayerProps {
  audio: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio(audio));
  const animationRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    });
    const updateProgressBar = () => {
      if (progressBarRef.current) {
        const progress = (audio.currentTime / duration) * 100;
        progressBarRef.current.style.left = `${progress}%`;
        setCurrentTime(audio.currentTime);
      }
      animationRef.current = requestAnimationFrame(updateProgressBar);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgressBar);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressBarRef.current) {
        progressBarRef.current.style.left = `0%`;
      }
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex gap-3  items-center w-full py-[24px] mt-[15px] rounded-md px-[10px] bg-[#EFEFEF]">
      <button onClick={togglePlay}>
        {isPlaying ? (
          <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#e61313]">
            <FaStop className="text-white text-[16px]" />
          </span>
        ) : (
          <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-figmaBlue">
            <FaPlay className="text-white text-[16px]" />
          </span>
        )}
      </button>
      <div className=" w-full relative h-[3px] bg-figmaGrayShade2">
        <span
          ref={progressBarRef}
          className="absolute w-[2px] h-[82px] bg-[#e61313] top-[-39px]  left-0 bottom-[-30px]"
        />
      </div>
      <div className="flex items-center text-figmaGrayShade">
        <p>0{formatTime(currentTime)}/</p>
        <p>
          {duration && duration !== Infinity ? formatTime(duration) : "00:00"}
        </p>
      </div>
    </div>
  );
};
export default AudioPlayer;
