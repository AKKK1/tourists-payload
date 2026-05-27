"use client"

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Mail, MessageCircle, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface FormData {
  first_name: string
  last_name: string
  email: string
  phone?: string
  country?: string
  preferred_dates_from?: string
  preferred_dates_to?: string
  num_adults: number
  num_children: number
  package_name?: string
  message?: string
}

const schema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  preferred_dates_from: z.string().optional(),
  preferred_dates_to: z.string().optional(),
  num_adults: z.string().transform(Number),
  num_children: z.string().transform(Number),
  package_name: z.string().optional(),
  message: z.string().optional(),
})

const countries = [
  'Deutschland', 'Osterreich', 'Schweiz', 'Vereinigtes Konigreich', 'Frankreich',
  'Niederlande', 'Belgien', 'Schweden', 'Norwegen', 'Danemark', 'Finnland',
  'Italien', 'Spanien', 'Polen', 'Tschechien', 'United States', 'Canada',
  'Australia', 'Georgia', 'Other',
]

export function BookingPage() {
  const { t, i18n } = useTranslation()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const lang = i18n.language

  const packageParam = searchParams?.get('package') || ''
  const packageNameMap: Record<string, string> = {
    'basic-escape': lang === 'de' ? 'Basic Escape (7 Tage, ab EUR 890)' : 'Basic Escape (7 days, from EUR 890)',
    'deep-georgia': lang === 'de' ? 'Tiefes Georgien (12 Tage, ab EUR 1.590)' : 'Deep Georgia (12 days, from EUR 1,590)',
    'custom-soul-recovery': lang === 'de' ? 'Individuelle Seelen-Erholung' : 'Custom Soul Recovery Trip',
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      num_adults: 2,
      num_children: 0,
      package_name: packageNameMap[packageParam] || '',
    },
  })

  useEffect(() => {
    if (packageParam && packageNameMap[packageParam]) {
      setValue('package_name', packageNameMap[packageParam])
    }
  }, [packageParam, lang])

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const response = await fetch('/api/booking-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone || '',
          country: data.country || '',
          preferredDatesFrom: data.preferred_dates_from || undefined,
          preferredDatesTo: data.preferred_dates_to || undefined,
          numAdults: data.num_adults,
          numChildren: data.num_children,
          packageName: data.package_name || '',
          message: data.message || '',
          language: lang,
          source: 'website',
          utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      })
      if (!response.ok) throw new Error('Booking request failed')
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="bg-[oklch(0.32_0.08_155)] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 block">
            GeorgianSoul
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('booking.title')}
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">{t('booking.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {status === 'success' ? (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[oklch(0.32_0.08_155)]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[oklch(0.32_0.08_155)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{t('booking.successTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('booking.successText')}</p>
            <div className="mt-8 flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setStatus('idle')}>
                {lang === 'de' ? 'Neue Anfrage' : 'New request'}
              </Button>
              <Button asChild>
                <a href="https://wa.me/491772209295" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                    <span className="text-sm text-destructive">{t('booking.errorText')}</span>
                  </div>
                )}

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="first_name" className="text-sm font-medium">
                      {t('booking.firstName')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      {...register('first_name')}
                      className={cn(errors.first_name && 'border-destructive')}
                      placeholder="Max"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="last_name" className="text-sm font-medium">
                      {t('booking.lastName')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="last_name"
                      {...register('last_name')}
                      className={cn(errors.last_name && 'border-destructive')}
                      placeholder="Mustermann"
                    />
                  </div>
                </div>

                {/* Email + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('booking.email')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={cn(errors.email && 'border-destructive')}
                      placeholder="max@example.de"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      {t('booking.phone')}
                    </Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                    placeholder="+49 177 ..."
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">{t('booking.country')}</Label>
                  <Select onValueChange={(v) => setValue('country', v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('booking.country')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="date_from" className="text-sm font-medium">
                      {t('booking.dateFrom')}
                    </Label>
                    <Input
                      id="date_from"
                      type="date"
                      {...register('preferred_dates_from')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="date_to" className="text-sm font-medium">
                      {t('booking.dateTo')}
                    </Label>
                    <Input
                      id="date_to"
                      type="date"
                      {...register('preferred_dates_to')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* People count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="num_adults" className="text-sm font-medium">
                      {t('booking.adults')}
                    </Label>
                    <Select
                      defaultValue="2"
                      onValueChange={(v) => setValue('num_adults', parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="num_children" className="text-sm font-medium">
                      {t('booking.children')}
                    </Label>
                    <Select
                      defaultValue="0"
                      onValueChange={(v) => setValue('num_children', parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Package */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">{t('booking.package')}</Label>
                  <Select
                    defaultValue={packageNameMap[packageParam] || ''}
                    onValueChange={(v) => setValue('package_name', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.selectPackage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={t('booking.noPreference')}>{t('booking.noPreference')}</SelectItem>
                      <SelectItem value={t('booking.packageBasic')}>{t('booking.packageBasic')}</SelectItem>
                      <SelectItem value={t('booking.packageDeep')}>{t('booking.packageDeep')}</SelectItem>
                      <SelectItem value={t('booking.packageCustom')}>{t('booking.packageCustom')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t('booking.message')}
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder={t('booking.messagePlaceholder')}
                    className="min-h-32 resize-y"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full font-semibold text-base"
                >
                  {status === 'loading' ? t('booking.submitting') : t('booking.submit')}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {lang === 'de'
                    ? 'Wir antworten innerhalb von 24 Stunden. Kein Spam, versprochen.'
                    : 'We reply within 24 hours. No spam, we promise.'}
                </p>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              {/* Contact card */}
              <div className="bg-muted/40 rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {lang === 'de' ? 'Direkter Kontakt' : 'Direct contact'}
                </h3>
                <div className="space-y-3">
                  <a href="mailto:info@georgiansoul.online" className="flex items-center gap-2.5 text-sm text-foreground hover:text-[oklch(0.32_0.08_155)] transition-colors">
                    <Mail className="w-4 h-4 shrink-0 text-muted-foreground" />
                    info@georgiansoul.online
                  </a>
                  <a href="https://wa.me/491772209295" className="flex items-center gap-2.5 text-sm text-foreground hover:text-[oklch(0.32_0.08_155)] transition-colors">
                    <MessageCircle className="w-4 h-4 shrink-0 text-muted-foreground" />
                    +49 177 2209295
                  </a>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    Tbilisi, Georgia
                  </div>
                </div>
              </div>

              {/* Trust items */}
              <div className="bg-[oklch(0.32_0.08_155)]/5 border border-[oklch(0.32_0.08_155)]/15 rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {lang === 'de' ? 'Warum uns buchen?' : 'Why book with us?'}
                </h3>
                <ul className="space-y-2.5">
                  {(lang === 'de' ? [
                    'Antwort innerhalb 24 Stunden',
                    'Kostenlose Stornierung (30 Tage vorher)',
                    'Deutsch sprechende Guides',
                    'Kleine Gruppen (max. 12 Personen)',
                    'Handverlesene Unterkunfte',
                    'Uber 200 zufriedene Gaste',
                  ] : [
                    'Reply within 24 hours',
                    'Free cancellation (30 days before)',
                    'German speaking guides',
                    'Small groups (max. 12 people)',
                    'Hand-picked accommodation',
                    '200+ happy guests',
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[oklch(0.45_0.08_150)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cancellation policy */}
              <div className="bg-background border border-border rounded-2xl p-5">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {lang === 'de' ? 'Stornobedingungen' : 'Cancellation policy'}
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>{lang === 'de' ? 'Bis 30 Tage vorher: kostenlos' : 'Until 30 days before: free'}</li>
                  <li>{lang === 'de' ? '15-29 Tage: 50% Erstattung' : '15-29 days: 50% refund'}</li>
                  <li>{lang === 'de' ? 'Unter 14 Tage: keine Erstattung' : 'Under 14 days: no refund'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
