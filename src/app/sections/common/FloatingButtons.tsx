"use client"

import styles from "./FloatingButtons.module.css"
import { FaPhone, FaWhatsapp } from "react-icons/fa"

const FloatingButtons = () => {
  return (
    <div>
      <a target="_blank" href="https://wa.me/+529618712767" className={styles.whatsapp} rel="noreferrer">
        <FaWhatsapp size={22} />
      </a>

      <a href="tel:+529618712767" className={styles.phonecall}>
        <FaPhone size={12} />
      </a>
    </div>
  )
}

export default FloatingButtons

