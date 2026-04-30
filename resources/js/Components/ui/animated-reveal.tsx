import * as React from "react"
import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

type AnimatedRevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
}

export function AnimatedReveal({
  className,
  children,
  delay = 0,
  y = 24,
  ...props
}: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
