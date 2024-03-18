interface Airline {
    [key: string]: string;
  }
export const airline: Airline = {
    'IndiGo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSerKufXk-ZqKDcPlcP2LZuJvgBtKkqJ3GuCtwlX276OBhR7WY30xstjWSlmcafUFLRwM&usqp=CAU',
    'Air India': 'data:image/png;base64,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',
    'SpiceJet': 'https://play-lh.googleusercontent.com/GpBflSe4aTVUKcoM7xVVk0gVMEETdYF3Y_r5cNuwKDFRjnbCdpxW9m-GtyzFueCR2ODK',
    'Vistara': 'https://play-lh.googleusercontent.com/E_SwrB7iPlTB53XBwlrgNsWPM_JhJ8DPK60Ht_RDHLkim_FIGF558LPA7QXw4ksWYEU',
    'GoAir': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2pEiO57U0YEjFdFUWM6laKTdEndTOSyZBZKqzVgWv9lagE1cHFV8wwWVP3uVdur0P04&usqp=CAU',
    'AirAsia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/768px-AirAsia_New_Logo.svg.png',
}

export const aircrafts = [
  "Boeing 787",
  "Boeing 737",
  "Airbus A320"
]

export const airLineArray = [
  'IndiGo',
    'Air India',
    'SpiceJet',
    'Vistara',
    'GoAir',
    'AirAsia',
]