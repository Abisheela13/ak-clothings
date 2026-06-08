import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import placeholder from '../assets/avatar-placeholder.svg'
import { useEffect } from 'react'

export default function Avatar({src, size = 220, focalY = '23%'}){
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, {stiffness: 140, damping: 20})
  const y = useSpring(rawY, {stiffness: 140, damping: 20})
  const rotateY = useTransform(x, [-80,80], [10,-10])
  const rotateX = useTransform(y, [-60,60], [-5,5])
  const rotateZ = useTransform(x, [-80,80], [-2,2])
  const [hover, setHover] = useState(false)
  const elRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(src || placeholder)

  useEffect(()=>{
    if(src){ setImgSrc(src); return }
    // prefer local avatar.jpg if present
    const test = new Image()
    test.src = '/src/assets/avatar.jpg'
    test.onload = ()=> setImgSrc('/src/assets/avatar.jpg')
    test.onerror = ()=> setImgSrc(placeholder)
  },[src])

  function handleMove(e){
    const rect = elRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const px = clientX - rect.left - rect.width/2
    const py = clientY - rect.top - rect.height/2
    rawX.set(px / 9)
    rawY.set(py / 14)
  }

  function handleTouch(e){
    // on touch move behave like mouse move
    handleMove(e)
  }

  function handlePointerDown(e){
    // stronger reaction on direct press/tap: push left/right depending on where touched
    const rect = elRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const px = clientX - rect.left - rect.width/2
    const py = clientY - rect.top - rect.height/2
    // amplify the horizontal push for a more noticeable response
    rawX.set((px / rect.width) * 80)
    rawY.set(py / 12)
    setHover(true)
  }

  function handlePointerUp(){
    // gently return to center
    rawX.set(0)
    rawY.set(0)
    setHover(false)
  }

  const imgStyle = { x, y, objectPosition: `50% ${focalY}` }

  return (
    <motion.div ref={elRef} className="w-64 h-64 mx-auto touch-none cursor-grab"
      style={{rotateY, rotateX, rotateZ, perspective: 900}}
      onMouseMove={handleMove}
      onMouseLeave={()=>{ rawX.set(0); rawY.set(0); setHover(false)}}
      onMouseEnter={()=>setHover(true)}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handleTouch}
      onTouchEnd={handlePointerUp}
      drag="x"
      dragConstraints={{left:-80,right:80}}
      whileTap={{cursor: 'grabbing'}}
    >
      <motion.div animate={{y: hover ? [0,-5,0] : [0,-7,0]}} transition={{duration:3, repeat: Infinity}} className="w-full h-full flex items-center justify-center">
        <div className="w-56 h-72 rounded-xl overflow-hidden shadow-2xl border border-white/30 glass relative">
          <motion.img src={imgSrc} alt="Avatar" className="w-full h-full object-cover"
            style={imgStyle}
            drag={false}
            whileHover={{scale:1.04}}
            draggable={false}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 w-20 h-4 rounded-full bg-yellow-200 opacity-80" style={{boxShadow: '0 6px 20px rgba(0,0,0,0.08)'}} />
        </div>
      </motion.div>
    </motion.div>
  )
}
