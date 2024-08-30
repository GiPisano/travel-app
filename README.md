# **Travel App**

Travel App è una web app per la pianificazione e gestione dei tuoi viaggi. Ti permette di creare un viaggio, calcolare automaticamente i giorni del viaggio e gestire le tappe giornaliere, con dettagli come immagini, descrizione, pasti e altro.

## **Indice**

- [Demo](#demo)
- [Funzionalità](#funzionalità)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Persistenza dei Dati](#persistenza-dei-dati)

## **Demo**

Link alla demo dell'app: [Travel App Demo](https://your-travel-diary.netlify.app/)

## **Funzionalità**

- **Creazione di un Viaggio:**
  - Inserisci il nome del viaggio, la data di inizio, la data di fine, un'immagine rappresentativa, e una descrizione.
  - Il nome del viaggio aggiorna automaticamente una mappa interattiva che visualizza la posizione generale del viaggio.

- **Gestione Automatica delle Giornate:**
  - Le giornate del viaggio vengono calcolate automaticamente in base alle date di inizio e fine inserite.
  
- **Gestione delle Tappe Giornaliere:**
  - Per ogni giorno, puoi inserire una o più tappe da visitare.
  - Aggiungi immagini specifiche per ciascuna tappa.
  - Indica dove mangi a pranzo e a cena.
  - Inserisci altre informazioni come curiosità o note personalizzate.

- **Mappa Interattiva:**
  - Visualizza le tappe del viaggio su una mappa tramite l'integrazione con il servizio di mappe TomTom.

- **Progressione delle Tappe:**
  - Tieni traccia della progressione delle tappe del tuo viaggio e mantieni le informazioni anche dopo la chiusura della pagina tramite LocalStorage.

## **Tecnologie Utilizzate**

- **Vue.js**: Framework principale per lo sviluppo dell'applicazione.
- **Vite**: Strumento di build utilizzato per il bundling e lo sviluppo.
- **LocalStorage**: Utilizzato per la persistenza dei dati lato client.
- **TomTom API**: Servizio di mappe utilizzato per visualizzare la meta.
- **HTML/CSS/SCSS**: Per la struttura e lo stile dell'interfaccia utente.
- **Bootstrap**: Per la gestione del layout e componenti UI.

## **Persistenza dei Dati**

L'applicazione utilizza LocalStorage per salvare i dettagli del viaggio e delle tappe. Questo permette di mantenere i dati anche dopo la chiusura del browser.

