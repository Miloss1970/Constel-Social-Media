import React, { useRef, useState, useEffect } from "react";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { FaStop, FaMicrophone } from "react-icons/fa";

interface AudioVisualizerProps {
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  audioURL: string | null;
  setAudioURL: React.Dispatch<React.SetStateAction<string | null>>;
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isRecording,
  setIsRecording,
  audioURL,
  setAudioURL,
  setAudioBlob, // Novi prop
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [, setAnalyser] = useState<AnalyserNode | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [, setDataArray] = useState<Uint8Array | null>(null);
  const [microphoneAllowed, setMicrophoneAllowed] = useState<boolean>(false);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setAudioContext(audioContext);
      setAnalyser(analyser);
      setDataArray(dataArray);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);

      mediaRecorder.ondataavailable = (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        setAudioBlob(audioBlob);
      };

      draw(analyser, dataArray);
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (audioContext) {
      audioContext.close();
    }
    setAudioContext(null);
    setAnalyser(null);
    setMediaRecorder(null);
    setDataArray(null);
  };

  const draw = (analyser: AnalyserNode, dataArray: Uint8Array) => {
    if (!canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    const drawVisualizer = () => {
      if (!analyser || !isRecording || !canvasRef.current) return;

      requestAnimationFrame(drawVisualizer);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );

      canvasCtx.fillStyle = "transparent";
      canvasCtx.fillRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );

      const maxAmplitude = Math.max(...dataArray);
      if (maxAmplitude < 100) {
        return;
      }

      const barWidth = (canvasRef.current!.width / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;

        canvasCtx.fillStyle = "#157EFF";
        canvasCtx.fillRect(
          x,
          canvasRef.current!.height - barHeight,
          barWidth,
          barHeight
        );

        x += barWidth + 1;
      }
    };

    drawVisualizer();
  };

  return (
    <div className="w-full  mt-[10px]">
      {!isRecording && !audioURL && (
        <button
          className="mt-[10px]  ml-[50px]"
          onClick={() => setIsRecording(true)}
        >
          <FaMicrophone className="text-figmaBlue text-[30px]" />
        </button>
      )}

      {isRecording && (
        <div className="flex gap-10 h-[80px] items-center w-full py-[24px]  rounded-md px-[10px] bg-[#EFEFEF]">
          <button>
            <span
              onClick={() => setIsRecording(false)}
              className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#e61313]"
            >
              <FaStop className="text-white text-[16px]" />
            </span>
          </button>

          <div className="w-full p-[10px]">
            <canvas className="h-[80px] w-full" ref={canvasRef}></canvas>
          </div>

          <p className="text-figmaGrayShade">00:00/00:00</p>
        </div>
      )}

      {audioURL && (
        <div className="w-full">
          <AudioPlayer audio={audioURL} />
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
