document.addEventListener('DOMContentLoaded', function() { 
  // Riferimenti agli elementi DOM per P.IVA
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const resultDiv = document.getElementById('result');
  
  // Riferimenti agli elementi DOM per IBAN
  const bankSelect = document.getElementById('bank-select');
  const manualAbiInput = document.getElementById('manual-abi');
  const manualCabInput = document.getElementById('manual-cab');
  const accountNumber = document.getElementById('account-number');
  const generateIbanBtn = document.getElementById('generate-iban');
  const copyIbanBtn = document.getElementById('copy-iban');
  const ibanResultDiv = document.getElementById('iban-result');
  const bankInfo = document.getElementById('bank-info');
  
  // Riferimenti agli elementi DOM per Codice Fiscale
  const calcolaBtn = document.getElementById('calcola');
  const generaCasualeBtn = document.getElementById('generaCasuale');
  const cognomeInput = document.getElementById('cognome');
  const nomeInput = document.getElementById('nome');
  const dataNascitaInput = document.getElementById('dataNascita');
  const sessoSelect = document.getElementById('sesso');
  const codiceCatastaleInput = document.getElementById('codiceCatastale');
  const codiceFiscaleResult = document.getElementById('cf-codiceFiscale');
  const randomInfoDiv = document.getElementById('cf-randomInfo');
  const cfCopyBtn = document.getElementById('cf-copy');
  
  // Riferimenti per gli accordion
  const accordions = document.querySelectorAll('.accordion');
  const panels = document.querySelectorAll('.panel');
  
  // Lista di codici ufficio validi per P.IVA
  const codiciUfficio = [
    "001", "002", "003", "004", "005", "006", "007", "008", "009", "010",
    "011", "012", "013", "014", "015", "016", "017", "018", "019", "020",
    "021", "022", "023", "024", "025", "026", "027", "028", "029", "030",
    "031", "032", "033", "034", "035", "036", "037", "038", "039", "040",
    "041", "042", "043", "044", "045", "046", "047", "048", "049", "050",
    "051", "052", "053", "054", "055", "056", "057", "058", "059", "060",
    "061", "062", "063", "064", "065", "066", "067", "068", "069", "070",
    "071", "072", "073", "074", "075", "076", "077", "078", "079", "080",
    "081", "082", "083", "084", "085", "086", "087", "088", "089", "090",
    "091", "092", "093", "094", "095", "096", "097", "098", "099", "100",
    "101", "102", "103"
  ];
  
  // Mapping delle banche ai loro nomi per IBAN
  const bankNames = {
    "08425|02804": "CAMBIANO",
    "06175|01020": "CARIGE",
    "03084|01600": "PONTI",
    "06915|13700": "LUCCA",
    "03138|12300": "REALE",
    "05696|01623": "SONDRIO",
    "08133|58170": "MERANO",
    "03104|03200": "Deutsche BANK",
    "01030|12150": "MPS",
    "03441|21902": "Tuscia",
    "08562|13700": "Pisa & Fornacette",
    "05484|12000": "CIVIDALE",
    "05387|14000": "BPER",
    "01015|04815": "Banco Sardegna",
    "05772|04613": "Banca Sant'Angelo",
    "06150|03200": "CARIFERMO",
    "03015|03200": "FINECO",
    "03589|01600": "ALLIANZ",
    "03062|34210": "MEDIOLANUM",
    "05424|04004": "BARI",
    "03365|12100": "CHERRYBANK"
  };
  
  // Dati per il Codice Fiscale
  const nomiMaschili = [
    'MARIO', 'GIUSEPPE', 'ANTONIO', 'GIOVANNI', 'FRANCESCO', 
    'LUIGI', 'ROBERTO', 'ANGELO', 'VINCENZO', 'PIETRO', 
    'SALVATORE', 'CARLO', 'FRANCO', 'DOMENICO', 'BRUNO', 
    'PAOLO', 'MICHELE', 'GIORGIO', 'MARCO', 'ALBERTO'
  ];
  const nomiFemminili = [
    'MARIA', 'ANNA', 'GIUSEPPINA', 'ROSA', 'ANGELA', 
    'GIOVANNA', 'TERESA', 'LUCIA', 'CARMELA', 'CATERINA', 
    'FRANCESCA', 'ANTONIETTA', 'CARLA', 'ELENA', 'MARGHERITA', 
    'FRANCA', 'PAOLA', 'RITA', 'GABRIELLA', 'PATRIZIA'
  ];
  const cognomiComuni = [
    'ROSSI', 'RUSSO', 'FERRARI', 'ESPOSITO', 'BIANCHI', 
    'ROMANO', 'COLOMBO', 'RICCI', 'MARINO', 'GRECO'
  ];
  const CODICE_CATASTALE_ROMA = 'H501';
  
  // Inizializza gli accordion
  accordions.forEach((accordion, index) => {
    accordion.addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = panels[index];
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  if (accordions.length > 0) {
    accordions[0].click();
  }
  
  // ===== FUNZIONALITÀ P.IVA =====
  if (generateBtn) {
    generateBtn.addEventListener('click', function() {
      const codiceUfficioRandom = getRandomUfficio();
      const piva = generateRandomPIVA(codiceUfficioRandom);
      resultDiv.textContent = piva;
      panels[0].style.maxHeight = panels[0].scrollHeight + 'px';
    });
  }
  function getRandomUfficio() {
    const randomIndex = Math.floor(Math.random() * codiciUfficio.length);
    return codiciUfficio[randomIndex];
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const piva = resultDiv.textContent;
      copyToClipboard(piva, copyBtn, 'Copia negli appunti');
    });
  }
  function getRandomDigit() {
    return Math.floor(Math.random() * 10);
  }
  function generateRandomPIVA(codiceUfficio) {
    let randomDigits = Array(7).fill(0).map(() => getRandomDigit());
    let ufficioDigits = codiceUfficio.split('').map(Number);
    let baseDigits = [...randomDigits, ...ufficioDigits];
    let sum = 0;
    for (let i = 0; i < baseDigits.length; i += 2) {
      sum += baseDigits[i];
    }
    for (let i = 1; i < baseDigits.length; i += 2) {
      const doubled = baseDigits[i] * 2;
      sum += doubled > 9 ? Math.floor(doubled / 10) + (doubled % 10) : doubled;
    }
    const lastDigit = sum % 10;
    const controlCode = lastDigit === 0 ? 0 : 10 - lastDigit;
    return randomDigits.join('') + codiceUfficio + controlCode;
  }
  
  // ===== FUNZIONALITÀ IBAN =====
  if (accountNumber) {
    let randomDigits = '';
    for (let i = 0; i < 4; i++) {
      randomDigits += (Math.floor(Math.random() * 9) + 1).toString();
    }
    accountNumber.value = '00000000' + randomDigits;
    accountNumber.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }
  
  // --- Nuove funzioni per il calcolo IBAN corretto ---
  function calculateCIN_BBAN(bbanWithoutCIN) {
    const oddMap = [
      1, 0, 5, 7, 9, 13, 15, 17, 19, 21,
      2, 4, 18, 20, 11, 3, 6, 8, 12, 14,
      16, 10, 22, 25, 24, 23
    ];
    let sum = 0;
    for (let i = 0; i < bbanWithoutCIN.length; i++) {
      let ch = bbanWithoutCIN[i];
      let n;
      if (/[0-9]/.test(ch)) {
        n = parseInt(ch, 10);
      } else if (/[A-Z]/.test(ch)) {
        n = ch.charCodeAt(0) - 65;
      } else {
        throw new Error("Carattere non valido nel BBAN: " + ch);
      }
      if (i % 2 === 0) {
        sum += oddMap[n];
      } else {
        sum += n;
      }
    }
    const remainder = sum % 26;
    return String.fromCharCode(65 + remainder);
  }
  
  function calculateInternationalCheckDigits(bban) {
    const countryCode = "IT";
    const checkString = bban + countryCode + "00";
    const numericString = checkString.split('').map(ch => {
      if (/[A-Z]/.test(ch)) {
        return (ch.charCodeAt(0) - 55).toString();
      }
      return ch;
    }).join('');
    const remainder = BigInt(numericString) % 97n;
    const checkDigits = (98n - remainder).toString().padStart(2, '0');
    return checkDigits;
  }
  
  function calculateItalianIBAN(abi, cab, account) {
    account = account.padStart(12, '0');
    const bbanWithoutCIN = abi + cab + account;
    const cin = calculateCIN_BBAN(bbanWithoutCIN);
    const bban = cin + bbanWithoutCIN;
    const internationalCheck = calculateInternationalCheckDigits(bban);
    return "IT" + internationalCheck + bban;
  }
  
  if (generateIbanBtn) {
    generateIbanBtn.addEventListener('click', function() {
      if (!accountNumber.value) {
        alert('Inserisci un numero di conto');
        return;
      }
      
      let abi, cab, selectedBankName;
      // Se i campi manuali sono compilati, li usiamo
      if (manualAbiInput.value.trim() !== "" || manualCabInput.value.trim() !== "") {
        if (manualAbiInput.value.trim() === "" || manualCabInput.value.trim() === "") {
          alert("Inserisci sia ABI che CAB manualmente oppure lasciali vuoti");
          return;
        }
        if (manualAbiInput.value.trim().length !== 5 || manualCabInput.value.trim().length !== 5) {
          alert("ABI e CAB devono essere di 5 cifre ciascuno");
          return;
        }
        abi = manualAbiInput.value.trim();
        cab = manualCabInput.value.trim();
        selectedBankName = "Banca personalizzata";
      } else {
        if (!bankSelect.value) {
          alert('Seleziona una banca');
          return;
        }
        [abi, cab] = bankSelect.value.split('|');
        selectedBankName = bankNames[bankSelect.value] || "Banca sconosciuta";
      }
      
      const account = accountNumber.value;
      const iban = calculateItalianIBAN(abi, cab, account);
      ibanResultDiv.textContent = iban;
      bankInfo.textContent = `Banca: ${selectedBankName}, ABI: ${abi}, CAB: ${cab}`;
      panels[1].style.maxHeight = panels[1].scrollHeight + 'px';
    });
  }
  if (copyIbanBtn) {
    copyIbanBtn.addEventListener('click', function() {
      const iban = ibanResultDiv.textContent;
      copyToClipboard(iban, copyIbanBtn, 'Copia negli appunti');
    });
  }
  
  // ===== FUNZIONALITÀ CODICE FISCALE =====
  if (calcolaBtn) {
    calcolaBtn.addEventListener('click', calcolaCodiceFiscale);
  }
  if (generaCasualeBtn) {
    generaCasualeBtn.addEventListener('click', generaCodiceFiscaleCasuale);
  }
  if (cfCopyBtn) {
    cfCopyBtn.addEventListener('click', function() {
      const cf = codiceFiscaleResult.textContent;
      copyToClipboard(cf, cfCopyBtn, 'Copia negli appunti');
    });
  }
  function calcolaCodiceFiscale() {
    const cognome = cognomeInput.value.toUpperCase();
    const nome = nomeInput.value.toUpperCase();
    const dataNascita = dataNascitaInput.value;
    const sesso = sessoSelect.value;
    const codiceCatastale = codiceCatastaleInput.value.toUpperCase();
    if (!cognome || !nome || !dataNascita || !codiceCatastale) {
      alert('Per favore, completa tutti i campi richiesti');
      return;
    }
    const codiceFiscale = calcolaCodiceFiscaleCompleto(cognome, nome, dataNascita, sesso, codiceCatastale);
    codiceFiscaleResult.textContent = codiceFiscale;
    randomInfoDiv.textContent = '';
    if (panels.length > 2) {
      panels[2].style.maxHeight = panels[2].scrollHeight + 'px';
    }
  }
  function generaCodiceFiscaleCasuale() {
    const sesso = Math.random() > 0.5 ? 'M' : 'F';
    const nomi = sesso === 'M' ? nomiMaschili : nomiFemminili;
    const nome = nomi[Math.floor(Math.random() * nomi.length)];
    const cognome = cognomiComuni[Math.floor(Math.random() * cognomiComuni.length)];
    const dataNascita = '1980-01-01';
    const codiceFiscale = calcolaCodiceFiscaleCompleto(cognome, nome, dataNascita, sesso, CODICE_CATASTALE_ROMA);
    codiceFiscaleResult.textContent = codiceFiscale;
    randomInfoDiv.textContent = `Generato per: ${nome} ${cognome}, ${sesso === 'M' ? 'M' : 'F'}, nato/a a Roma il 01/01/1980`;
    nomeInput.value = nome;
    cognomeInput.value = cognome;
    dataNascitaInput.value = dataNascita;
    sessoSelect.value = sesso;
    codiceCatastaleInput.value = CODICE_CATASTALE_ROMA;
    if (panels.length > 2) {
      panels[2].style.maxHeight = panels[2].scrollHeight + 'px';
    }
  }
  function calcolaCodiceFiscaleCompleto(cognome, nome, dataNascita, sesso, codiceCatastale) {
    const codiceCognome = calcolaCodiceCognomeNome(cognome, true);
    const codiceNome = calcolaCodiceCognomeNome(nome, false);
    const anno = dataNascita.split('-')[0];
    const codiceAnno = anno.substring(2);
    const mese = parseInt(dataNascita.split('-')[1]);
    const codiceMese = getCodiceMese(mese);
    let giorno = parseInt(dataNascita.split('-')[2]);
    if (sesso === 'F') {
      giorno += 40;
    }
    const codiceGiorno = giorno.toString().padStart(2, '0');
    const codiceComune = codiceCatastale;
    const codiceParziale = codiceCognome + codiceNome + codiceAnno + codiceMese + codiceGiorno + codiceComune;
    const carattereControllo = calcolaCarattereControllo(codiceParziale);
    return codiceParziale + carattereControllo;
  }
  function calcolaCodiceCognomeNome(testo, isCognome) {
    testo = testo.replace(/[^A-Z]/g, '');
    const consonanti = testo.replace(/[AEIOU]/g, '');
    const vocali = testo.replace(/[^AEIOU]/g, '');
    let codice = '';
    if (!isCognome && consonanti.length >= 4) {
      codice = consonanti[0] + consonanti[2] + consonanti[3];
    } else {
      codice += consonanti;
      codice += vocali;
      codice = codice.substring(0, 3);
    }
    while (codice.length < 3) {
      codice += 'X';
    }
    return codice;
  }
  function getCodiceMese(mese) {
    const codiciMesi = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
    return codiciMesi[mese - 1];
  }
  function calcolaCarattereControllo(codiceParziale) {
    const valoriPari = {
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
      'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
      'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };
    const valoriDispari = {
      '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
      'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
      'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
      'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    };
    const caratteriControllo = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let somma = 0;
    for (let i = 0; i < codiceParziale.length; i += 2) {
      somma += valoriDispari[codiceParziale[i]];
    }
    for (let i = 1; i < codiceParziale.length; i += 2) {
      somma += valoriPari[codiceParziale[i]];
    }
    return caratteriControllo[somma % 26];
  }
  function copyToClipboard(text, button, originalText) {
    if (text && text !== '-') {
      navigator.clipboard.writeText(text)
        .then(() => {
          button.textContent = 'Copiato!';
          setTimeout(() => {
            button.textContent = originalText;
          }, 1500);
        })
        .catch(err => {
          console.error('Errore durante la copia: ', err);
        });
    }
  }
  
  // Genera una P.IVA all'avvio
  if (generateBtn) {
    generateBtn.click();
  }
});
