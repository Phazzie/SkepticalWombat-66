import Image from "next/image"

type WombatOutfit = "business" | "hip-hop" | "streetwear"
type WombatSize = "xs" | "sm" | "md" | "lg" | "xl"

interface WombatAvatarProps {
  outfit: WombatOutfit
  size?: WombatSize
}

export function WombatAvatar({ outfit, size = "md" }: WombatAvatarProps) {
  const sizeMap: Record<WombatSize, number> = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 200,
  }

  const pixelSize = sizeMap[size]

  // In a real app, we would have actual wombat images for each outfit
  // For now, we'll use placeholder images with different colors for each outfit
  const outfitColorMap: Record<WombatOutfit, string> = {
    business: "4F46E5", // indigo
    "hip-hop": "7C3AED", // purple
    streetwear: "0891B2", // cyan
  }

  return (
    <div className="relative overflow-hidden rounded-full">
      <Image
        src={`/placeholder.svg?height=${pixelSize}&width=${pixelSize}&text=🦝&bg=${outfitColorMap[outfit]}`}
        alt={`Skeptical Wombat in ${outfit} outfit`}
        width={pixelSize}
        height={pixelSize}
        className="object-cover"
      />
    </div>
  )
}
