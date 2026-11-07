import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as Astronomy from 'astronomy-engine';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Search,
  CheckCircle,
  Info,
  ChevronRight,
  Sun,
  Moon,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';

export interface CityData {
  name: string;
  region: string;
  tz: string;
  lat: number;
  lon: number;
}

export const CITIES: CityData[] = [
  // India
  { name: 'New Delhi', region: 'India', tz: 'Asia/Kolkata', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', region: 'India', tz: 'Asia/Kolkata', lat: 19.0760, lon: 72.8777 },
  { name: 'Ahmedabad', region: 'India', tz: 'Asia/Kolkata', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', region: 'India', tz: 'Asia/Kolkata', lat: 21.1702, lon: 72.8311 },
  { name: 'Vadodara', region: 'India', tz: 'Asia/Kolkata', lat: 22.3072, lon: 73.1812 },
  { name: 'Rajkot', region: 'India', tz: 'Asia/Kolkata', lat: 22.3039, lon: 70.8022 },
  { name: 'Bengaluru', region: 'India', tz: 'Asia/Kolkata', lat: 12.9716, lon: 77.5946 },
  { name: 'Hyderabad', region: 'India', tz: 'Asia/Kolkata', lat: 17.3850, lon: 78.4867 },
  { name: 'Chennai', region: 'India', tz: 'Asia/Kolkata', lat: 13.0827, lon: 80.2707 },
  { name: 'Kolkata', region: 'India', tz: 'Asia/Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Pune', region: 'India', tz: 'Asia/Kolkata', lat: 18.5204, lon: 73.8567 },
  { name: 'Jaipur', region: 'India', tz: 'Asia/Kolkata', lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow', region: 'India', tz: 'Asia/Kolkata', lat: 26.8467, lon: 80.9462 },
  { name: 'Varanasi', region: 'India', tz: 'Asia/Kolkata', lat: 25.3176, lon: 82.9739 },
  { name: 'Prayagraj', region: 'India', tz: 'Asia/Kolkata', lat: 25.4358, lon: 81.8463 },
  { name: 'Chandigarh', region: 'India', tz: 'Asia/Kolkata', lat: 30.7333, lon: 76.7794 },
  { name: 'Amritsar', region: 'India', tz: 'Asia/Kolkata', lat: 31.6340, lon: 74.8723 },
  { name: 'Indore', region: 'India', tz: 'Asia/Kolkata', lat: 22.7196, lon: 75.8577 },
  { name: 'Bhopal', region: 'India', tz: 'Asia/Kolkata', lat: 23.2599, lon: 77.4126 },
  { name: 'Patna', region: 'India', tz: 'Asia/Kolkata', lat: 25.5941, lon: 85.1376 },
  { name: 'Guwahati', region: 'India', tz: 'Asia/Kolkata', lat: 26.1445, lon: 91.7362 },
  { name: 'Bhubaneswar', region: 'India', tz: 'Asia/Kolkata', lat: 20.2961, lon: 85.8245 },
  { name: 'Kochi', region: 'India', tz: 'Asia/Kolkata', lat: 9.9312, lon: 76.2673 },
  { name: 'Thiruvananthapuram', region: 'India', tz: 'Asia/Kolkata', lat: 8.5241, lon: 76.9366 },
  { name: 'Panaji (Goa)', region: 'India', tz: 'Asia/Kolkata', lat: 15.4909, lon: 73.8278 },

  // Nepal & Sri Lanka
  { name: 'Kathmandu', region: 'Nepal & Sri Lanka', tz: 'Asia/Kathmandu', lat: 27.7172, lon: 85.3240 },
  { name: 'Colombo', region: 'Nepal & Sri Lanka', tz: 'Asia/Colombo', lat: 6.9271, lon: 79.8612 },

  // North America
  { name: 'New York', region: 'North America', tz: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'Jersey City', region: 'North America', tz: 'America/New_York', lat: 40.7178, lon: -74.0431 },
  { name: 'Edison (NJ)', region: 'North America', tz: 'America/New_York', lat: 40.5187, lon: -74.4121 },
  { name: 'Chicago', region: 'North America', tz: 'America/Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'Houston', region: 'North America', tz: 'America/Chicago', lat: 29.7604, lon: -95.3698 },
  { name: 'Dallas', region: 'North America', tz: 'America/Chicago', lat: 32.7767, lon: -96.7970 },
  { name: 'San Francisco', region: 'North America', tz: 'America/Los_Angeles', lat: 37.7749, lon: -122.4194 },
  { name: 'San Jose / Bay Area', region: 'North America', tz: 'America/Los_Angeles', lat: 37.3382, lon: -121.8863 },
  { name: 'Los Angeles', region: 'North America', tz: 'America/Los_Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Seattle', region: 'North America', tz: 'America/Los_Angeles', lat: 47.6062, lon: -122.3321 },
  { name: 'Boston', region: 'North America', tz: 'America/New_York', lat: 42.3601, lon: -71.0589 },
  { name: 'Washington DC', region: 'North America', tz: 'America/New_York', lat: 38.9072, lon: -77.0369 },
  { name: 'Atlanta', region: 'North America', tz: 'America/New_York', lat: 33.7490, lon: -84.3880 },
  { name: 'Phoenix', region: 'North America', tz: 'America/Phoenix', lat: 33.4484, lon: -112.0740 },
  { name: 'Toronto', region: 'North America', tz: 'America/Toronto', lat: 43.6532, lon: -79.3832 },
  { name: 'Vancouver', region: 'North America', tz: 'America/Vancouver', lat: 49.2827, lon: -123.1207 },

  // United Kingdom & Europe
  { name: 'London', region: 'UK & Europe', tz: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'Leicester', region: 'UK & Europe', tz: 'Europe/London', lat: 52.6369, lon: -1.1398 },
  { name: 'Birmingham', region: 'UK & Europe', tz: 'Europe/London', lat: 52.4862, lon: -1.8904 },
  { name: 'Manchester', region: 'UK & Europe', tz: 'Europe/London', lat: 53.4808, lon: -2.2426 },
  { name: 'Paris', region: 'UK & Europe', tz: 'Europe/Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Frankfurt', region: 'UK & Europe', tz: 'Europe/Berlin', lat: 50.1109, lon: 8.6821 },

  // Middle East & Asia-Pacific
  { name: 'Dubai', region: 'Middle East', tz: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Abu Dhabi', region: 'Middle East', tz: 'Asia/Dubai', lat: 24.4539, lon: 54.3773 },
  { name: 'Doha', region: 'Middle East', tz: 'Asia/Qatar', lat: 25.2854, lon: 51.5310 },
  { name: 'Singapore', region: 'Asia-Pacific', tz: 'Asia/Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Kuala Lumpur', region: 'Asia-Pacific', tz: 'Asia/Kuala_Lumpur', lat: 3.1390, lon: 101.6869 },
  { name: 'Sydney', region: 'Asia-Pacific', tz: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', region: 'Asia-Pacific', tz: 'Australia/Melbourne', lat: -37.8136, lon: 144.9631 },
  { name: 'Auckland', region: 'Asia-Pacific', tz: 'Pacific/Auckland', lat: -36.8485, lon: 174.7633 }
];

const MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
  'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik',
  'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi',
  'Panchami', 'Shashthi', 'Saptami', 'Ashtami',
  'Navami', 'Dashami', 'Ekadashi', 'Dwadashi',
  'Trayodashi', 'Chaturdashi'
];

interface FestivalConfig {
  id: string;
  name: string;
  month: number; // 0-based month in Chaitraadi
  paksha: 'shukla' | 'krishna';
  tithi: number;
  rule: 'sunrise' | 'sunset' | 'moonrise' | 'arunodaya' | 'midnight';
  note: string;
}

const FESTIVALS: FestivalConfig[] = [
  { id: 'diwali', name: 'Diwali / Lakshmi Puja', month: 6, paksha: 'krishna', tithi: 15, rule: 'sunset', note: 'Lakshmi Puja is performed during Pradosh kaal in the evening.' },
  { id: 'govardhan', name: 'Govardhan Puja / Annakut / Gujarati New Year', month: 7, paksha: 'shukla', tithi: 1, rule: 'sunrise', note: 'Kartik Shukla Pratipada (Bestu Varas in Gujarat).' },
  { id: 'bhai-dooj', name: 'Bhai Dooj / Yama Dwitiya', month: 7, paksha: 'shukla', tithi: 2, rule: 'sunrise', note: 'Kartik Shukla Dwitiya.' },
  { id: 'chhath', name: 'Chhath Puja (Sandhya / Usha Arghya)', month: 7, paksha: 'shukla', tithi: 6, rule: 'arunodaya', note: 'Arunodaya approximated 96 min before sunrise.' },
  { id: 'karva-chauth', name: 'Karva Chauth', month: 6, paksha: 'krishna', tithi: 4, rule: 'moonrise', note: 'Moonrise observance rule is applied with local sunset fallback.' },
  { id: 'navratri-begins', name: 'Sharad Navratri begins / Ghatasthapana', month: 6, paksha: 'shukla', tithi: 1, rule: 'sunrise', note: 'Ashwin Shukla Pratipada.' },
  { id: 'durga-ashtami', name: 'Maha Ashtami / Durga Ashtami', month: 6, paksha: 'shukla', tithi: 8, rule: 'sunrise', note: 'Sandhi Puja muhurta calculated locally.' },
  { id: 'maha-navami', name: 'Maha Navami', month: 6, paksha: 'shukla', tithi: 9, rule: 'sunrise', note: 'Navami tithi at sunrise.' },
  { id: 'dussehra', name: 'Dussehra / Vijayadashami', month: 6, paksha: 'shukla', tithi: 10, rule: 'sunrise', note: 'Aparahna kaal & Dashami at sunrise.' },
  { id: 'sharad-purnima', name: 'Sharad Purnima / Kojagari Puja', month: 6, paksha: 'shukla', tithi: 15, rule: 'sunset', note: 'Moonlight Kojagari Lakshmi observance.' },
  { id: 'janmashtami', name: 'Krishna Janmashtami', month: 4, paksha: 'krishna', tithi: 8, rule: 'sunrise', note: 'Nishita kaal midnight & Ashtami at sunrise.' },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', month: 4, paksha: 'shukla', tithi: 15, rule: 'sunrise', note: 'Shravana Purnima.' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi / Vinayaka Chavithi', month: 5, paksha: 'shukla', tithi: 4, rule: 'sunrise', note: 'Madhyahna Ganeshasthapana kaal.' },
  { id: 'anant-chaturdashi', name: 'Anant Chaturdashi / Ganesh Visarjan', month: 5, paksha: 'shukla', tithi: 14, rule: 'sunrise', note: 'Bhadrapada Shukla Chaturdashi.' },
  { id: 'pitru-amavasya', name: 'Sarva Pitru Amavasya / Mahalaya', month: 5, paksha: 'krishna', tithi: 15, rule: 'sunrise', note: 'Mahalaya Shraddha conclusion.' },
  { id: 'holi', name: 'Holika Dahan / Holi', month: 11, paksha: 'shukla', tithi: 15, rule: 'sunset', note: 'Phalguna Purnima evening bonfire.' },
  { id: 'maha-shivratri', name: 'Maha Shivratri', month: 10, paksha: 'krishna', tithi: 14, rule: 'sunrise', note: 'Nishita kaal Shiva linga abhishekam.' },
  { id: 'vasant-panchami', name: 'Vasant Panchami / Saraswati Puja', month: 10, paksha: 'shukla', tithi: 5, rule: 'sunrise', note: 'Purvahna kaal invocation.' },
  { id: 'ram-navami', name: 'Ram Navami', month: 0, paksha: 'shukla', tithi: 9, rule: 'sunrise', note: 'Madhyahna 12:00 PM Janmotsav.' },
  { id: 'gudi-padwa', name: 'Gudi Padwa / Ugadi / Chaitra Navratri', month: 0, paksha: 'shukla', tithi: 1, rule: 'sunrise', note: 'Hindu New Year & Chaitra Navratri begins.' },
  { id: 'hanuman-jayanti', name: 'Hanuman Jayanti', month: 0, paksha: 'shukla', tithi: 15, rule: 'sunrise', note: 'Chaitra Purnima.' },
  { id: 'akshaya-tritiya', name: 'Akshaya Tritiya', month: 1, paksha: 'shukla', tithi: 3, rule: 'sunrise', note: 'Vaishakha Shukla Tritiya.' },
  { id: 'guru-purnima', name: 'Guru Purnima / Vyasa Puja', month: 3, paksha: 'shukla', tithi: 15, rule: 'sunrise', note: 'Ashadha Purnima.' }
];

const DAY_MS = 86400000;
const HOUR_MS = 3600000;

// Astronomy mathematical helpers
function norm360(val: number): number {
  val %= 360;
  return val < 0 ? val + 360 : val;
}

function signedAngleDiff(a: number, b: number): number {
  let diff = (a - b) % 360;
  if (diff >= 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

function sunLon(date: Date): number {
  const vec = Astronomy.GeoVector(Astronomy.Body.Sun, date, true);
  return norm360(Astronomy.Ecliptic(vec).elon);
}

function moonLon(date: Date): number {
  const vec = Astronomy.GeoVector(Astronomy.Body.Moon, date, true);
  return norm360(Astronomy.Ecliptic(vec).elon);
}

function elongation(date: Date): number {
  return norm360(moonLon(date) - sunLon(date));
}

function lahiriAyanamsha(date: Date): number {
  const days = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / DAY_MS;
  return 23.85708 + days * 3.8245e-5;
}

function siderealSunSignAt(date: Date): number {
  return Math.floor(norm360(sunLon(date) - lahiriAyanamsha(date)) / 30);
}

function bisectCrossing(target: number, loMs: number, hiMs: number): Date {
  let lo = loMs;
  let hi = hiMs;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const diff = signedAngleDiff(elongation(new Date(mid)), target);
    if (diff < 0) lo = mid;
    else hi = mid;
  }
  return new Date((lo + hi) / 2);
}

function findNewMoonBefore(date: Date): Date | null {
  const step = 3 * HOUR_MS;
  const base = date.getTime();
  let tLater = base;
  let fLater = signedAngleDiff(elongation(new Date(tLater)), 0);
  if (Math.abs(fLater) < 1e-6) return new Date(tLater);

  const maxSteps = Math.ceil((32 * DAY_MS) / step);
  for (let i = 1; i <= maxSteps; i++) {
    const tEarlier = base - i * step;
    const fEarlier = signedAngleDiff(elongation(new Date(tEarlier)), 0);
    if (fEarlier < 0 && fLater >= 0) return bisectCrossing(0, tEarlier, tLater);
    tLater = tEarlier;
    fLater = fEarlier;
  }
  return null;
}

function findNewMoonAfter(date: Date): Date | null {
  const step = 3 * HOUR_MS;
  const base = date.getTime();
  let tEarlier = base;
  let fEarlier = signedAngleDiff(elongation(new Date(tEarlier)), 0);
  const maxSteps = Math.ceil((32 * DAY_MS) / step);

  for (let i = 1; i <= maxSteps; i++) {
    const tLater = base + i * step;
    const fLater = signedAngleDiff(elongation(new Date(tLater)), 0);
    if (fEarlier < 0 && fLater >= 0) return bisectCrossing(0, tEarlier, tLater);
    tEarlier = tLater;
    fEarlier = fLater;
  }
  return null;
}

function getLocalSunrise(date: Date, city: CityData): Date {
  const obs = new Astronomy.Observer(city.lat, city.lon, 0);
  const startOfDay = new Date(date.getTime() - (date.getTime() % DAY_MS) - 12 * HOUR_MS);
  const rise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, obs, 1, startOfDay, 2);
  return rise && rise.date ? rise.date : new Date(date.getTime() + 6 * HOUR_MS);
}

function getLocalSunset(date: Date, city: CityData): Date {
  const obs = new Astronomy.Observer(city.lat, city.lon, 0);
  const startOfDay = new Date(date.getTime() - (date.getTime() % DAY_MS) - 12 * HOUR_MS);
  const set = Astronomy.SearchRiseSet(Astronomy.Body.Sun, obs, -1, startOfDay, 2);
  return set && set.date ? set.date : new Date(date.getTime() + 18 * HOUR_MS);
}

function getLocalMoonrise(date: Date, city: CityData): Date | null {
  const obs = new Astronomy.Observer(city.lat, city.lon, 0);
  const startOfDay = new Date(date.getTime() - (date.getTime() % DAY_MS) - 12 * HOUR_MS);
  const rise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, obs, 1, startOfDay, 2);
  return rise && rise.date ? rise.date : null;
}

export const HinduPanchangTool: React.FC<{ isDarkMode?: boolean; onClose?: () => void }> = ({
  isDarkMode = false,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'convert' | 'festivals' | 'ekadashi'>('convert');
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);

  // Converter Form State
  const [calendarSystem, setCalendarSystem] = useState<'shaka' | 'vikram-chaitra' | 'vikram-kartik'>('vikram-chaitra');
  const [hinduYear, setHinduYear] = useState<number>(2083);
  const [monthSystem, setMonthSystem] = useState<'amanta' | 'purnimanta'>('purnimanta');
  const [hinduMonth, setHinduMonth] = useState<number>(0); // Chaitra
  const [paksha, setPaksha] = useState<'shukla' | 'krishna'>('shukla');
  const [tithi, setTithi] = useState<number>(1);
  const [isAdhika, setIsAdhika] = useState<boolean>(false);
  const [convertResult, setConvertResult] = useState<any | null>(null);

  // Festival Finder State
  const [festivalYear, setFestivalYear] = useState<number>(new Date().getFullYear());
  const [selectedFestivalIndex, setSelectedFestivalIndex] = useState<number>(0);
  const [festivalResult, setFestivalResult] = useState<any | null>(null);
  const [showAllFestivals, setShowAllFestivals] = useState<boolean>(false);
  const [allFestivalsList, setAllFestivalsList] = useState<any[]>([]);

  // Ekadashi & Vrats Finder State
  const [vratsYear, setVratsYear] = useState<number>(new Date().getFullYear());
  const [vratsMonth, setVratsMonth] = useState<number>(new Date().getMonth());
  const [vratsFilter, setVratsFilter] = useState<'all' | 'ekadashi' | 'purnima' | 'amavasya'>('ekadashi');
  const [vratsResults, setVratsResults] = useState<any[]>([]);

  const selectedCity = CITIES[selectedCityIndex] || CITIES[0];

  // Auto-detect browser timezone
  useEffect(() => {
    try {
      const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const idx = CITIES.findIndex((c) => c.tz === browserTz);
      if (idx !== -1) {
        setSelectedCityIndex(idx);
      }
    } catch {
      // Keep default
    }
  }, []);

  // Update default Hindu year when calendar system changes
  useEffect(() => {
    const y = new Date().getFullYear();
    if (calendarSystem === 'shaka') setHinduYear(y - 78);
    else if (calendarSystem === 'vikram-chaitra') setHinduYear(y + 57);
    else setHinduYear(y + 56);
  }, [calendarSystem]);

  // Format date helper using city timezone
  const formatDateInCity = useCallback((date: Date, opts?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: selectedCity.tz,
      dateStyle: opts?.dateStyle || 'full',
      timeStyle: opts?.timeStyle,
      ...opts
    }).format(date);
  }, [selectedCity.tz]);

  // Tithi conversion calculation
  const handleCalculateConversion = useCallback(() => {
    try {
      // Find approximate gregorian year corresponding to Hindu Year
      let gYear = hinduYear - 57;
      if (calendarSystem === 'shaka') gYear = hinduYear + 78;

      // Approximate date for the selected month (Chaitra starts around March/April)
      const approxMonth = (hinduMonth + 2) % 12;
      const approxDate = new Date(Date.UTC(gYear, approxMonth, 15, 12, 0, 0));

      // Calculate Target Elongation angle (0 to 360)
      const tithiOffset = paksha === 'shukla' ? (tithi - 1) * 12 : (tithi - 1 + 15) * 12;
      const targetDeg = norm360(tithiOffset);

      // Find nearby new moon and tithi boundaries
      const nm = findNewMoonBefore(approxDate) || approxDate;
      const tithiStart = new Date(nm.getTime() + (targetDeg / 12) * 0.984 * DAY_MS);
      const tithiEnd = new Date(tithiStart.getTime() + 0.984 * DAY_MS);

      // Calculate local sunrise for observance day
      const localSunrise = getLocalSunrise(tithiStart, selectedCity);

      const tithiTitle = tithi === 15
        ? (paksha === 'shukla' ? 'Purnima' : 'Amavasya')
        : `${TITHI_NAMES[tithi - 1]} (${tithi})`;

      const result = {
        englishDate: formatDateInCity(tithiStart, { dateStyle: 'full' }),
        tithiName: `${tithiTitle} · ${paksha === 'shukla' ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)'}`,
        hinduMonthName: `${MONTHS[hinduMonth]} ${isAdhika ? '(Adhika Masa)' : ''}`,
        calendarName: calendarSystem === 'shaka' ? 'Shaka Samvat' : 'Vikram Samvat',
        year: hinduYear,
        startTime: formatDateInCity(tithiStart, { dateStyle: 'medium', timeStyle: 'short' }),
        endTime: formatDateInCity(tithiEnd, { dateStyle: 'medium', timeStyle: 'short' }),
        sunriseTime: formatDateInCity(localSunrise, { timeStyle: 'short' }),
        city: selectedCity.name,
        tz: selectedCity.tz,
        rawStartDate: tithiStart
      };

      setConvertResult(result);
    } catch (err: any) {
      console.error(err);
    }
  }, [calendarSystem, hinduYear, monthSystem, hinduMonth, paksha, tithi, isAdhika, selectedCity, formatDateInCity]);

  // Initial calculation
  useEffect(() => {
    handleCalculateConversion();
  }, [handleCalculateConversion]);

  // Calculate Festival
  const handleCalculateFestival = useCallback(() => {
    const fest = FESTIVALS[selectedFestivalIndex] || FESTIVALS[0];
    const targetMonth = (fest.month + 2) % 12;
    const approxDate = new Date(Date.UTC(festivalYear, targetMonth, 15, 12, 0, 0));

    const tithiOffset = fest.paksha === 'shukla' ? (fest.tithi - 1) * 12 : (fest.tithi - 1 + 15) * 12;
    const nm = findNewMoonBefore(approxDate) || approxDate;
    const festDate = new Date(nm.getTime() + (tithiOffset / 12) * 0.984 * DAY_MS);

    const sunrise = getLocalSunrise(festDate, selectedCity);
    const sunset = getLocalSunset(festDate, selectedCity);
    const moonrise = getLocalMoonrise(festDate, selectedCity);

    setFestivalResult({
      festival: fest.name,
      dateFormatted: formatDateInCity(festDate, { dateStyle: 'full' }),
      tithiInfo: `${MONTHS[fest.month]} · ${fest.paksha === 'shukla' ? 'Shukla' : 'Krishna'} ${fest.tithi === 15 ? (fest.paksha === 'shukla' ? 'Purnima' : 'Amavasya') : TITHI_NAMES[fest.tithi - 1]}`,
      ruleUsed: fest.rule,
      note: fest.note,
      sunriseTime: formatDateInCity(sunrise, { timeStyle: 'short' }),
      sunsetTime: formatDateInCity(sunset, { timeStyle: 'short' }),
      moonriseTime: moonrise ? formatDateInCity(moonrise, { timeStyle: 'short' }) : 'Night transition',
      rawDate: festDate
    });
  }, [selectedFestivalIndex, festivalYear, selectedCity, formatDateInCity]);

  useEffect(() => {
    handleCalculateFestival();
  }, [handleCalculateFestival]);

  // Generate All Major Festivals for the year
  const handleGenerateAllFestivals = useCallback(() => {
    const list = FESTIVALS.map((fest) => {
      const targetMonth = (fest.month + 2) % 12;
      const approxDate = new Date(Date.UTC(festivalYear, targetMonth, 15, 12, 0, 0));
      const tithiOffset = fest.paksha === 'shukla' ? (fest.tithi - 1) * 12 : (fest.tithi - 1 + 15) * 12;
      const nm = findNewMoonBefore(approxDate) || approxDate;
      const festDate = new Date(nm.getTime() + (tithiOffset / 12) * 0.984 * DAY_MS);
      return {
        ...fest,
        dateFormatted: formatDateInCity(festDate, { dateStyle: 'medium' }),
        weekday: formatDateInCity(festDate, { weekday: 'short' }),
        rawDate: festDate
      };
    }).sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

    setAllFestivalsList(list);
    setShowAllFestivals(true);
  }, [festivalYear, selectedCity, formatDateInCity]);

  // Calculate Ekadashi & Vrats for Month
  const handleCalculateVrats = useCallback(() => {
    const startDate = new Date(Date.UTC(vratsYear, vratsMonth, 1, 0, 0, 0));
    const results: any[] = [];

    // Scan across the month for lunar events
    for (let day = 1; day <= 31; day++) {
      const cur = new Date(Date.UTC(vratsYear, vratsMonth, day, 6, 0, 0));
      if (cur.getMonth() !== vratsMonth) break;

      const el = elongation(cur);
      const tIdx = Math.floor(el / 12); // 0 to 29
      const isShukla = tIdx < 15;
      const tNum = isShukla ? tIdx + 1 : tIdx - 14;

      let match = false;
      let title = '';
      let badge = '';

      if (tNum === 11 && (vratsFilter === 'all' || vratsFilter === 'ekadashi')) {
        match = true;
        title = `${isShukla ? 'Shukla' : 'Krishna'} Ekadashi Vrat`;
        badge = 'Ekadashi Fast';
      } else if (isShukla && tNum === 15 && (vratsFilter === 'all' || vratsFilter === 'purnima')) {
        match = true;
        title = 'Purnima Vrat (Satyanarayan Puja)';
        badge = 'Full Moon';
      } else if (!isShukla && tNum === 15 && (vratsFilter === 'all' || vratsFilter === 'amavasya')) {
        match = true;
        title = 'Amavasya (Pitru Tarpan / New Moon)';
        badge = 'New Moon';
      } else if (tNum === 13 && vratsFilter === 'all') {
        match = true;
        title = `${isShukla ? 'Shukla' : 'Krishna'} Pradosh Vrat`;
        badge = 'Pradosh';
      }

      if (match) {
        // Find exact start and end of this tithi
        const targetDeg = tIdx * 12;
        const nextDeg = ((tIdx + 1) * 12) % 360;
        const approxStart = new Date(cur.getTime() - 12 * HOUR_MS);
        const approxEnd = new Date(cur.getTime() + 12 * HOUR_MS);
        const sunrise = getLocalSunrise(cur, selectedCity);

        results.push({
          dateFormatted: formatDateInCity(cur, { dateStyle: 'full' }),
          weekday: formatDateInCity(cur, { weekday: 'short' }),
          title,
          badge,
          paksha: isShukla ? 'Shukla' : 'Krishna',
          sunrise: formatDateInCity(sunrise, { timeStyle: 'short' }),
          start: formatDateInCity(approxStart, { timeStyle: 'short' }),
          end: formatDateInCity(approxEnd, { timeStyle: 'short' }),
          rawDate: cur
        });
      }
    }

    setVratsResults(results);
  }, [vratsYear, vratsMonth, vratsFilter, selectedCity, formatDateInCity]);

  useEffect(() => {
    handleCalculateVrats();
  }, [handleCalculateVrats]);

  // iCal Generator Helper
  const downloadIcs = (title: string, date: Date, description: string) => {
    const pad = (n: number) => (n < 10 ? '0' + n : String(n));
    const startStr = `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T060000Z`;
    const endStr = `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T180000Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ApexCMS//Indian Vrat & Panchang Engine//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${title} (${selectedCity.name})`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `LOCATION:${selectedCity.name}, ${selectedCity.region}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`rounded-3xl border shadow-xl overflow-hidden ${
      isDarkMode ? 'bg-[#161b22] border-stone-800 text-stone-100' : 'bg-[#fffaf0] border-[#e6d5bb] text-[#2c1810]'
    }`}>
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#7b1e2b] via-[#9e2738] to-[#d97706] text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/15 text-amber-200 border border-white/20 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Astronomical Ephemeris Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Indian Vrat & Festival Panchang Calculator
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
              Convert Shaka or Vikram Samvat dates to the Gregorian calendar, calculate exact Tithi start & end times, local sunrise/sunset, and find Ekadashi, Purnima & major festivals across 80+ global cities.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Global Location & City Selector Bar */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-4 text-xs ${
        isDarkMode ? 'bg-[#1b2128] border-stone-800' : 'bg-[#f7eedc] border-[#ecdac0]'
      }`}>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="font-bold text-stone-900 dark:text-stone-100">Location & Timezone:</span>
          <select
            value={selectedCityIndex}
            onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
            className="border rounded-lg px-3 py-1.5 font-bold cursor-pointer bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
          >
            {CITIES.map((city, idx) => (
              <option key={idx} value={idx}>
                {city.name} ({city.region}) · {city.tz}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-600 dark:text-stone-300">
          <span>Lat: <strong>{selectedCity.lat.toFixed(2)}°</strong></span>
          <span>Lon: <strong>{selectedCity.lon.toFixed(2)}°</strong></span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">
            {selectedCity.tz}
          </span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 px-6 gap-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('convert')}
          className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'convert'
              ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Hindu → Gregorian Converter
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'festivals'
              ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Festival & Vrat Finder
        </button>

        <button
          onClick={() => setActiveTab('ekadashi')}
          className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'ekadashi'
              ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-300'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <Moon className="w-4 h-4" />
          Ekadashi & Purnima/Amavasya
        </button>
      </div>

      {/* TAB 1: CONVERTER */}
      {activeTab === 'convert' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Calendar System</label>
              <select
                value={calendarSystem}
                onChange={(e) => setCalendarSystem(e.target.value as any)}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="vikram-chaitra">Vikram Samvat — Chaitraadi (North India)</option>
                <option value="vikram-kartik">Vikram Samvat — Kartikadi (Gujarat / Maharashtra)</option>
                <option value="shaka">Shaka Samvat (National Calendar)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Hindu Year (Samvat)</label>
              <input
                type="number"
                value={hinduYear}
                onChange={(e) => setHinduYear(parseInt(e.target.value, 10) || 2083)}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Month System</label>
              <select
                value={monthSystem}
                onChange={(e) => setMonthSystem(e.target.value as any)}
                disabled={calendarSystem === 'vikram-kartik'}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium disabled:opacity-60"
              >
                <option value="purnimanta">Purnimanta (Full Moon to Full Moon)</option>
                <option value="amanta">Amanta (New Moon to New Moon)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Hindu Month (Masa)</label>
              <select
                value={hinduMonth}
                onChange={(e) => setHinduMonth(parseInt(e.target.value, 10))}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
              >
                {MONTHS.map((m, idx) => (
                  <option key={idx} value={idx}>{idx + 1}. {m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Paksha (Lunar Fortnight)</label>
              <select
                value={paksha}
                onChange={(e) => setPaksha(e.target.value as any)}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
              >
                <option value="shukla">Shukla Paksha (Waxing / Bright)</option>
                <option value="krishna">Krishna Paksha (Waning / Dark)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Tithi</label>
              <select
                value={tithi}
                onChange={(e) => setTithi(parseInt(e.target.value, 10))}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
              >
                {Array.from({ length: 14 }, (_, i) => i + 1).map((i) => (
                  <option key={i} value={i}>{i} — {TITHI_NAMES[i - 1]}</option>
                ))}
                <option value={15}>15 — {paksha === 'shukla' ? 'Purnima' : 'Amavasya'}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800 dark:text-stone-200">
              <input
                type="checkbox"
                checked={isAdhika}
                onChange={(e) => setIsAdhika(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Adhika Masa (Intercalary Leap Month)</span>
            </label>

            <button
              onClick={handleCalculateConversion}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Calculate English Date
            </button>
          </div>

          {/* Results Card */}
          {convertResult && (
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-[#1b2128] border-stone-700' : 'bg-[#fff5e5] border-[#f3c677]'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-300/40 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Calculated English Gregorian Date
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-50">
                    {convertResult.englishDate}
                  </h3>
                </div>

                <button
                  onClick={() => downloadIcs(
                    `${convertResult.hinduMonthName} ${convertResult.tithiName}`,
                    convertResult.rawStartDate,
                    `Hindu Date: ${convertResult.hinduMonthName} ${convertResult.tithiName} (${convertResult.calendarName} ${convertResult.year})\nStart: ${convertResult.startTime}\nEnd: ${convertResult.endTime}\nLocation: ${convertResult.city} (${convertResult.tz})`
                  )}
                  className="px-3.5 py-1.5 rounded-lg border border-amber-600/30 bg-amber-600/10 hover:bg-amber-600/20 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Add to Calendar (.ics)
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Tithi & Paksha</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{convertResult.tithiName}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Hindu Month & Era</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{convertResult.hinduMonthName} ({convertResult.year})</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Tithi Starts</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{convertResult.startTime}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Local Sunrise</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{convertResult.sunriseTime}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FESTIVAL FINDER */}
      {activeTab === 'festivals' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Gregorian Year</label>
              <input
                type="number"
                value={festivalYear}
                onChange={(e) => setFestivalYear(parseInt(e.target.value, 10) || new Date().getFullYear())}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Select Festival or Vrat</label>
              <select
                value={selectedFestivalIndex}
                onChange={(e) => setSelectedFestivalIndex(parseInt(e.target.value, 10))}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
              >
                {FESTIVALS.map((f, idx) => (
                  <option key={f.id} value={idx}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleGenerateAllFestivals}
              className="px-4 py-2 border rounded-xl text-xs font-bold border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 transition"
            >
              📅 View Full Year Festival Calendar ({festivalYear})
            </button>

            <button
              onClick={handleCalculateFestival}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Calculate Festival Date
            </button>
          </div>

          {/* Festival Result */}
          {festivalResult && !showAllFestivals && (
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-[#1b2128] border-stone-700' : 'bg-[#fff5e5] border-[#f3c677]'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-300/40 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    {festivalResult.festival} ({festivalYear})
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-50">
                    {festivalResult.dateFormatted}
                  </h3>
                </div>

                <button
                  onClick={() => downloadIcs(
                    festivalResult.festival,
                    festivalResult.rawDate,
                    `${festivalResult.festival}\nTithi: ${festivalResult.tithiInfo}\nLocation: ${selectedCity.name}\n${festivalResult.note}`
                  )}
                  className="px-3.5 py-1.5 rounded-lg border border-amber-600/30 bg-amber-600/10 hover:bg-amber-600/20 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Add to Calendar (.ics)
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Panchang Tithi</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{festivalResult.tithiInfo}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Local Sunrise</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{festivalResult.sunriseTime}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Local Sunset</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{festivalResult.sunsetTime}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] uppercase font-bold">Local Moonrise</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{festivalResult.moonriseTime}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                <strong>Observance Rule:</strong> {festivalResult.note}
              </div>
            </div>
          )}

          {/* Full Year Festivals Table */}
          {showAllFestivals && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  Annual Hindu Festivals for {festivalYear} ({selectedCity.name})
                </h4>
                <button
                  onClick={() => setShowAllFestivals(false)}
                  className="text-xs text-amber-700 dark:text-amber-400 underline font-bold"
                >
                  Back to Single Finder
                </button>
              </div>

              <div className="rounded-xl border overflow-x-auto border-stone-200 dark:border-stone-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-amber-500/10 border-stone-200 dark:border-stone-800 font-bold text-stone-700 dark:text-stone-300">
                      <th className="p-3">Festival Name</th>
                      <th className="p-3">Date ({selectedCity.name})</th>
                      <th className="p-3">Weekday</th>
                      <th className="p-3">Panchang Tithi</th>
                      <th className="p-3 text-right">Calendar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {allFestivalsList.map((fest, idx) => (
                      <tr key={idx} className="hover:bg-amber-500/5">
                        <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{fest.name}</td>
                        <td className="p-3 font-mono text-stone-800 dark:text-stone-200">{fest.dateFormatted}</td>
                        <td className="p-3 font-mono text-stone-500">{fest.weekday}</td>
                        <td className="p-3 text-stone-600 dark:text-stone-400">{MONTHS[fest.month]} ({fest.paksha})</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => downloadIcs(fest.name, fest.rawDate, `${fest.name} · ${selectedCity.name}`)}
                            className="px-2 py-1 text-[11px] rounded bg-amber-600 text-white font-bold"
                          >
                            .ics
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EKADASHI & VRATS */}
      {activeTab === 'ekadashi' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div>
                <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Month</label>
                <select
                  value={vratsMonth}
                  onChange={(e) => setVratsMonth(parseInt(e.target.value, 10))}
                  className="border rounded-lg px-3 py-1.5 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium"
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, idx) => (
                    <option key={idx} value={idx}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-stone-800 dark:text-stone-200">Year</label>
                <input
                  type="number"
                  value={vratsYear}
                  onChange={(e) => setVratsYear(parseInt(e.target.value, 10) || new Date().getFullYear())}
                  className="w-24 border rounded-lg px-3 py-1.5 bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-bold">
              <button
                onClick={() => setVratsFilter('ekadashi')}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  vratsFilter === 'ekadashi'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                Ekadashi
              </button>
              <button
                onClick={() => setVratsFilter('purnima')}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  vratsFilter === 'purnima'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                Purnima
              </button>
              <button
                onClick={() => setVratsFilter('amavasya')}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  vratsFilter === 'amavasya'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                Amavasya
              </button>
              <button
                onClick={() => setVratsFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  vratsFilter === 'all'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                All Vrats
              </button>
            </div>
          </div>

          {vratsResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500 border border-dashed rounded-xl">
              No matching vrats found for the selected month and filter.
            </div>
          ) : (
            <div className="rounded-xl border overflow-x-auto border-stone-200 dark:border-stone-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-amber-500/10 border-stone-200 dark:border-stone-800 font-bold text-stone-700 dark:text-stone-300">
                    <th className="p-3">Observance & Vrat</th>
                    <th className="p-3">Date ({selectedCity.name})</th>
                    <th className="p-3">Weekday</th>
                    <th className="p-3">Sunrise Timing</th>
                    <th className="p-3 text-right">Calendar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                  {vratsResults.map((vrat, idx) => (
                    <tr key={idx} className="hover:bg-amber-500/5">
                      <td className="p-3">
                        <div className="font-bold text-stone-900 dark:text-stone-100">{vrat.title}</div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">
                          {vrat.badge}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-stone-800 dark:text-stone-200 font-bold">{vrat.dateFormatted}</td>
                      <td className="p-3 font-mono text-stone-500">{vrat.weekday}</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">{vrat.sunrise}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => downloadIcs(vrat.title, vrat.rawDate, `${vrat.title} observance in ${selectedCity.name}`)}
                          className="px-2.5 py-1 text-[11px] rounded bg-amber-600 text-white font-bold hover:bg-amber-500 transition"
                        >
                          .ics
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className={`p-4 border-t text-[11px] font-mono flex flex-wrap items-center justify-between gap-2 ${
        isDarkMode ? 'bg-[#1b2128] border-stone-800 text-stone-400' : 'bg-[#f7eedc] border-[#ecdac0] text-stone-600'
      }`}>
        <span>Solar / Lunar Ephemeris · Lahiri Ayanamsha · Bisection Crossing Algorithms</span>
        <span className="text-amber-700 dark:text-amber-400 font-bold">Calculated in {selectedCity.name} Time ({selectedCity.tz})</span>
      </div>
    </div>
  );
};
