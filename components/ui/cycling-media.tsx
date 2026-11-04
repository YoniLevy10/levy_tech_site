"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

export function CyclingMedia({
  title,
  image,
  images,
  video,
  portrait,
  contain,
  playLabel,
}: {
  title: string
  image: string | null
  images?: string[]
  video: string | null
  portrait?: boolean
  contain?: boolean
  playLabel: string
}) {
  const frames = images?.length ? images : image ? [image] : []
  const [index, setIndex] = useState(0)
  const [imageOk, setImageOk] = useState(frames.length > 0)
  const [videoOk, setVideoOk] = useState(Boolean(video))
  const [playing, setPlaying] = useState(false)
  const videoFit = portrait ? "object-contain" : "object-cover object-top"
  const imageFit = contain ? "object-contain" : "object-cover object-top"
  const frameClass = contain ? "aspect-[1024/610]" : "aspect-[16/10]"
  const current = frames[index] ?? image

  useEffect(() => {
    if (playing || frames.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % frames.length)
    }, 2800)
    return () => window.clearInterval(timer)
  }, [frames.length, playing])

  if (!imageOk && !videoOk) return <div className="h-px w-full bg-gold/70" />

  return (
    <div className={`relative overflow-hidden bg-surface-2 ${frameClass}`}>
      {playing && videoOk && video ? (
        <video
          className={`h-full w-full ${videoFit}`}
          src={video}
          poster={current ?? undefined}
          controls
          autoPlay
          playsInline
          onError={() => {
            setVideoOk(false)
            setPlaying(false)
          }}
        />
      ) : imageOk ? (
        frames.map((src, frame) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: frame === index ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={frame === index ? title : ""}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={imageFit}
              onError={() => {
                if (frame === index) setImageOk(false)
              }}
            />
          </div>
        ))
      ) : null}
      {frames.length > 1 && !playing ? (
        <div className="absolute bottom-3 start-3 z-20 flex gap-1.5 rounded-full bg-background/85 px-2.5 py-2">
          {frames.map((src, frame) => (
            <button
              key={src}
              type="button"
              aria-label={`${frame + 1} / ${frames.length}`}
              aria-current={frame === index ? "true" : undefined}
              onClick={() => setIndex(frame)}
              className={`size-2 rounded-full ${frame === index ? "bg-gold" : "bg-foreground/30"}`}
            />
          ))}
        </div>
      ) : null}
      {video && videoOk && !playing ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute bottom-3 end-3 z-20 grid size-10 place-items-center rounded-full bg-gold text-background"
          aria-label={playLabel}
        >
          <Play aria-hidden className="size-4 translate-x-px fill-current rtl:-translate-x-px rtl:-scale-x-100" />
        </button>
      ) : null}
    </div>
  )
}
