"use client"

import { useTranslation } from 'react-i18next'

export function PrivacyPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      <div className="bg-muted/30 border-b border-border py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">
            {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {lang === 'de' ? 'Zuletzt aktualisiert: Januar 2025' : 'Last updated: January 2025'}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {lang === 'de' ? (
          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Verantwortlicher</h2>
              <p>GeorgianSoul<br />
              Rustaveli Avenue 42<br />
              0108 Tiflis, Georgien<br />
              E-Mail: hello@georgiansoul.online<br />
              WhatsApp: +49 177 2209295</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>Wir erheben personenbezogene Daten nur, wenn Sie uns diese aktiv mitteilen — etwa beim Ausfüllen des Buchungsformulars. Dies umfasst: Name, E-Mail-Adresse, WhatsApp-Nummer, Reisedaten und optionale Nachricht.</p>
              <p className="mt-3">Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kommunikation im Rahmen Ihrer Buchung.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Rechtsgrundlage</h2>
              <p>Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), sofern zutreffend.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Datenspeicherung</h2>
              <p>Ihre Daten werden in einer gesicherten Datenbank gespeichert (Supabase, Server in der EU). Wir bewahren Anfragedaten für maximal 2 Jahre nach Ihrer letzten Kontaktaufnahme auf, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Weitergabe an Dritte</h2>
              <p>Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer es ist für die Abwicklung Ihrer Reise erforderlich (z.B. lokale Unterkunft, Transportpartner) oder wir sind gesetzlich dazu verpflichtet.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Ihre Rechte</h2>
              <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: hello@georgiansoul.online</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Cookies</h2>
              <p>Diese Website verwendet ausschließlich technisch notwendige Cookies (z.B. Spracheinstellung). Es werden keine Tracking- oder Werbe-Cookies eingesetzt.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Kontakt Datenschutz</h2>
              <p>Bei Fragen zum Datenschutz wenden Sie sich an: hello@georgiansoul.online</p>
            </section>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Controller</h2>
              <p>GeorgianSoul<br />
              Rustaveli Avenue 42<br />
              0108 Tbilisi, Georgia<br />
              Email: hello@georgiansoul.online<br />
              WhatsApp: +49 177 2209295</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Collection and Processing of Personal Data</h2>
              <p>We only collect personal data when you actively provide it to us — for example when filling out the booking form. This includes: name, email address, WhatsApp number, travel dates and optional message.</p>
              <p className="mt-3">We use this data exclusively to process your inquiry and for communication in connection with your booking.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Legal Basis</h2>
              <p>Processing of your data is based on Art. 6(1)(b) GDPR (performance of a contract or pre-contractual measures) and Art. 6(1)(a) GDPR (consent), as applicable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Data Storage</h2>
              <p>Your data is stored in a secured database (Supabase, servers in the EU). We retain inquiry data for up to 2 years after your last contact, unless legal retention obligations apply.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Third Party Disclosure</h2>
              <p>We do not share your personal data with third parties unless required to process your trip (e.g. local accommodation, transport partners) or required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Your Rights</h2>
              <p>You have the right to access, rectification, deletion, restriction of processing and data portability. To exercise your rights please contact: hello@georgiansoul.online</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Cookies</h2>
              <p>This website uses only technically necessary cookies (e.g. language preference). No tracking or advertising cookies are used.</p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
