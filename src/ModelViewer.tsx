import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { RotateCcw, Sparkles } from 'lucide-react'
import * as THREE from 'three'

function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => scene.clone(), [scene])
  return <Bounds fit clip><Center><primitive object={clone} /></Center></Bounds>
}

function LoadingModel() {
  return <Html center><div className="model-loading"><Sparkles size={16} /> Modell betöltése…</div></Html>
}

export function ModelViewer({ blob }: { blob?: Blob }) {
  const [autoRotate, setAutoRotate] = useState(true)
  const [key, setKey] = useState(0)
  const url = useMemo(() => blob ? URL.createObjectURL(blob) : null, [blob])

  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])

  if (!url) return null

  return <div className="model-stage">
    <Canvas key={key} camera={{ position: [4, 2.2, 5], fov: 36 }} dpr={[1, 1.5]} shadows gl={{ antialias: true }}>
      <color attach="background" args={['#10161b']} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 5, 4]} intensity={3} castShadow />
      <Suspense fallback={<LoadingModel />}>
        <UploadedModel url={url} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={2} maxDistance={10} autoRotate={autoRotate} autoRotateSpeed={0.8} />
    </Canvas>
    <div className="model-controls">
      <button className={`icon-button ${autoRotate ? 'is-active' : ''}`} onClick={() => setAutoRotate((value) => !value)} aria-label="Automatikus forgatás" title="Automatikus forgatás"><Sparkles size={16} /></button>
      <button className="icon-button" onClick={() => setKey((value) => value + 1)} aria-label="Nézet visszaállítása" title="Nézet visszaállítása"><RotateCcw size={16} /></button>
    </div>
  </div>
}

void THREE