import React,{useEffect,useRef} from 'react'
import{Player} from 'video-react'
import "../node_modules/video-react/dist/video-react.css";
import video1 from './video/video1.mp4';
import video2 from './video/video2.mp4';
import video3 from './video/video3.mp4';
import video4 from './video/video4.mp4';
import video5 from './video/video5.mp4';


const VideoPlayer = () => {
    const videos=[video2,video1,video3,video4,video5]
    
    const videoRef = useRef(null);

    useEffect(() => {
        let index = 0;
        const videoElement = videoRef.current;

    
        const playNextVideo = () => {
          if (index < videos.length) {
            const videoSource = videos[index];
            videoElement.src = videoSource;
            videoElement.currentTime = 0; // Reset the current time to the beginning
            videoElement.pause()
            setTimeout(()=>{
              videoElement.play();
            },150)
            index++; 
            if(index==videos.length-1)
            {index=0}
          }
        
        };


        const handleEnded = () => {
          // Pause the video 4 seconds before the end
          const cutTime = videoElement.duration - 10;
          if (videoElement.currentTime >= cutTime) {
            videoElement.pause();
            playNextVideo();
          }
        };
    
        videoElement.addEventListener('ended', handleEnded);
    
        playNextVideo();
    
        return () => {
          videoElement.removeEventListener('ended', handleEnded);
        };
      }, [videos]);
    
      return (
        <Player  
        fluid={false}
        width="100%"
        height={450}>
        <video id="video" ref={videoRef} controls={false} autoPlay />
        </Player>
      );
  };
  export default VideoPlayer