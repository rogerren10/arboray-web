import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ROICalculator } from "@/components/roi-calculator"
import { ProductArchitecture } from "@/components/product-architecture"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PainPointsSection />
        <ROICalculator />
        <ProductArchitecture />
      </main>
      <Footer />
    </div>
  )
}
