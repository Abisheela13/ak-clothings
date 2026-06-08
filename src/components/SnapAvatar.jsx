import React, {useRef, useEffect, useState} from 'react'
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'
import placeholder from '../assets/avatar-placeholder.svg'

function posterizeImage(ctx, width, height, levels = 8){
  const imgData = ctx.getImageData(0,0,width,height)
  const d = imgData.data
  const step = 256/levels
  for(let i=0;i<d.length;i+=4){
    d[i] = Math.floor(d[i]/step)*step + step/2
    d[i+1] = Math.floor(d[i+1]/step)*step + step/2
    d[i+2] = Math.floor(d[i+2]/step)*step + step/2
  }
  ctx.putImageData(imgData,0,0)
}

function drawEdgeOverlay(ctx, width, height, amount=0.8){
  // simple luminance-based edge by convolution (Sobel-like)
  const src = ctx.getImageData(0,0,width,height)
  const s = src.data
  const out = ctx.createImageData(width,height)
  const o = out.data
  function lum(x){ return 0.299*x[0] + 0.587*x[1] + 0.114*x[2] }
  const getLum = (x,y)=>{
    const i = (y*width + x)*4
    return lum([s[i],s[i+1],s[i+2]])
  }
  for(let y=1;y<height-1;y++){
    for(let x=1;x<width-1;x++){
      const gx = -getLum(x-1,y-1) -2*getLum(x-1,y) - getLum(x-1,y+1) + getLum(x+1,y-1) + 2*getLum(x+1,y) + getLum(x+1,y+1)
      const gy = -getLum(x-1,y-1) -2*getLum(x,y-1) - getLum(x+1,y-1) + getLum(x-1,y+1) + 2*getLum(x,y+1) + getLum(x+1,y+1)
      const g = Math.min(255, Math.sqrt(gx*gx + gy*gy))
      const idx = (y*width + x)*4
      o[idx] = o[idx+1] = o[idx+2] = 0
      o[idx+3] = Math.min(255, g*amount)
    }
  }
  ctx.putImageData(out,0,0)
  // overlay multiply
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = 'rgba(0,0,0,0.15)'
  ctx.fillRect(0,0,width,height)
  ctx.globalCompositeOperation = 'source-over'
}

export default function SnapAvatar({ src, size=260, stylize = false }){
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(src || '/src/assets/avatar.png')
  const [offset, setOffset] = useState({x:0,y:0})
  const dragState = useRef({dragging:false,startX:0,startY:0,startOffsetX:0,startOffsetY:0})
  const [hovered, setHovered] = useState(false)

  // motion values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, {stiffness: 160, damping: 22})
  const y = useSpring(rawY, {stiffness: 160, damping: 22})
  const rotateY = useTransform(x, [-80,80], [12,-12])
  const rotateX = useTransform(y, [-60,60], [-6,6])
  const dragX = useMotionValue(0) // controlled by drag
  const rotateZ = useTransform(dragX, [-150,150], [-6,6])

  // draw function that uses offset for manual repositioning
  function draw(){
    const img = imgRef.current
    const canvas = canvasRef.current
    if(!img || !canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width = size
    const h = canvas.height = Math.round(size * 1.1)
    ctx.clearRect(0,0,w,h)
    // fill background pastel
    ctx.fillStyle = '#fff7fb'
    ctx.fillRect(0,0,w,h)
    // draw image centered and cover, then apply offset
    const ratio = Math.max(w / img.width, h / img.height)
    const iw = img.width * ratio
    const ih = img.height * ratio
    const ix = (w - iw)/2 + offset.x
    const iy = (h - ih)/2 + offset.y
    ctx.drawImage(img, ix, iy, iw, ih)
    if(stylize){
      // optional stylize: posterize and subtle edges
      posterizeImage(ctx, w, h, 7)
      drawEdgeOverlay(ctx, w, h, 0.9)
    }
    // soft vignette for depth
    const grad = ctx.createRadialGradient(w/2,h/2, w*0.2, w/2,h/2, w*0.9)
    grad.addColorStop(0, 'rgba(0,0,0,0)')
    grad.addColorStop(1, 'rgba(0,0,0,0.04)')
    ctx.fillStyle = grad
    ctx.fillRect(0,0,w,h)
  }

  useEffect(()=>{
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imgSrc
    imgRef.current = img
    img.onload = ()=> draw()
    img.onerror = ()=> setImgSrc(placeholder)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imgSrc, size])

  useEffect(()=>{ draw() },[offset])

  function handleMove(e){
    const rect = canvasRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const px = clientX - rect.left - rect.width/2
    const py = clientY - rect.top - rect.height/2
    rawX.set(px/8)
    rawY.set(py/18)
    // if dragging the image, update offset
    if(dragState.current.dragging){
      const dx = clientX - dragState.current.startX
      const dy = clientY - dragState.current.startY
      setOffset({x: dragState.current.startOffsetX + dx, y: dragState.current.startOffsetY + dy})
    }
  }

  function handlePointerDown(e){
    const rect = canvasRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const px = clientX - rect.left - rect.width/2
    rawX.set((px / rect.width) * 90)
    // start dragging image
    dragState.current.dragging = true
    dragState.current.startX = clientX
    dragState.current.startY = clientY
    dragState.current.startOffsetX = offset.x
    dragState.current.startOffsetY = offset.y
    setHovered(true)
  }

  function handlePointerUp(){ rawX.set(0); rawY.set(0); dragState.current.dragging = false; setHovered(false); animate(dragX, 0, { type: 'spring', stiffness: 220, damping: 20 }) }

  return (
    <motion.div className="mx-auto touch-none cursor-grab"
      style={{rotateY, rotateX, rotateZ: rotateZ, perspective:900, x: dragX}}
      onMouseMove={handleMove}
      onMouseLeave={handlePointerUp}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handleMove}
      onTouchEnd={handlePointerUp}
      drag="x"
      dragConstraints={{left:-140,right:140}}
      dragElastic={0.25}
      whileTap={{cursor:'grabbing'}}
    >
      <motion.div animate={ hovered ? { y: [0,-8,0] } : { y: [0,-6,0] } } transition={{ duration: 3, repeat: Infinity }} style={{width: size, height: Math.round(size*1.1)}} className="rounded-xl overflow-hidden shadow-2xl border border-white/30 glass relative">
        <canvas ref={canvasRef} width={size} height={Math.round(size*1.1)} className="w-full h-full block" />
        {/* mouth / smile overlay */}
        <motion.div className="absolute left-1/2 transform -translate-x-1/2 bottom-6"
          initial={{scale:0.8, opacity:0.6}}
          animate={ hovered ? { scale: 1.05, opacity: 1 } : { scale: 0.9, opacity: 0.75 } }
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div style={{width:64, height:10, borderRadius:999, background: 'linear-gradient(90deg,#ffe59a,#ffd36a)'}} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
