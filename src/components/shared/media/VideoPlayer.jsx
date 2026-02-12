import React, { useState, useRef, useEffect } from "react";
import {
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

const VideoPlayer = ({
  src,
  poster,
  title = "Video Player",
  description = "",
  className = "",
  showControls = true,
  autoPlay = false,
  muted = true,
  onPlay,
  onPause,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Format time helper
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Video event handlers
  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlay) onPlay();
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (onPause) onPause();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  // Control functions
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipTime = (seconds) => {
    if (!videoRef.current) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipTime(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          skipTime(10);
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, currentTime, duration, isMuted, volume]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Video player"
      className={`video-container relative aspect-video bg-stevens-black group  overflow-hidden ${className}`}
      onMouseEnter={() => setShowControlsOverlay(true)}
      onMouseLeave={() => setShowControlsOverlay(false)}
      tabIndex={0}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        preload="metadata"
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      >
        <source src={src} type="video/mp4" />
        <track kind="captions" src="" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            aria-label="Play video"
          >
            <PlayCircle className="w-7 h-7 text-white/90" />
          </button>
        )}
      </div>

      {/* Enhanced Video Controls */}
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-stevens-md transition-opacity duration-stevens-normal ${
            showControlsOverlay || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-stevens-sm">
            <div
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={duration || 100}
              aria-valuenow={currentTime}
              aria-label="Seek"
              className="w-full h-1 bg-stevens-dark-gray rounded-full cursor-pointer hover:h-2 transition-all duration-stevens-normal"
              onClick={handleSeek}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  skipTime(-10);
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  skipTime(10);
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  if (videoRef.current) videoRef.current.currentTime = 0;
                } else if (e.key === 'End') {
                  e.preventDefault();
                  if (videoRef.current) videoRef.current.currentTime = duration;
                }
              }}
            >
              <div
                className="h-full bg-stevens-red rounded-full transition-all duration-stevens-normal"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-stevens-sm">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="w-8 h-8 flex items-center justify-center text-stevens-white hover:text-stevens-red transition-colors duration-stevens-normal"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <PlayCircle className="w-5 h-5" />
                )}
              </button>

              {/* Skip Back */}
              <button
                onClick={() => skipTime(-10)}
                className="w-8 h-8 flex items-center justify-center text-stevens-white hover:text-stevens-red transition-colors duration-stevens-normal"
                aria-label="Skip back 10 seconds"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="w-8 h-8 flex items-center justify-center text-stevens-white hover:text-stevens-red transition-colors duration-stevens-normal"
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Time Display */}
              <span className="text-stevens-white text-stevens-sm font-stevens-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-stevens-sm">
              {/* Volume Control */}
              <div className="flex items-center gap-stevens-xs">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center text-stevens-white hover:text-stevens-red transition-colors duration-stevens-normal"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-stevens-dark-gray rounded-full appearance-none cursor-pointer slider"
                  aria-label="Volume control"
                />
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 flex items-center justify-center text-stevens-white hover:text-stevens-red transition-colors duration-stevens-normal"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
