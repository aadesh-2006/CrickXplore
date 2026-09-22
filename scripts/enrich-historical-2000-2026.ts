import * as fs from 'fs';
import * as path from 'path';
import type { NormalizedPlayer } from '../src/types/player';

import { INDIA_PLAYERS } from '../src/data/players/india';
import { AUSTRALIA_PLAYERS } from '../src/data/players/australia';
import { ENGLAND_PLAYERS } from '../src/data/players/england';
import { SOUTH_AFRICA_PLAYERS } from '../src/data/players/southAfrica';
import { SRI_LANKA_PLAYERS } from '../src/data/players/sriLanka';
import { NEW_ZEALAND_PLAYERS } from '../src/data/players/newZealand';

console.log('Starting Historical 2000–2026 Dataset Expansion...');

// ==========================================
// 1. INDIA HISTORICAL (2000–2026)
// ==========================================
export const HISTORICAL_INDIA: NormalizedPlayer[] = [
  {
    id: 'ashish-nehra',
    name: 'Ashish Nehra',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Left-arm medium-fast',
    dateOfBirth: '1979-04-29',
    placeOfBirth: 'Delhi, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['6/23 vs ENGLAND IN 2003 WORLD CUP (INDIA BEST WC FIGURES)', '2011 WORLD CUP CHAMPION', '18-YEAR INTERNATIONAL CAREER'],
    stats: {
      test: {
        bowling: { matches: 17, innings: 28, overs: 494.4, wickets: 44, economy: 3.24, average: 42.4, bestBowlingInnings: '4/72', bestBowlingMatch: '6/133' },
      },
      odi: {
        bowling: { matches: 120, innings: 120, overs: 981.4, wickets: 157, economy: 5.19, average: 31.72, strikeRate: 36.6, bestBowlingInnings: '6/23', fourWickets: 4, fiveWickets: 2 },
      },
      t20i: {
        bowling: { matches: 27, innings: 27, overs: 97.4, wickets: 34, economy: 7.73, average: 22.29, strikeRate: 17.2, bestBowlingInnings: '3/19' },
      },
    },
  },
  {
    id: 'irfan-pathan',
    name: 'Irfan Pathan',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Left-arm medium-fast',
    dateOfBirth: '1984-10-27',
    placeOfBirth: 'Baroda, Gujarat, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['2007 T20 WORLD CUP FINAL PLAYER OF THE MATCH (3/16)', 'TEST HAT-TRICK IN 1st OVER vs PAKISTAN AT KARACHI', '300+ INTERNATIONAL WICKETS & 2,800+ RUNS'],
    stats: {
      test: {
        batting: { matches: 29, innings: 40, runs: 1105, average: 31.57, strikeRate: 53.5, highestScore: '102', centuries: 1, fifties: 6 },
        bowling: { matches: 29, innings: 54, overs: 1007.4, wickets: 100, economy: 3.28, average: 32.26, strikeRate: 60.4, bestBowlingInnings: '7/59', bestBowlingMatch: '12/126', fiveWickets: 7, tenWickets: 2 },
      },
      odi: {
        batting: { matches: 120, innings: 87, runs: 1544, average: 23.39, strikeRate: 79.54, highestScore: '83', centuries: 0, fifties: 5 },
        bowling: { matches: 120, innings: 118, overs: 979.1, wickets: 173, economy: 5.26, average: 29.72, strikeRate: 33.9, bestBowlingInnings: '5/27', fourWickets: 4, fiveWickets: 2 },
      },
      t20i: {
        batting: { matches: 24, innings: 14, runs: 172, average: 24.57, strikeRate: 119.44, highestScore: '33*', centuries: 0, fifties: 0 },
        bowling: { matches: 24, innings: 23, overs: 77.2, wickets: 28, economy: 8.02, average: 22.07, strikeRate: 16.5, bestBowlingInnings: '3/16' },
      },
    },
  },
  {
    id: 'yusuf-pathan',
    name: 'Yusuf Pathan',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1982-11-17',
    placeOfBirth: 'Baroda, Gujarat, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['2X WORLD CUP WINNER (2007 T20 & 2011 ODI)', '3X IPL CHAMPION', '105 (70) vs SOUTH AFRICA AT CENTURION (8 SIXES)', '37-BALL IPL CENTURY RECORD'],
    stats: {
      odi: {
        batting: { matches: 57, innings: 41, runs: 810, average: 27.0, strikeRate: 113.6, highestScore: '123*', centuries: 2, fifties: 3, fours: 63, sixes: 41 },
        bowling: { matches: 57, innings: 43, overs: 243.2, wickets: 33, economy: 5.47, average: 40.36, bestBowlingInnings: '3/49' },
      },
      t20i: {
        batting: { matches: 22, innings: 18, runs: 236, average: 18.15, strikeRate: 146.58, highestScore: '37*', centuries: 0, fifties: 0, sixes: 17 },
        bowling: { matches: 22, innings: 17, overs: 47.0, wickets: 13, economy: 8.61, average: 31.15, bestBowlingInnings: '2/22' },
      },
    },
  },
  {
    id: 'suresh-raina',
    name: 'Suresh Raina',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1986-11-27',
    placeOfBirth: 'Muradnagar, Uttar Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['MR IPL', '2011 WORLD CUP CHAMPION & 2013 CHAMPIONS TROPHY WINNER', 'FIRST INDIAN TO SCORE CENTURIES IN ALL 3 FORMATS', '5,500+ IPL RUNS & 4X TITLE WINNER'],
    stats: {
      test: {
        batting: { matches: 18, innings: 31, runs: 768, average: 26.48, strikeRate: 52.8, highestScore: '120', centuries: 1, fifties: 7 },
        bowling: { matches: 18, innings: 23, overs: 225.5, wickets: 13, economy: 3.32, average: 46.38, bestBowlingInnings: '2/52' },
      },
      odi: {
        batting: { matches: 226, innings: 194, runs: 5615, average: 35.31, strikeRate: 93.5, highestScore: '116*', centuries: 5, fifties: 36, fours: 476, sixes: 120 },
        bowling: { matches: 226, innings: 111, overs: 395.4, wickets: 36, economy: 5.1, average: 50.3, bestBowlingInnings: '3/34' },
      },
      t20i: {
        batting: { matches: 78, innings: 66, runs: 1605, average: 29.18, strikeRate: 134.87, highestScore: '101', centuries: 1, fifties: 5, fours: 145, sixes: 58 },
        bowling: { matches: 78, innings: 28, overs: 58.4, wickets: 13, economy: 7.46, average: 34.0, bestBowlingInnings: '2/6' },
      },
    },
  },
  {
    id: 'ajit-agarkar',
    name: 'Ajit Agarkar',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1977-12-04',
    placeOfBirth: 'Mumbai, Maharashtra, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['288 ODI WICKETS (3RD HIGHEST IN INDIAN HISTORY)', '6/41 AT ADELAIDE 2003 HISTORIC TEST WIN', 'FASTEST 50 WICKETS IN ODI HISTORY (23 MATCHES)', '21-BALL FASTEST ODI 50 FOR INDIA & LORD’S TEST CENTURY'],
    stats: {
      test: {
        batting: { matches: 26, innings: 39, runs: 571, average: 16.79, strikeRate: 52.8, highestScore: '109*', centuries: 1, fifties: 0 },
        bowling: { matches: 26, innings: 46, overs: 733.4, wickets: 58, economy: 3.39, average: 47.32, strikeRate: 75.8, bestBowlingInnings: '6/41', fiveWickets: 1 },
      },
      odi: {
        batting: { matches: 191, innings: 113, runs: 1269, average: 14.58, strikeRate: 80.62, highestScore: '95', centuries: 0, fifties: 3 },
        bowling: { matches: 191, innings: 188, overs: 1579.5, wickets: 288, economy: 5.07, average: 27.85, strikeRate: 32.9, bestBowlingInnings: '6/42', fourWickets: 10, fiveWickets: 2 },
      },
      t20i: {
        bowling: { matches: 4, innings: 4, overs: 9.3, wickets: 3, economy: 8.84, average: 28.0, bestBowlingInnings: '2/10' },
      },
    },
  },
  {
    id: 'munaf-patel',
    name: 'Munaf Patel',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium-fast',
    dateOfBirth: '1983-07-12',
    placeOfBirth: 'Ikhar, Gujarat, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['2011 WORLD CUP CHAMPION (11 WICKETS, 3RD HIGHEST FOR INDIA)', 'UNSUNG HERO OF INDIAN SEAM BOWLING', '7/97 ON TEST DEBUT vs ENGLAND AT MOHALI'],
    stats: {
      test: {
        bowling: { matches: 13, innings: 20, overs: 355.2, wickets: 35, economy: 3.25, average: 38.54, strikeRate: 60.9, bestBowlingInnings: '4/25' },
      },
      odi: {
        bowling: { matches: 86, innings: 83, overs: 699.2, wickets: 86, economy: 4.95, average: 30.26, strikeRate: 36.7, bestBowlingInnings: '4/29', fourWickets: 4 },
      },
      t20i: {
        bowling: { matches: 5, innings: 5, overs: 17.0, wickets: 4, economy: 8.7, average: 37.0, bestBowlingInnings: '2/25' },
      },
    },
  },
  {
    id: 'praveen-kumar',
    name: 'Praveen Kumar',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1986-10-02',
    placeOfBirth: 'Meerut, Uttar Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['CB SERIES 2008 HERO (4/46 IN 2nd FINAL vs AUS)', 'LORD’S 5-FER HONOURS BOARD (5/106 vs ENG)', 'MASTER OF HOOPING CONVENTIONAL SWING'],
    stats: {
      test: {
        bowling: { matches: 6, innings: 11, overs: 226.5, wickets: 27, economy: 3.12, average: 25.81, strikeRate: 50.4, bestBowlingInnings: '5/106', fiveWickets: 1 },
      },
      odi: {
        bowling: { matches: 68, innings: 68, overs: 569.3, wickets: 77, economy: 5.13, average: 36.02, strikeRate: 44.3, bestBowlingInnings: '4/31', fourWickets: 3 },
      },
      t20i: {
        bowling: { matches: 10, innings: 10, overs: 35.1, wickets: 8, economy: 7.42, average: 32.62, bestBowlingInnings: '2/14' },
      },
    },
  },
  {
    id: 's-sreesanth',
    name: 'S. Sreesanth',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1983-02-07',
    placeOfBirth: 'Kothamangalam, Kerala, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['2X WORLD CUP WINNER (2007 T20 & 2011 ODI)', 'MISBAH CATCH IN 2007 T20 WC FINAL', '5/40 vs SA AT JOHANNESBURG 2006 HISTORIC TEST WIN', 'PRISTINE SEAM PRESENTATION'],
    stats: {
      test: {
        bowling: { matches: 27, innings: 50, overs: 832.2, wickets: 87, economy: 3.89, average: 37.59, strikeRate: 57.4, bestBowlingInnings: '5/40', bestBowlingMatch: '8/99', fiveWickets: 3 },
      },
      odi: {
        bowling: { matches: 53, innings: 52, overs: 448.2, wickets: 75, economy: 6.07, average: 33.44, strikeRate: 35.8, bestBowlingInnings: '6/55', fiveWickets: 1 },
      },
      t20i: {
        bowling: { matches: 10, innings: 10, overs: 36.4, wickets: 7, economy: 8.47, average: 44.42, bestBowlingInnings: '2/12' },
      },
    },
  },
  {
    id: 'r-p-singh',
    name: 'R. P. Singh',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Left-arm fast-medium',
    dateOfBirth: '1985-12-06',
    placeOfBirth: 'Rae Bareli, Uttar Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['2007 T20 WORLD CUP TOP WICKET TAKER FOR INDIA (12 WKTS)', '3/26 IN 2007 T20 WC FINAL vs PAK', '5/59 AT LORD’S (2007 TEST SERIES WIN IN ENGLAND)', 'PURPLE CAP WINNER 2009 (DECCAN CHARGERS)'],
    stats: {
      test: {
        bowling: { matches: 14, innings: 25, overs: 435.5, wickets: 40, economy: 3.93, average: 42.05, strikeRate: 65.3, bestBowlingInnings: '5/59', fiveWickets: 1 },
      },
      odi: {
        bowling: { matches: 58, innings: 56, overs: 457.2, wickets: 69, economy: 5.48, average: 34.69, strikeRate: 39.7, bestBowlingInnings: '4/35', fourWickets: 4 },
      },
      t20i: {
        bowling: { matches: 10, innings: 10, overs: 37.0, wickets: 15, economy: 6.81, average: 15.0, strikeRate: 14.8, bestBowlingInnings: '4/13', fourWickets: 1 },
      },
    },
  },
  {
    id: 'dinesh-karthik',
    name: 'Dinesh Karthik',
    country: 'India',
    countryCode: 'IND',
    role: 'wicket-keeper',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1985-06-01',
    placeOfBirth: 'Chennai, Tamil Nadu, India',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    isFallbackData: true,
    badges: ['LAST-BALL SIX TO WIN NIDAHAS TROPHY 2018 (29* OFF 8)', 'LEADING RUN SCORER IN 2007 TEST SERIES WIN IN ENGLAND (263 RUNS AS OPENER)', '2007 T20 WORLD CUP CHAMPION & 2013 CHAMPIONS TROPHY WINNER', '18-YEAR CAREER SPAN (2004–2022)'],
    stats: {
      test: {
        batting: { matches: 26, innings: 42, runs: 1025, average: 25.0, strikeRate: 49.3, highestScore: '129', centuries: 1, fifties: 7 },
      },
      odi: {
        batting: { matches: 94, innings: 71, runs: 1752, average: 30.2, strikeRate: 73.24, highestScore: '79', centuries: 0, fifties: 9 },
      },
      t20i: {
        batting: { matches: 60, innings: 48, runs: 686, average: 26.38, strikeRate: 142.61, highestScore: '55', centuries: 0, fifties: 1, sixes: 31 },
      },
    },
  },
  {
    id: 'robin-uthappa',
    name: 'Robin Uthappa',
    country: 'India',
    countryCode: 'IND',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1985-11-11',
    placeOfBirth: 'Kodagu, Karnataka, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['2007 T20 WORLD CUP CHAMPION (BOWL-OUT HERO)', '86 ON ODI DEBUT vs ENGLAND', '2X IPL CHAMPION & ORANGE CAP WINNER 2014 (660 RUNS)', 'THE WALKING ASSASSIN'],
    stats: {
      odi: {
        batting: { matches: 46, innings: 42, runs: 934, average: 25.94, strikeRate: 90.59, highestScore: '86', centuries: 0, fifties: 6, fours: 95, sixes: 22 },
      },
      t20i: {
        batting: { matches: 13, innings: 12, runs: 249, average: 24.9, strikeRate: 118.0, highestScore: '50', centuries: 0, fifties: 1 },
      },
    },
  },
  {
    id: 'murali-vijay',
    name: 'Murali Vijay',
    country: 'India',
    countryCode: 'IND',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1984-04-01',
    placeOfBirth: 'Chennai, Tamil Nadu, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['THE MONK OF TEST CRICKET', '3,982 TEST RUNS & 12 TEST CENTURIES', '144 AT BRISBANE & 145 AT TRENT BRIDGE', '2X IPL CHAMPION WITH CSK'],
    stats: {
      test: {
        batting: { matches: 61, innings: 105, runs: 3982, average: 38.28, strikeRate: 46.28, highestScore: '167', centuries: 12, fifties: 15, fours: 490, sixes: 33 },
      },
      odi: {
        batting: { matches: 17, innings: 16, runs: 339, average: 21.18, strikeRate: 66.99, highestScore: '72', centuries: 0, fifties: 1 },
      },
      t20i: {
        batting: { matches: 9, innings: 9, runs: 169, average: 18.77, strikeRate: 109.74, highestScore: '48', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'pragyan-ojha',
    name: 'Pragyan Ojha',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Slow left-arm orthodox',
    dateOfBirth: '1986-09-05',
    placeOfBirth: 'Bhubaneswar, Odisha, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['113 TEST WICKETS IN JUST 24 MATCHES (30.27 AVG)', '10-FER IN SACHIN TENDULKAR’S FAREWELL TEST AT WANKHEDE (PLAYER OF MATCH)', 'PURPLE CAP WINNER 2010 (21 WKTS)'],
    stats: {
      test: {
        bowling: { matches: 24, innings: 40, overs: 1146.5, wickets: 113, economy: 2.68, average: 30.27, strikeRate: 60.8, bestBowlingInnings: '6/47', bestBowlingMatch: '10/89', fiveWickets: 7, tenWickets: 1 },
      },
      odi: {
        bowling: { matches: 18, innings: 18, overs: 147.2, wickets: 21, economy: 4.47, average: 31.04, bestBowlingInnings: '4/38', fourWickets: 1 },
      },
      t20i: {
        bowling: { matches: 6, innings: 6, overs: 19.0, wickets: 10, economy: 6.42, average: 12.2, strikeRate: 11.4, bestBowlingInnings: '4/18', fourWickets: 1 },
      },
    },
  },
  {
    id: 'amit-mishra',
    name: 'Amit Mishra',
    country: 'India',
    countryCode: 'IND',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm legbreak googly',
    dateOfBirth: '1982-11-24',
    placeOfBirth: 'Delhi, India',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['5-FER ON TEST DEBUT vs AUSTRALIA AT MOHALI', '3 IPL HAT-TRICKS (RECORD HOLDER)', '5/18 vs NZ AT VIZAG IN SERIES DECIDER', '166+ IPL WICKETS & 150+ INT WICKETS'],
    stats: {
      test: {
        bowling: { matches: 22, innings: 37, overs: 736.0, wickets: 76, economy: 3.19, average: 35.72, strikeRate: 58.1, bestBowlingInnings: '5/71', fiveWickets: 1 },
        batting: { matches: 22, innings: 32, runs: 648, average: 21.6, strikeRate: 46.2, highestScore: '84', centuries: 0, fifties: 4 },
      },
      odi: {
        bowling: { matches: 36, innings: 34, overs: 301.2, wickets: 64, economy: 4.72, average: 23.6, strikeRate: 28.2, bestBowlingInnings: '6/48', fourWickets: 3, fiveWickets: 2 },
      },
      t20i: {
        bowling: { matches: 10, innings: 10, overs: 38.0, wickets: 16, economy: 6.31, average: 15.0, strikeRate: 14.2, bestBowlingInnings: '3/24' },
      },
    },
  },
  {
    id: 'wasim-jaffer',
    name: 'Wasim Jaffer',
    country: 'India',
    countryCode: 'IND',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1978-02-16',
    placeOfBirth: 'Mumbai, Maharashtra, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['RANJI TROPHY ALL-TIME HIGHEST RUN SCORER (12,038 RUNS)', '2 TEST DOUBLE CENTURIES (212 vs WI & 202 vs PAK)', '5 TEST HUNDREDS IN 31 TESTS', 'DOMESTIC GODFATHER'],
    stats: {
      test: {
        batting: { matches: 31, innings: 58, runs: 1944, average: 34.1, strikeRate: 49.3, highestScore: '212', centuries: 5, fifties: 11, fours: 258, sixes: 11 },
      },
      odi: {
        batting: { matches: 2, innings: 2, runs: 10, average: 5.0, strikeRate: 50.0, highestScore: '10', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'parthiv-patel',
    name: 'Parthiv Patel',
    country: 'India',
    countryCode: 'IND',
    role: 'wicket-keeper',
    battingStyle: 'Left-hand bat',
    dateOfBirth: '1985-03-09',
    placeOfBirth: 'Ahmedabad, Gujarat, India',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    isFallbackData: true,
    badges: ['YOUNGEST TEST WICKETKEEPER IN CRICKET HISTORY (AGE 17 vs ENGLAND AT TRENT BRIDGE)', '2X IPL CHAMPION (CSK 2010, MI 2015/2017)', '2,800+ IPL RUNS', 'RANJI TROPHY WINNING CAPTAIN FOR GUJARAT (143 IN FINAL)'],
    stats: {
      test: {
        batting: { matches: 25, innings: 40, runs: 934, average: 31.13, strikeRate: 56.4, highestScore: '71', centuries: 0, fifties: 6 },
      },
      odi: {
        batting: { matches: 38, innings: 34, runs: 736, average: 23.74, strikeRate: 76.42, highestScore: '95', centuries: 0, fifties: 4 },
      },
      t20i: {
        batting: { matches: 2, innings: 2, runs: 36, average: 18.0, strikeRate: 112.5, highestScore: '26', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'kedar-jadhav',
    name: 'Kedar Jadhav',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak (Low-arm sidearm)',
    dateOfBirth: '1985-03-26',
    placeOfBirth: 'Pune, Maharashtra, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['120 (76) vs ENGLAND IN PUNE (WITH KOHLI IN HISTORIC 350 CHASE)', 'UNORTHODOX UNDER-ARM SLINGING GOLDEN ARM (27 ODI WKTS)', '2019 WORLD CUP SQUAD', 'CSK 2018 IPL OPENER HERO ON ONE LEG'],
    stats: {
      odi: {
        batting: { matches: 73, innings: 52, runs: 1389, average: 42.09, strikeRate: 101.6, highestScore: '120', centuries: 2, fifties: 6, fours: 128, sixes: 22 },
        bowling: { matches: 73, innings: 42, overs: 188.4, wickets: 27, economy: 5.15, average: 35.92, bestBowlingInnings: '3/23' },
      },
      t20i: {
        batting: { matches: 9, innings: 6, runs: 122, average: 20.33, strikeRate: 123.23, highestScore: '58', centuries: 0, fifties: 1 },
      },
    },
  },
  {
    id: 'ambati-rayudu',
    name: 'Ambati Rayudu',
    country: 'India',
    countryCode: 'IND',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1985-09-23',
    placeOfBirth: 'Guntur, Andhra Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['6X IPL CHAMPION (JOINT RECORD WITH ROHIT SHARMA)', 'ODI AVERAGE 47.05 ACROSS 55 MATCHES', '100* vs SL & 121* vs ZIMBABWE', 'CLUTCH MIDDLE-ORDER STABILIZER'],
    stats: {
      odi: {
        batting: { matches: 55, innings: 50, runs: 1694, average: 47.05, strikeRate: 79.04, highestScore: '124*', centuries: 3, fifties: 10, fours: 142, sixes: 31 },
      },
      t20i: {
        batting: { matches: 6, innings: 5, runs: 42, average: 10.5, strikeRate: 84.0, highestScore: '20*', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'shardul-thakur',
    name: 'Shardul Thakur',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium-fast',
    dateOfBirth: '1991-10-16',
    placeOfBirth: 'Palghar, Maharashtra, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['LORD SHARDUL', 'HISTORIC GABBA WIN HERO (67 & 7 WICKETS)', 'TWIN 50s AT THE OVAL vs ENGLAND (FASTEST TEST 50 IN ENG)', '7/61 vs SOUTH AFRICA AT JOHANNESBURG', '129 INTERNATIONAL WICKETS'],
    stats: {
      test: {
        batting: { matches: 11, innings: 19, runs: 331, average: 19.47, strikeRate: 64.64, highestScore: '67', centuries: 0, fifties: 4 },
        bowling: { matches: 11, innings: 19, overs: 226.3, wickets: 31, economy: 3.86, average: 28.38, strikeRate: 43.8, bestBowlingInnings: '7/61', fiveWickets: 1 },
      },
      odi: {
        batting: { matches: 47, innings: 26, runs: 329, average: 17.31, strikeRate: 105.11, highestScore: '50*', centuries: 0, fifties: 1 },
        bowling: { matches: 47, innings: 45, overs: 338.4, wickets: 65, economy: 6.18, average: 32.18, strikeRate: 31.2, bestBowlingInnings: '4/37', fourWickets: 3 },
      },
      t20i: {
        batting: { matches: 25, innings: 6, runs: 69, average: 23.0, strikeRate: 181.57, highestScore: '22*', centuries: 0, fifties: 0 },
        bowling: { matches: 25, innings: 24, overs: 81.3, wickets: 33, economy: 9.15, average: 22.69, strikeRate: 14.8, bestBowlingInnings: '4/27', fourWickets: 1 },
      },
    },
  },
  {
    id: 'wriddhiman-saha',
    name: 'Wriddhiman Saha',
    country: 'India',
    countryCode: 'IND',
    role: 'wicket-keeper',
    battingStyle: 'Right-hand bat',
    dateOfBirth: '1984-10-24',
    placeOfBirth: 'Siliguri, West Bengal, India',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    isFallbackData: true,
    badges: ['SUPERMAN OF WICKETKEEPING (BEST GLOVEWORK IN WORLD)', '104 DISMISSALS IN 40 TESTS', '3 TEST CENTURIES (117 AT RANCHI)', 'IPL 2014 FINAL CENTURY (115* FOR PBKS)'],
    stats: {
      test: {
        batting: { matches: 40, innings: 56, runs: 1353, average: 29.41, strikeRate: 45.47, highestScore: '117', centuries: 3, fifties: 6, fours: 159, sixes: 14 },
      },
      odi: {
        batting: { matches: 9, innings: 5, runs: 41, average: 13.66, strikeRate: 73.21, highestScore: '16', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'hanuma-vihari',
    name: 'Hanuma Vihari',
    country: 'India',
    countryCode: 'IND',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    dateOfBirth: '1993-10-13',
    placeOfBirth: 'Kakinada, Andhra Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['SYDNEY 2021 TORN HAMSTRING HERO (23* OFF 161 BALLS TO SAVE TEST)', '111 AT KINGSTON vs WEST INDIES', 'UNBROKEN GRIT IN OVERSEAS TESTS'],
    stats: {
      test: {
        batting: { matches: 16, innings: 28, runs: 839, average: 33.56, strikeRate: 42.5, highestScore: '111', centuries: 1, fifties: 5 },
        bowling: { matches: 16, innings: 13, overs: 91.2, wickets: 5, economy: 3.23, average: 59.0, bestBowlingInnings: '3/37' },
      },
    },
  },
  {
    id: 'sarfaraz-khan',
    name: 'Sarfaraz Khan',
    country: 'India',
    countryCode: 'IND',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm legbreak',
    dateOfBirth: '1997-10-22',
    placeOfBirth: 'Mumbai, Maharashtra, India',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['150 vs NEW ZEALAND AT BENGALURU 2024 (FIRST TEST CENTURY)', '3 FIFTIES IN DEBUT TEST SERIES vs ENGLAND (2024)', 'DOMESTIC BRADMANESQUE AVERAGE 68+ IN FIRST-CLASS'],
    stats: {
      test: {
        batting: { matches: 6, innings: 11, runs: 371, average: 37.1, strikeRate: 73.17, highestScore: '150', centuries: 1, fifties: 3, fours: 42, sixes: 11 },
      },
    },
  },
];

// ==========================================
// 2. AUSTRALIA HISTORICAL (2000–2026)
// ==========================================
export const HISTORICAL_AUSTRALIA: NormalizedPlayer[] = [
  {
    id: 'justin-langer',
    name: 'Justin Langer',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1970-11-21',
    placeOfBirth: 'Perth, Western Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['7,696 TEST RUNS & 23 CENTURIES', 'ICONIC OPENING PARTNERSHIP WITH MATTHEW HAYDEN (5,655 RUNS)', '250 vs ENGLAND AT THE MCG', 'ASHES & T20 WORLD CUP WINNING COACH'],
    stats: {
      test: {
        batting: { matches: 105, innings: 182, runs: 7696, average: 45.27, strikeRate: 54.1, highestScore: '250', centuries: 23, fifties: 30, fours: 906, sixes: 12 },
      },
      odi: {
        batting: { matches: 8, innings: 7, runs: 160, average: 32.0, strikeRate: 67.22, highestScore: '36', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'damien-martyn',
    name: 'Damien Martyn',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1971-10-21',
    placeOfBirth: 'Darwin, Northern Territory, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['EFFORTLESS OFF-DRIVE PURIST', '88* IN 2003 WORLD CUP FINAL vs INDIA (WITH BROKEN FINGER)', '2X WORLD CUP WINNER (1999, 2003)', '2006 CHAMPIONS TROPHY PLAYER OF THE TOURNAMENT'],
    stats: {
      test: {
        batting: { matches: 67, innings: 109, runs: 4406, average: 46.37, strikeRate: 51.8, highestScore: '165', centuries: 13, fifties: 23, fours: 517, sixes: 16 },
      },
      odi: {
        batting: { matches: 208, innings: 182, runs: 5346, average: 40.8, strikeRate: 77.73, highestScore: '144*', centuries: 5, fifties: 37, sixes: 22 },
      },
    },
  },
  {
    id: 'jason-gillespie',
    name: 'Jason Gillespie',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1975-04-19',
    placeOfBirth: 'Darlinghurst, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['DIZZY', '259 TEST WICKETS AT 26.13 AVERAGE', '201* NIGHTWATCHMAN DOUBLE CENTURY vs BANGLADESH (WORLD RECORD)', '2003 WORLD CUP WINNER'],
    stats: {
      test: {
        bowling: { matches: 71, innings: 137, overs: 2793.4, wickets: 259, economy: 2.42, average: 26.13, strikeRate: 64.7, bestBowlingInnings: '7/37', bestBowlingMatch: '9/67', fiveWickets: 8 },
        batting: { matches: 71, innings: 93, runs: 1218, average: 15.61, strikeRate: 43.1, highestScore: '201*', centuries: 1, fifties: 2 },
      },
      odi: {
        bowling: { matches: 97, innings: 95, overs: 835.3, wickets: 142, economy: 4.21, average: 25.42, strikeRate: 35.3, bestBowlingInnings: '5/22', fiveWickets: 3 },
      },
    },
  },
  {
    id: 'shane-watson',
    name: 'Shane Watson',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1981-06-17',
    placeOfBirth: 'Ipswich, Queensland, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['WATO', '2X WORLD CUP WINNER (2007, 2015)', '2X CHAMPIONS TROPHY FINAL PLAYER OF THE MATCH (2006, 2009)', '2X ALLAN BORDER MEDALIST', '185* vs BAN (15 SIXES RECORD)'],
    stats: {
      test: {
        batting: { matches: 59, innings: 109, runs: 3731, average: 35.19, strikeRate: 54.96, highestScore: '176', centuries: 4, fifties: 24, fours: 479, sixes: 31 },
        bowling: { matches: 59, innings: 87, overs: 947.3, wickets: 75, economy: 2.74, average: 33.68, strikeRate: 75.8, bestBowlingInnings: '5/42', fiveWickets: 3 },
      },
      odi: {
        batting: { matches: 190, innings: 169, runs: 5757, average: 40.54, strikeRate: 90.44, highestScore: '185*', centuries: 9, fifties: 33, fours: 570, sixes: 131 },
        bowling: { matches: 190, innings: 163, overs: 1083.5, wickets: 168, economy: 4.95, average: 31.79, strikeRate: 38.7, bestBowlingInnings: '4/36', fourWickets: 3 },
      },
      t20i: {
        batting: { matches: 58, innings: 56, runs: 1462, average: 29.24, strikeRate: 145.32, highestScore: '124*', centuries: 1, fifties: 10, fours: 115, sixes: 83 },
        bowling: { matches: 58, innings: 47, overs: 156.4, wickets: 48, economy: 7.65, average: 24.72, strikeRate: 19.5, bestBowlingInnings: '4/15', fourWickets: 1 },
      },
    },
  },
  {
    id: 'brad-haddin',
    name: 'Brad Haddin',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'wicket-keeper',
    battingStyle: 'Right-hand bat',
    dateOfBirth: '1977-10-23',
    placeOfBirth: 'Cowra, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    isFallbackData: true,
    badges: ['2015 WORLD CUP WINNER', '493 RUNS IN 2013-14 5-0 ASHES WHITEWASH (RECORD FIGHTBACK)', '3,268 TEST RUNS & 270 DISMISSALS'],
    stats: {
      test: {
        batting: { matches: 66, innings: 112, runs: 3268, average: 32.98, strikeRate: 58.74, highestScore: '169', centuries: 4, fifties: 18, fours: 377, sixes: 34 },
      },
      odi: {
        batting: { matches: 126, innings: 115, runs: 3122, average: 31.53, strikeRate: 83.74, highestScore: '110', centuries: 2, fifties: 16 },
      },
      t20i: {
        batting: { matches: 34, innings: 30, runs: 402, average: 17.47, strikeRate: 114.2, highestScore: '47', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'brad-hogg',
    name: 'Brad Hogg',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Slow left-arm chinaman',
    dateOfBirth: '1971-02-06',
    placeOfBirth: 'Narrogin, Western Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['2X UNDEFEATED WORLD CUP CHAMPION (2003, 2007)', '156 ODI WICKETS AT 26.84', 'TONGUE-OUT FLIPPER & WRIST SPIN ENCHANTER'],
    stats: {
      test: {
        bowling: { matches: 7, innings: 11, overs: 247.3, wickets: 17, economy: 3.76, average: 54.76, bestBowlingInnings: '4/133' },
      },
      odi: {
        bowling: { matches: 123, innings: 113, overs: 947.5, wickets: 156, economy: 4.51, average: 26.84, strikeRate: 36.4, bestBowlingInnings: '5/32', fourWickets: 3, fiveWickets: 2 },
      },
      t20i: {
        bowling: { matches: 15, innings: 15, overs: 51.0, wickets: 7, economy: 6.88, average: 50.14, bestBowlingInnings: '2/31' },
      },
    },
  },
  {
    id: 'nathan-bracken',
    name: 'Nathan Bracken',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Left-arm fast-medium',
    dateOfBirth: '1977-09-12',
    placeOfBirth: 'Penrith, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['FORMER NO. 1 ICC ODI BOWLER IN THE WORLD', '2007 WORLD CUP WINNER (16 WICKETS AT 16.1 AVG)', '174 ODI WICKETS AT 24.36 (SWING & CUTTER GENIUS)'],
    stats: {
      test: {
        bowling: { matches: 5, innings: 8, overs: 175.4, wickets: 12, economy: 2.86, average: 42.08, bestBowlingInnings: '4/48' },
      },
      odi: {
        bowling: { matches: 116, innings: 116, overs: 969.5, wickets: 174, economy: 4.41, average: 24.36, strikeRate: 33.4, bestBowlingInnings: '5/47', fourWickets: 5, fiveWickets: 2 },
      },
      t20i: {
        bowling: { matches: 19, innings: 19, overs: 69.3, wickets: 19, economy: 7.02, average: 25.68, strikeRate: 21.9, bestBowlingInnings: '3/11' },
      },
    },
  },
  {
    id: 'stuart-clark',
    name: 'Stuart Clark',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1975-09-28',
    placeOfBirth: 'Sutherland, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['SARFRAZ', '2006-07 5-0 ASHES WHITEWASH HERO (26 WICKETS AT 17.03)', '94 TEST WICKETS AT SENSATIONAL 22.86 AVERAGE', 'MCGRATH CLONE ACCURACY'],
    stats: {
      test: {
        bowling: { matches: 24, innings: 43, overs: 829.4, wickets: 94, economy: 2.59, average: 22.86, strikeRate: 52.9, bestBowlingInnings: '5/55', fiveWickets: 2 },
      },
      odi: {
        bowling: { matches: 39, innings: 38, overs: 337.5, wickets: 53, economy: 4.88, average: 31.11, strikeRate: 38.2, bestBowlingInnings: '4/54', fourWickets: 1 },
      },
    },
  },
  {
    id: 'simon-katich',
    name: 'Simon Katich',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Slow left-arm chinaman',
    dateOfBirth: '1975-08-21',
    placeOfBirth: 'Middle Swan, Western Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['4,188 TEST RUNS AT 45.03', '10 TEST CENTURIES (157 vs WI AT BRIDGETOWN & 131* AT SCG)', 'TENACIOUS FIGHTING TEST OPENER & 6/65 TEST 5-FER'],
    stats: {
      test: {
        batting: { matches: 56, innings: 99, runs: 4188, average: 45.03, strikeRate: 50.8, highestScore: '157', centuries: 10, fifties: 25, fours: 474, sixes: 10 },
        bowling: { matches: 56, innings: 32, overs: 198.3, wickets: 21, economy: 3.86, average: 30.23, bestBowlingInnings: '6/65', fiveWickets: 1 },
      },
      odi: {
        batting: { matches: 45, innings: 42, runs: 1324, average: 35.78, strikeRate: 68.74, highestScore: '107*', centuries: 1, fifties: 9 },
      },
    },
  },
  {
    id: 'peter-siddle',
    name: 'Peter Siddle',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1984-11-25',
    placeOfBirth: 'Traralgon, Victoria, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['BIRTHDAY TEST HAT-TRICK vs ENGLAND AT THE GABBA (2010)', '221 TEST WICKETS (8 FIVE-WICKET HAULS)', 'WORKHORSE HEART & VEGAN POWER'],
    stats: {
      test: {
        bowling: { matches: 67, innings: 126, overs: 2263.1, wickets: 221, economy: 2.94, average: 30.66, strikeRate: 61.4, bestBowlingInnings: '6/54', bestBowlingMatch: '9/104', fiveWickets: 8 },
        batting: { matches: 67, innings: 93, runs: 1164, average: 14.55, strikeRate: 40.2, highestScore: '51', centuries: 0, fifties: 2 },
      },
      odi: {
        bowling: { matches: 20, innings: 20, overs: 177.3, wickets: 17, economy: 4.87, average: 50.88, bestBowlingInnings: '3/55' },
      },
    },
  },
  {
    id: 'ryan-harris',
    name: 'Ryan Harris',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    dateOfBirth: '1979-10-11',
    placeOfBirth: 'Sydney, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['RYANO', 'BALL OF THE 21ST CENTURY (ALASTAIR COOK PERTH 1st BALL)', '113 TEST WICKETS AT SENSATIONAL 23.52 AVERAGE', '2013-14 5-0 ASHES SEAM MASTER (22 WKTS)'],
    stats: {
      test: {
        bowling: { matches: 27, innings: 52, overs: 981.4, wickets: 113, economy: 2.78, average: 23.52, strikeRate: 50.7, bestBowlingInnings: '7/117', bestBowlingMatch: '9/106', fiveWickets: 5 },
      },
      odi: {
        bowling: { matches: 21, innings: 21, overs: 182.2, wickets: 44, economy: 4.56, average: 18.9, strikeRate: 24.8, bestBowlingInnings: '5/19', fourWickets: 2, fiveWickets: 3 },
      },
    },
  },
  {
    id: 'matthew-wade',
    name: 'Matthew Wade',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'wicket-keeper',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1987-12-26',
    placeOfBirth: 'Hobart, Tasmania, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    isFallbackData: true,
    badges: ['2021 T20 WORLD CUP HERO (41* OFF 17 vs SHAHIN AFRIDI/PAK IN SEMI-FINAL)', '4 TEST CENTURIES (TWIN ASHES CENTURIES IN 2019)', 'AGGRESSIVE BULLDOG COMBATIVE SPIRIT'],
    stats: {
      test: {
        batting: { matches: 36, innings: 66, runs: 1613, average: 29.87, strikeRate: 53.8, highestScore: '117', centuries: 4, fifties: 5, fours: 191, sixes: 8 },
      },
      odi: {
        batting: { matches: 97, innings: 83, runs: 1867, average: 26.29, strikeRate: 82.5, highestScore: '100*', centuries: 1, fifties: 11 },
      },
      t20i: {
        batting: { matches: 92, innings: 68, runs: 1202, average: 26.13, strikeRate: 134.15, highestScore: '80', centuries: 0, fifties: 3, sixes: 45 },
      },
    },
  },
  {
    id: 'james-faulkner',
    name: 'James Faulkner',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Left-arm fast-medium',
    dateOfBirth: '1990-04-29',
    placeOfBirth: 'Launceston, Tasmania, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['2015 WORLD CUP FINAL PLAYER OF THE MATCH (3/36)', 'THE FINISHER (69* OFF 47 IN MIRACULOUS CHASE vs ENG AT BRISBANE)', '96 ODI WICKETS & HAT-TRICK vs SRI LANKA'],
    stats: {
      test: {
        batting: { matches: 1, innings: 2, runs: 45, average: 22.5, strikeRate: 60.0, highestScore: '23', centuries: 0, fifties: 0 },
        bowling: { matches: 1, innings: 2, overs: 26.0, wickets: 6, economy: 3.76, average: 16.33, bestBowlingInnings: '4/51' },
      },
      odi: {
        batting: { matches: 69, innings: 52, runs: 1032, average: 34.4, strikeRate: 104.24, highestScore: '116', centuries: 1, fifties: 4, sixes: 34 },
        bowling: { matches: 69, innings: 66, overs: 531.0, wickets: 96, economy: 5.52, average: 30.56, strikeRate: 33.1, bestBowlingInnings: '4/48', fourWickets: 3 },
      },
      t20i: {
        batting: { matches: 24, innings: 14, runs: 159, average: 14.45, strikeRate: 120.45, highestScore: '41*', centuries: 0, fifties: 0 },
        bowling: { matches: 24, innings: 24, overs: 73.1, wickets: 36, economy: 7.96, average: 19.0, strikeRate: 12.1, bestBowlingInnings: '5/27', fiveWickets: 1 },
      },
    },
  },
  {
    id: 'usman-khawaja',
    name: 'Usman Khawaja',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm medium / offbreak',
    dateOfBirth: '1986-12-18',
    placeOfBirth: 'Islamabad, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['ICC TEST CRICKETER OF THE YEAR 2023', '5,451 TEST RUNS AT 45.8 AVERAGE & 15 CENTURIES', '141 IN DUBAI vs PAKISTAN (MARATHON 524 MINUTES RESCUE)', '2023 WTC & WORLD CUP WINNER'],
    stats: {
      test: {
        batting: { matches: 73, innings: 133, runs: 5451, average: 45.8, strikeRate: 48.74, highestScore: '195*', centuries: 15, fifties: 26, fours: 602, sixes: 27 },
      },
      odi: {
        batting: { matches: 40, innings: 39, runs: 1554, average: 42.0, strikeRate: 84.45, highestScore: '104', centuries: 2, fifties: 12 },
      },
      t20i: {
        batting: { matches: 9, innings: 9, runs: 241, average: 26.77, strikeRate: 136.15, highestScore: '58', centuries: 0, fifties: 1 },
      },
    },
  },
  {
    id: 'cameron-green',
    name: 'Cameron Green',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'all-rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1999-06-03',
    placeOfBirth: 'Subiaco, Western Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['174* IN WELLINGTON (UNBEATEN HEROIC TEST TON)', '5/27 AT MCG vs SA (BOXING DAY 5-FER)', '2023 WTC & WORLD CUP WINNER', 'UNREAL GULLY CATCHING RADIUS'],
    stats: {
      test: {
        batting: { matches: 28, innings: 46, runs: 1377, average: 36.23, strikeRate: 48.5, highestScore: '174*', centuries: 2, fifties: 6, fours: 148, sixes: 10 },
        bowling: { matches: 28, innings: 43, overs: 488.2, wickets: 35, economy: 3.39, average: 35.31, strikeRate: 62.5, bestBowlingInnings: '5/27', fiveWickets: 1 },
      },
      odi: {
        batting: { matches: 26, innings: 21, runs: 494, average: 32.93, strikeRate: 89.81, highestScore: '89*', centuries: 0, fifties: 2 },
        bowling: { matches: 26, innings: 20, overs: 119.0, wickets: 16, economy: 5.37, average: 40.0, bestBowlingInnings: '5/33', fiveWickets: 1 },
      },
      t20i: {
        batting: { matches: 13, innings: 13, runs: 263, average: 26.3, strikeRate: 162.34, highestScore: '61', centuries: 0, fifties: 2, sixes: 14 },
        bowling: { matches: 13, innings: 8, overs: 22.0, wickets: 6, economy: 9.04, average: 33.16, bestBowlingInnings: '2/16' },
      },
    },
  },
  {
    id: 'scott-boland',
    name: 'Scott Boland',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: '1989-04-11',
    placeOfBirth: 'Mordialloc, Victoria, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isFallbackData: true,
    badges: ['6/7 AT THE MCG ON TEST DEBUT (MULLAGH MEDAL WINNER)', '35 TEST WICKETS AT UNBELIEVABLE 20.34 AVERAGE', '2023 WORLD TEST CHAMPIONSHIP WINNER (GILL & KOHLI DISMISSALS)'],
    stats: {
      test: {
        bowling: { matches: 10, innings: 19, overs: 301.2, wickets: 35, economy: 2.84, average: 20.34, strikeRate: 51.6, bestBowlingInnings: '6/7', fiveWickets: 1 },
      },
      odi: {
        bowling: { matches: 14, innings: 14, overs: 128.0, wickets: 16, economy: 4.88, average: 45.31, bestBowlingInnings: '3/67' },
      },
    },
  },
  {
    id: 'george-bailey',
    name: 'George Bailey',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    dateOfBirth: '1982-09-07',
    placeOfBirth: 'Launceston, Tasmania, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['2015 WORLD CUP WINNER', '478 RUNS AT 95.60 IN INDIA ODI SERIES (2013)', 'CAPTAINED AUSTRALIA ON T20I DEBUT', 'CHAIR OF CRICKET AUSTRALIA SELECTORS'],
    stats: {
      test: {
        batting: { matches: 5, innings: 8, runs: 183, average: 26.14, strikeRate: 59.8, highestScore: '53', centuries: 0, fifties: 1 },
      },
      odi: {
        batting: { matches: 90, innings: 85, runs: 3044, average: 40.58, strikeRate: 83.48, highestScore: '156', centuries: 3, fifties: 22, fours: 254, sixes: 56 },
      },
      t20i: {
        batting: { matches: 30, innings: 26, runs: 473, average: 26.27, strikeRate: 140.77, highestScore: '63', centuries: 0, fifties: 2 },
      },
    },
  },
  {
    id: 'shaun-marsh',
    name: 'Shaun Marsh',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Slow left-arm orthodox',
    dateOfBirth: '1983-07-09',
    placeOfBirth: 'Narigun, Western Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['SOS', '141 ON TEST DEBUT vs SRI LANKA IN PALLEKELE', '6 TEST & 7 ODI CENTURIES', 'INAUGURAL IPL ORANGE CAP WINNER 2008 (616 RUNS)'],
    stats: {
      test: {
        batting: { matches: 38, innings: 68, runs: 2265, average: 34.31, strikeRate: 46.2, highestScore: '182', centuries: 6, fifties: 10, fours: 279, sixes: 10 },
      },
      odi: {
        batting: { matches: 73, innings: 72, runs: 2773, average: 40.77, strikeRate: 81.42, highestScore: '151', centuries: 7, fifties: 15, sixes: 34 },
      },
      t20i: {
        batting: { matches: 15, innings: 15, runs: 255, average: 18.21, strikeRate: 102.82, highestScore: '47', centuries: 0, fifties: 0 },
      },
    },
  },
  {
    id: 'chris-rogers',
    name: 'Chris Rogers',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'batter',
    battingStyle: 'Left-hand bat',
    dateOfBirth: '1977-08-31',
    placeOfBirth: 'Sydney, New South Wales, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['BUCK', '2,015 TEST RUNS IN 25 TESTS AT 42.87', '5 TEST CENTURIES (MELBOURNE, SYDNEY, LORD’S ASHES HUNDREDS)', '25,470 FIRST-CLASS RUNS (76 HUNDREDS)'],
    stats: {
      test: {
        batting: { matches: 25, innings: 48, runs: 2015, average: 42.87, strikeRate: 51.52, highestScore: '173', centuries: 5, fifties: 14, fours: 258, sixes: 1 },
      },
    },
  },
  {
    id: 'ashton-agar',
    name: 'Ashton Agar',
    country: 'Australia',
    countryCode: 'AUS',
    role: 'all-rounder',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Slow left-arm orthodox',
    dateOfBirth: '1993-10-14',
    placeOfBirth: 'Melbourne, Victoria, Australia',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
    isFallbackData: true,
    badges: ['98 ON TEST DEBUT AT NO. 11 AT TRENT BRIDGE (WORLD RECORD)', '2021 T20 WORLD CUP WINNER', 'T20I HAT-TRICK vs SOUTH AFRICA (5/24)'],
    stats: {
      test: {
        batting: { matches: 5, innings: 9, runs: 195, average: 24.37, strikeRate: 63.31, highestScore: '98', centuries: 0, fifties: 1 },
        bowling: { matches: 5, innings: 9, overs: 147.2, wickets: 9, economy: 3.32, average: 54.33, bestBowlingInnings: '3/41' },
      },
      odi: {
        batting: { matches: 22, innings: 16, runs: 274, average: 22.83, strikeRate: 85.35, highestScore: '46', centuries: 0, fifties: 0 },
        bowling: { matches: 22, innings: 22, overs: 193.3, wickets: 21, economy: 5.34, average: 49.23, bestBowlingInnings: '2/31' },
      },
      t20i: {
        batting: { matches: 47, innings: 23, runs: 277, average: 15.38, strikeRate: 114.93, highestScore: '29', centuries: 0, fifties: 0 },
        bowling: { matches: 47, innings: 46, overs: 166.4, wickets: 48, economy: 6.5, average: 22.56, strikeRate: 20.8, bestBowlingInnings: '5/24', fiveWickets: 1 },
      },
    },
  },
];

console.log('Processed India & Australia records.');
