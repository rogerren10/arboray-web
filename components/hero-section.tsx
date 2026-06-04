"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  type: "strain" | "pathway" | "metabolite"
  connections: number[]
}

export function HeroSection() {
  const t = useTranslations("hero")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const initializeNetwork = useCallback((width: number, height: number) => {
    const nodeCount = 20
    const nodes: Node[] = []
    const types: Node["type"][] = ["strain", "pathway", "metabolite"]
    
    for (let i = 0; i < nodeCount; i++) {
      const connections: number[] = []
      // Each node connects to 1-2 nearby nodes
      const numConnections = 1 + Math.floor(Math.random() * 2)
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * nodeCount)
        if (target !== i && !connections.includes(target)) {
          connections.push(target)
        }
      }
      
      nodes.push({
        id: i,
        x: 50 + Math.random() * (width - 100),
        y: 50 + Math.random() * (height - 100),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 4 + Math.random() * 3,
        type: types[Math.floor(Math.random() * types.length)],
        connections,
      })
    }
    nodesRef.current = nodes
  }, [])

  const hoveredNodeRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      if (nodesRef.current.length === 0) {
        initializeNetwork(rect.width, rect.height)
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      
      // Check if hovering over a node
      let foundNode: number | null = null
      for (const node of nodesRef.current) {
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < node.radius * 3) {
          foundNode = node.id
          break
        }
      }
      hoveredNodeRef.current = foundNode
      setHoveredNode(foundNode)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const getNodeColor = (type: Node["type"], alpha: number = 1) => {
      switch (type) {
        case "strain":
          return `rgba(14, 165, 165, ${alpha})` // Cyan
        case "pathway":
          return `rgba(16, 185, 129, ${alpha})` // Mint
        case "metabolite":
          return `rgba(99, 102, 241, ${alpha * 0.7})` // Indigo muted
        default:
          return `rgba(14, 165, 165, ${alpha})`
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)
      const nodes = nodesRef.current

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Soft bounce off edges
        if (node.x <= 20 || node.x >= width - 20) node.vx *= -1
        if (node.y <= 20 || node.y >= height - 20) node.vy *= -1

        node.x = Math.max(20, Math.min(width - 20, node.x))
        node.y = Math.max(20, Math.min(height - 20, node.y))
      })

      // Draw connections - only show relevant ones on hover
      const currentHovered = hoveredNodeRef.current
      nodes.forEach((node) => {
        const isHovered = currentHovered === node.id
        const isConnectedToHovered = currentHovered !== null && node.connections.includes(currentHovered)
        const shouldHighlight = isHovered || isConnectedToHovered || (currentHovered !== null && nodesRef.current[currentHovered]?.connections.includes(node.id))
        
        node.connections.forEach((targetId) => {
          const target = nodes[targetId]
          if (!target) return
          
          const dx = target.x - node.x
          const dy = target.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 250) {
            const baseOpacity = currentHovered === null ? 0.15 : (shouldHighlight ? 0.5 : 0.05)
            const opacity = baseOpacity * (1 - dist / 250)
            
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = shouldHighlight ? `rgba(14, 165, 165, ${opacity})` : `rgba(148, 163, 184, ${opacity})`
            ctx.lineWidth = shouldHighlight ? 2 : 1
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        const currentHovered = hoveredNodeRef.current
        const isHovered = currentHovered === node.id
        const isConnectedToHovered = currentHovered !== null && (
          node.connections.includes(currentHovered) || 
          nodesRef.current[currentHovered]?.connections.includes(node.id)
        )
        const shouldHighlight = isHovered || isConnectedToHovered
        const baseAlpha = currentHovered === null ? 0.6 : (shouldHighlight ? 1 : 0.2)

        // Subtle glow for highlighted nodes
        if (shouldHighlight) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 4
          )
          gradient.addColorStop(0, getNodeColor(node.type, 0.3))
          gradient.addColorStop(1, "transparent")
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, isHovered ? node.radius * 1.5 : node.radius, 0, Math.PI * 2)
        ctx.fillStyle = getNodeColor(node.type, baseAlpha)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hoveredNode, initializeNetwork])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-secondary/30">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - Content (2/3) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm text-primary font-medium">{t("tag")}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight text-balance">
              {t("title")}
              <span className="text-gradient-cyan"> {t("titleHighlight")}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base shadow-lg shadow-primary/20">
                {t("ctaPrimary")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-base border-border hover:bg-secondary text-foreground">
                <Play className="mr-2 h-5 w-5" />
                {t("ctaSecondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              {[
                { value: "100K+", label: t("stats.strains") },
                { value: ">80%", label: t("stats.accuracy") },
                { value: "-40%", label: t("stats.reduction") },
                { value: "99.9%", label: t("stats.security") },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient-cyan mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Network Visualization (1/3) */}
          <div className="lg:col-span-2 relative" ref={containerRef}>
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl border border-border bg-background/50 overflow-hidden shadow-sm">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
              />
              {/* Hover hint */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
                  {t("hoverHint")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
