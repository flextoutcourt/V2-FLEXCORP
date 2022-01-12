import React, {useEffect, useState, useRef} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function VideoShow(){
    
    const IntroVideoRef = useRef(null);
    const videoRef = useRef(null);
    
    useEffect(() => {
        // asscroll.enable();

        gsap.registerPlugin(ScrollTrigger);
        
        videoRef.current.currentTime = 0;
        let videoCurrentTime = 0,
            videoDuration = 0,
            scrollPos = 0,
            accelAmount = 0.1,
            delay = 0;
        
        ScrollTrigger.create({
            trigger: IntroVideoRef.current,
            scrub: true,
            pin: IntroVideoRef.current,
            start: 'center center',
            end: '+=20000',
            markers: false,
            onEnter: function(self){
                setInterval(() => {
                    if(videoRef.current) {
                        scrollPos = self.progress;
                        videoDuration = videoRef.current.duration;
                        videoCurrentTime = videoDuration * scrollPos;

                        videoRef.current.currentTime = videoCurrentTime;
                    }
                }, 33.3)
            }
        })
    }, [IntroVideoRef, videoRef]);


    return (
        <>
            <div ref={IntroVideoRef} className="intro h-screen">
                <video id="video" className="h-full w-full object-cover" ref={videoRef} src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video>
            </div>
            <section >
                <h1 >SECTION</h1>
            </section>
        </>
    )

}