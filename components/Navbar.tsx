"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Heart, ShoppingCart, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu'
import LogoutButton from './Logout'
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from '@/store/wishlist-store'

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/post", label: "Post" },
  { href: "/contact", label: "Contact" },
]

const Navbar = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const cart = useCartStore((state) => state.cart)
  const wishlist = useWishlistStore((state) => state.wishlist)

  if (status === "loading") {
    return (
      <div className="bg-background/80 backdrop-blur-lg py-3 h-[64px] border-b border-border/50" />
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container width flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-primary shrink-0" onClick={() => setMobileOpen(false)}>
          <h3 className="text-xl font-bold tracking-tight">LOGO</h3>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative font-semibold text-sm transition-colors ${
                      isActive ? "text-primary" : "text-primary/70 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      />
                    )}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative rounded-full p-2 transition hover:bg-accent/20"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-semibold text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-full p-2 transition hover:bg-accent/20"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-semibold text-primary-foreground">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Login / Logout — desktop only */}
          <div className="hidden lg:block">
            {session ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden rounded-full p-2 text-primary hover:bg-accent/20 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-background"
          >
            <nav className="container flex flex-col py-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 font-semibold text-base border-b border-border/30 last:border-none transition-colors ${
                      isActive ? "text-primary" : "text-primary/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="pt-4">
                {session ? (
                  <LogoutButton />
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar