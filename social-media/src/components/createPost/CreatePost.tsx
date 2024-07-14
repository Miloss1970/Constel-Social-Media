import React, { useEffect, useState } from "react";
import AudioVisualizer from "../voiceRecorder/VoiceRecorder";
import { useDispatch } from "react-redux";
import { addPost } from "../../store/postSlice";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { callApi } from "../../service/service";

interface CreatePostProps {
  picture: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ picture }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const dispatch = useDispatch();
  const [microphoneAllowed, setMicrophoneAllowed] = useState<boolean>(false);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    const getMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicrophoneAllowed(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    getMicrophonePermission();
  }, []);

  const deleteRecording = () => {
    setAudioURL(null);
    setAudioBlob(null);
    setIsRecording(false);
  };

  const handlePost = () => {
    if (!postText.trim()) return toast.error("Input  cannot be empty!");

    const formData = new FormData();

    if (audioBlob) {
      formData.append("audio", audioBlob, "audio.wav");
    }

    formData.append("text", postText);

    callApi({ method: "POST", url: "posts", body: formData }).then((res) => {
      console.log(res);
      if (res.error) return toast.error(`${res.error.message}`);
      dispatch(addPost(res.post));
      deleteRecording();
      toast.success("Post successfully created");
    });
    setPostText("");
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <img className="w-[50px] h-[50px] rounded-full" src={picture} alt="" />
        <input
          className="h-[50px] w-full  border-b border-solid border-blue-500 outline-none bg-transparent"
          type="text"
          placeholder="What's happening"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      <div className={isRecording || audioURL ? "" : "flex justify-between "}>
        <div>
          {microphoneAllowed && (
            <AudioVisualizer
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              audioURL={audioURL}
              setAudioURL={setAudioURL}
              setAudioBlob={setAudioBlob}
            />
          )}
        </div>
        <div className={isRecording || audioURL ? "flex justify-end " : ""}>
          <div className="flex gap-3 items-center">
            {!isRecording && audioURL && (
              <button onClick={deleteRecording}>
                <RiDeleteBin5Line className="text-[30px] mt-[20px] text-[#FF1515] hover:text-[#e61313]" />
              </button>
            )}
            <button
              onClick={handlePost}
              className={`px-[40px] py-[12px] text-white inline-block text-[17px] rounded-md font-semibold mt-[20px] transition-all duration-300 ${
                postText
                  ? "bg-figmaBlue hover:bg-figmaBlueShade"
                  : "bg-figmaGrayShade hover:bg-figmaGrayShade2"
              }`}
            >
              New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
