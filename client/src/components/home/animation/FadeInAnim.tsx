import { motion } from 'framer-motion'
import React from 'react'

interface FadeInProps {
    children: React.ReactNode,
    classname: string
}
const FadeInTop: React.FC<FadeInProps> = ({ children, classname }) => {
    return (
        <motion.div
            initial={{ y: '-10vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: .4 }}
            className={classname}>
            {children}
        </motion.div>
    )
}

export default FadeInTop;
