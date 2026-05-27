"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, Mountain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ka', label: 'ქართული', flag: 'KA' },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/packages', label: t('nav.packages') },
    { href: '/destinations', label: t('nav.destinations') },
    { href: '/map', label: 'Map' },
    { href: '/about', label: t('nav.about') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
  ]

  const isTransparent = isHomePage && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              'flex items-center justify-center w-9 h-9 rounded-lg transition-colors',
              isTransparent ? 'bg-white/20' : 'bg-primary'
            )}>
              <Mountain className={cn(
                'w-5 h-5',
                isTransparent ? 'text-white' : 'text-primary-foreground'
              )} />
            </div>
            <div>
              <div className={cn(
                'font-bold text-base leading-none tracking-tight transition-colors',
                isTransparent ? 'text-white' : 'text-foreground'
              )}>
                GeorgianSoul
              </div>
              <div className={cn(
                'text-xs leading-none mt-0.5 uppercase transition-colors',
                isTransparent ? 'text-white/70' : 'text-muted-foreground'
              )}>
                Online
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href} href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? isTransparent
                      ? 'text-white bg-white/15'
                      : 'text-primary bg-primary/10'
                    : isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'gap-1.5 text-sm font-medium',
                    isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline uppercase text-xs font-semibold tracking-wide">
                    {i18n.language.toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={cn(
                      'gap-2 cursor-pointer',
                      i18n.language === lang.code && 'text-primary font-medium'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Now CTA */}
            <Button
              asChild
              size="sm"
              className={cn(
                'hidden sm:flex font-medium text-sm',
                isTransparent
                  ? 'bg-white text-foreground hover:bg-white/90'
                  : ''
              )}
            >
              <Link href="/booking">{t('nav.bookNow')}</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-md transition-colors',
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-muted'
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href} href={link.href}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <Button asChild className="w-full">
                <Link href="/booking">{t('nav.bookNow')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

