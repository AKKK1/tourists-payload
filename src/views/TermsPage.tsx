"use client"

import { useTranslation } from 'react-i18next'

export function TermsPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <main className="pt-20">
      <div className="bg-muted/30 border-b border-border py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">
            {lang === 'de' ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {lang === 'de' ? 'Stand: Januar 2025' : 'As of: January 2025'}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {lang === 'de' ? (
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§1 Anbieter</h2>
              <p>Georgia Soul Travels, Rustaveli Avenue 42, 0108 Tiflis, Georgien. Diese AGB gelten für alle Buchungen und Reisedienstleistungen, die über unsere Website oder direkt bei uns gebucht werden.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§2 Buchung und Vertragsschluss</h2>
              <p>Mit dem Absenden des Buchungsformulars übermitteln Sie eine unverbindliche Anfrage. Eine verbindliche Buchung entsteht erst nach schriftlicher Buchungsbestätigung durch Georgia Soul Travels und Eingang der Anzahlung (30% des Reisepreises).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§3 Preise und Zahlung</h2>
              <p>Alle Preise verstehen sich pro Person in Euro (€) und beinhalten die in der jeweiligen Paketbeschreibung genannten Leistungen. Internationale Flüge sind grundsätzlich nicht enthalten.</p>
              <p className="mt-3">Zahlungsbedingungen: 30% Anzahlung bei Buchungsbestätigung, 70% Restzahlung 30 Tage vor Reisebeginn.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§4 Stornierung durch den Reisenden</h2>
              <ul className="list-disc ml-5 space-y-2 mt-2">
                <li>Bis 30 Tage vor Reisebeginn: kostenlose Stornierung</li>
                <li>15–29 Tage vor Reisebeginn: 50% des Gesamtpreises</li>
                <li>8–14 Tage vor Reisebeginn: 75% des Gesamtpreises</li>
                <li>Weniger als 7 Tage vor Reisebeginn: 100% des Gesamtpreises</li>
              </ul>
              <p className="mt-3">Eine Reiserücktrittsversicherung wird dringend empfohlen.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§5 Stornierung durch Georgia Soul Travels</h2>
              <p>Bei höherer Gewalt, behördlichen Einschränkungen oder unzureichender Teilnehmerzahl behalten wir uns das Recht vor, Reisen abzusagen. In diesem Fall werden bereits gezahlte Beträge vollständig erstattet.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§6 Reiseversicherung</h2>
              <p>Eine Auslandskrankenversicherung und Reiserücktrittsversicherung sind für alle Reisenden obligatorisch. Wir empfehlen eine umfassende Reiseversicherung einschließlich Notfall-Rücktransport.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§7 Haftung</h2>
              <p>Georgia Soul Travels haftet für Schäden, die durch schuldhafte Verletzung einer Hauptleistungspflicht entstehen. Für leichte Fahrlässigkeit bei Verletzung nicht wesentlicher Pflichten ist die Haftung ausgeschlossen.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§8 Anwendbares Recht</h2>
              <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, Berlin.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§9 Kontakt</h2>
              <p>Georgia Soul Travels, hello@georgiasoul.travel, +995 599 000 000</p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Provider</h2>
              <p>Georgia Soul Travels, Rustaveli Avenue 42, 0108 Tbilisi, Georgia. These terms apply to all bookings and travel services booked through our website or directly with us.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Booking and Contract Formation</h2>
              <p>By submitting the booking form you send a non-binding inquiry. A binding booking is only formed after written booking confirmation by Georgia Soul Travels and receipt of the deposit (30% of the travel price).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Prices and Payment</h2>
              <p>All prices are per person in Euros (€) and include the services stated in the respective package description. International flights are generally not included.</p>
              <p className="mt-3">Payment terms: 30% deposit upon booking confirmation, 70% balance 30 days before departure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Cancellation by the Traveler</h2>
              <ul className="list-disc ml-5 space-y-2 mt-2">
                <li>Up to 30 days before departure: free cancellation</li>
                <li>15–29 days before departure: 50% of total price</li>
                <li>8–14 days before departure: 75% of total price</li>
                <li>Less than 7 days before departure: 100% of total price</li>
              </ul>
              <p className="mt-3">Travel cancellation insurance is strongly recommended.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Cancellation by Georgia Soul Travels</h2>
              <p>In cases of force majeure, governmental restrictions or insufficient participants, we reserve the right to cancel trips. In this case, amounts already paid will be fully refunded.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Travel Insurance</h2>
              <p>International health insurance and travel cancellation insurance are mandatory for all travelers. We recommend comprehensive travel insurance including emergency repatriation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Liability</h2>
              <p>Georgia Soul Travels is liable for damages arising from culpable breach of a main performance obligation. Liability for slight negligence in breach of non-essential obligations is excluded.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Applicable Law</h2>
              <p>The laws of the Federal Republic of Germany apply. Place of jurisdiction, to the extent legally permissible, is Berlin.</p>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
