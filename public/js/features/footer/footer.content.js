/**
 * @module footerContent
 * Inhalt für die Footer-Modal-Ansichten (Impressum, Kontakt, Datenschutz)
 * Besteht aus Titel und Inhaltstext für die jeweilige Ansicht
 */

const footerContent = {
    impressum: {
        title: "Impressum",
        content: `
KalenderApp GmbH  
Musterstraße 12  
12345 Musterstadt  
Deutschland  

Vertreten durch: Max Mustermann  

Kontakt:  
E-Mail: info@kalenderapp.de  
Telefon: +49 123 456789  

Registereintrag:  
Handelsregister Musterstadt, HRB 12345  

Umsatzsteuer-ID: DE123456789
`
    },
    kontakt: {
        title: "Kontakt",
        content: `
Du erreichst uns jederzeit über folgende Kanäle:

E-Mail: support@kalenderapp.de  
Telefon: +49 123 456789  

Supportzeiten:  
Montag - Freitag: 09:00 - 17:00 Uhr  

Wir antworten in der Regel innerhalb von 24 Stunden.
`
    },
    datenschutz: {
        title: "Datenschutzerklärung",
        content: `
1. Allgemeine Hinweise  
Der Schutz deiner Daten ist uns wichtig. Diese App speichert nur notwendige Daten zur Funktion der Anwendung.

2. Gespeicherte Daten  
- Aufgaben (Titel, Mitarbeiter, Datum, Beschreibung)  
- Keine personenbezogenen Tracking-Daten

3. Speicherung  
Die Daten werden lokal bzw. serverseitig ausschließlich zur Kalenderfunktion gespeichert.

4. Weitergabe  
Es erfolgt keine Weitergabe an Dritte.

5. Rechte  
Du hast jederzeit das Recht auf Auskunft, Löschung und Korrektur deiner Daten.
`
    }
}

export default footerContent;