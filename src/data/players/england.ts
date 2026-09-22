import type { NormalizedPlayer } from '../../types/player';

export const ENGLAND_PLAYERS: NormalizedPlayer[] = [
  {
    "id": "ben-stokes",
    "name": "Ben Stokes",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1991-06-04",
    "placeOfBirth": "Christchurch, New Zealand",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    "isFallbackData": true,
    "badges": [
      "HEADINGLEY MIRACLE",
      "BAZBALL CAPTAIN",
      "CLUTCH GENIUS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 105,
          "innings": 189,
          "runs": 6508,
          "average": 35.75,
          "strikeRate": 59.25,
          "highestScore": "258",
          "centuries": 13,
          "fifties": 31,
          "fours": 785,
          "sixes": 131
        },
        "bowling": {
          "matches": 105,
          "innings": 150,
          "overs": 2011,
          "wickets": 203,
          "economy": 3.31,
          "average": 32.06,
          "strikeRate": 59.4,
          "bestBowlingInnings": "6/22",
          "bestBowlingMatch": "8/161",
          "fiveWickets": 4
        }
      },
      "odi": {
        "batting": {
          "matches": 114,
          "innings": 97,
          "runs": 3463,
          "average": 41.22,
          "strikeRate": 96.67,
          "highestScore": "182",
          "centuries": 5,
          "fifties": 24,
          "fours": 310,
          "sixes": 97
        },
        "bowling": {
          "matches": 114,
          "innings": 88,
          "overs": 574.1,
          "wickets": 74,
          "economy": 6.05,
          "average": 42.39,
          "strikeRate": 46.5,
          "bestBowlingInnings": "5/61",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "batting": {
          "matches": 43,
          "innings": 36,
          "runs": 585,
          "average": 21.66,
          "strikeRate": 128,
          "highestScore": "52*",
          "centuries": 0,
          "fifties": 1
        },
        "bowling": {
          "matches": 43,
          "innings": 31,
          "overs": 89.2,
          "wickets": 26,
          "economy": 8.39,
          "average": 32.92,
          "strikeRate": 20.6,
          "bestBowlingInnings": "3/26"
        }
      }
    }
  },
  {
    "id": "joe-root",
    "name": "Joe Root",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1990-12-30",
    "placeOfBirth": "Sheffield, Yorkshire, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "MOST TEST RUNS FOR ENGLAND",
      "34 TEST CENTURIES",
      "FAB 4 TITAN",
      "MASTER OF SWEEP"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 146,
          "innings": 267,
          "runs": 12402,
          "average": 50.62,
          "strikeRate": 56.78,
          "highestScore": "254",
          "centuries": 34,
          "fifties": 64,
          "fours": 1324,
          "sixes": 45
        },
        "bowling": {
          "matches": 146,
          "wickets": 70,
          "economy": 3.32,
          "average": 45.1,
          "bestBowlingInnings": "5/8",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 171,
          "innings": 160,
          "runs": 6522,
          "average": 47.6,
          "strikeRate": 86.79,
          "highestScore": "133*",
          "centuries": 16,
          "fifties": 39
        }
      },
      "t20i": {
        "batting": {
          "matches": 32,
          "innings": 30,
          "runs": 893,
          "average": 35.72,
          "strikeRate": 126.3,
          "highestScore": "90*",
          "centuries": 0,
          "fifties": 5
        }
      }
    }
  },
  {
    "id": "james-anderson",
    "name": "James Anderson",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1982-07-30",
    "placeOfBirth": "Burnley, Lancashire, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "JIMMY",
      "704 TEST WICKETS",
      "MOST SUCCESSFUL FAST BOWLER IN HISTORY",
      "KING OF SWING"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 188,
          "innings": 350,
          "overs": 7062.1,
          "wickets": 704,
          "economy": 2.79,
          "average": 26.45,
          "strikeRate": 56.9,
          "bestBowlingInnings": "7/42",
          "bestBowlingMatch": "11/71",
          "fiveWickets": 32,
          "tenWickets": 3
        }
      },
      "odi": {
        "bowling": {
          "matches": 194,
          "innings": 191,
          "overs": 1640.2,
          "wickets": 269,
          "economy": 4.92,
          "average": 29.22,
          "strikeRate": 36.5,
          "bestBowlingInnings": "5/23",
          "fiveWickets": 2
        }
      },
      "t20i": {
        "bowling": {
          "matches": 19,
          "innings": 19,
          "overs": 71.3,
          "wickets": 18,
          "economy": 7.84,
          "average": 30.66,
          "strikeRate": 23.8,
          "bestBowlingInnings": "3/23"
        }
      }
    }
  },
  {
    "id": "stuart-broad",
    "name": "Stuart Broad",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1986-06-24",
    "placeOfBirth": "Nottingham, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "604 TEST WICKETS",
      "8/15 TRENT BRIDGE (ASHES 2015)",
      "CELEBRAPPEAL",
      "FINAL BALL WICKET FAIRYTALE"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 167,
          "innings": 309,
          "overs": 5600.4,
          "wickets": 604,
          "economy": 2.97,
          "average": 27.68,
          "strikeRate": 55.7,
          "bestBowlingInnings": "8/15",
          "bestBowlingMatch": "11/121",
          "fiveWickets": 20,
          "tenWickets": 3
        },
        "batting": {
          "matches": 167,
          "innings": 244,
          "runs": 3662,
          "average": 18.03,
          "strikeRate": 63.8,
          "highestScore": "169",
          "centuries": 1,
          "fifties": 13
        }
      },
      "odi": {
        "bowling": {
          "matches": 121,
          "innings": 121,
          "overs": 1046.3,
          "wickets": 178,
          "economy": 5.26,
          "average": 30.13,
          "strikeRate": 35.2,
          "bestBowlingInnings": "5/23",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 56,
          "innings": 55,
          "overs": 189.2,
          "wickets": 65,
          "economy": 7.28,
          "average": 22.93,
          "strikeRate": 17.4,
          "bestBowlingInnings": "4/24"
        }
      }
    }
  },
  {
    "id": "alastair-cook",
    "name": "Sir Alastair Cook",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "dateOfBirth": "1984-12-25",
    "placeOfBirth": "Gloucester, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "12,472 TEST RUNS",
      "33 TEST CENTURIES",
      "159 CONSECUTIVE TESTS",
      "ASHES 2010/11 HERO (766 RUNS)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 161,
          "innings": 291,
          "runs": 12472,
          "average": 45.35,
          "strikeRate": 46.95,
          "highestScore": "294",
          "centuries": 33,
          "fifties": 57,
          "fours": 1442,
          "sixes": 11
        }
      },
      "odi": {
        "batting": {
          "matches": 92,
          "innings": 92,
          "runs": 3204,
          "average": 36.4,
          "strikeRate": 77.13,
          "highestScore": "137",
          "centuries": 5,
          "fifties": 19
        }
      }
    }
  },
  {
    "id": "ian-botham",
    "name": "Sir Ian Botham",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1955-11-24",
    "placeOfBirth": "Heswall, Cheshire, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "BOTHAM’S ASHES 1981",
      "5,200 RUNS & 383 WICKETS",
      "GREATEST ENGLISH ALL-ROUNDER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 102,
          "innings": 161,
          "runs": 5200,
          "average": 33.54,
          "strikeRate": 60.7,
          "highestScore": "208",
          "centuries": 14,
          "fifties": 22,
          "sixes": 67
        },
        "bowling": {
          "matches": 102,
          "innings": 168,
          "overs": 3645.5,
          "wickets": 383,
          "economy": 2.99,
          "average": 28.4,
          "strikeRate": 56.9,
          "bestBowlingInnings": "8/34",
          "bestBowlingMatch": "13/106",
          "fiveWickets": 27,
          "tenWickets": 4
        }
      },
      "odi": {
        "batting": {
          "matches": 116,
          "innings": 106,
          "runs": 2113,
          "average": 23.21,
          "strikeRate": 79.1,
          "highestScore": "79",
          "centuries": 0,
          "fifties": 9
        },
        "bowling": {
          "matches": 116,
          "innings": 115,
          "overs": 1007.2,
          "wickets": 145,
          "economy": 3.96,
          "average": 28.54,
          "strikeRate": 43.1,
          "bestBowlingInnings": "4/31"
        }
      }
    }
  },
  {
    "id": "kevin-pietersen",
    "name": "Kevin Pietersen",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1980-06-27",
    "placeOfBirth": "Pietermaritzburg, Natal, South Africa",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "SWITCH HIT PIONEER",
      "2010 T20 WC PLAYER OF TOURNAMENT",
      "158 THE OVAL 2005",
      "186 MUMBAI 2012"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 104,
          "innings": 181,
          "runs": 8181,
          "average": 47.28,
          "strikeRate": 61.72,
          "highestScore": "227",
          "centuries": 23,
          "fifties": 35,
          "fours": 996,
          "sixes": 81
        }
      },
      "odi": {
        "batting": {
          "matches": 136,
          "innings": 125,
          "runs": 4440,
          "average": 40.73,
          "strikeRate": 86.58,
          "highestScore": "130",
          "centuries": 9,
          "fifties": 25
        }
      },
      "t20i": {
        "batting": {
          "matches": 37,
          "innings": 36,
          "runs": 1176,
          "average": 37.93,
          "strikeRate": 141.51,
          "highestScore": "79",
          "centuries": 0,
          "fifties": 7
        }
      }
    }
  },
  {
    "id": "andrew-flintoff",
    "name": "Andrew Flintoff",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1977-12-06",
    "placeOfBirth": "Preston, Lancashire, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "FREDDIE",
      "2005 ASHES HERO (402 RUNS & 24 WKTS)",
      "ICONIC BRETT LEE CONSOLATION",
      "145 KPH WARRIOR"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 79,
          "innings": 130,
          "runs": 3845,
          "average": 31.77,
          "strikeRate": 62.04,
          "highestScore": "167",
          "centuries": 5,
          "fifties": 26
        },
        "bowling": {
          "matches": 79,
          "innings": 139,
          "overs": 2595.2,
          "wickets": 226,
          "economy": 2.84,
          "average": 32.78,
          "strikeRate": 66.1,
          "bestBowlingInnings": "5/58",
          "fiveWickets": 3
        }
      },
      "odi": {
        "batting": {
          "matches": 141,
          "innings": 122,
          "runs": 3394,
          "average": 32.01,
          "strikeRate": 88.82,
          "highestScore": "123",
          "centuries": 3,
          "fifties": 18
        },
        "bowling": {
          "matches": 141,
          "innings": 133,
          "overs": 1042.4,
          "wickets": 169,
          "economy": 4.39,
          "average": 24.38,
          "strikeRate": 33.2,
          "bestBowlingInnings": "5/19",
          "fiveWickets": 2
        }
      }
    }
  },
  {
    "id": "jos-buttler",
    "name": "Jos Buttler",
    "country": "England",
    "countryCode": "ENG",
    "role": "wicket-keeper",
    "battingStyle": "Right-hand bat",
    "dateOfBirth": "1990-09-08",
    "placeOfBirth": "Taunton, Somerset, England",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "badges": [
      "2022 T20 WC WINNING CAPTAIN",
      "FASTEST ENG ODI CENTURY (46 BALLS)",
      "WHITE-BALL PHENOMENON"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 57,
          "innings": 100,
          "runs": 2907,
          "average": 31.94,
          "strikeRate": 54.3,
          "highestScore": "152",
          "centuries": 2,
          "fifties": 18
        }
      },
      "odi": {
        "batting": {
          "matches": 181,
          "innings": 154,
          "runs": 5104,
          "average": 39.56,
          "strikeRate": 117.11,
          "highestScore": "162*",
          "centuries": 11,
          "fifties": 26,
          "fours": 449,
          "sixes": 170
        }
      },
      "t20i": {
        "batting": {
          "matches": 124,
          "innings": 113,
          "runs": 3264,
          "average": 35.86,
          "strikeRate": 146.3,
          "highestScore": "101*",
          "centuries": 1,
          "fifties": 24,
          "sixes": 137
        }
      }
    },
    "ipl2026Team": "GT",
    "ipl2026": {
      "team": "GT",
      "role": "Opening Wicket-Keeper Batter",
      "isKeyXI": true
    }
  },
  {
    "id": "jonny-bairstow",
    "name": "Jonny Bairstow",
    "country": "England",
    "countryCode": "ENG",
    "role": "wicket-keeper",
    "battingStyle": "Right-hand bat",
    "dateOfBirth": "1989-09-26",
    "placeOfBirth": "Bradford, Yorkshire, England",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "badges": [
      "YJB",
      "2019 WORLD CUP WINNER",
      "4 TEST TONS IN 2022 BAZBALL SUMMER",
      "6,000+ TEST RUNS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 100,
          "innings": 178,
          "runs": 6042,
          "average": 36.39,
          "strikeRate": 59.27,
          "highestScore": "167*",
          "centuries": 12,
          "fifties": 26
        }
      },
      "odi": {
        "batting": {
          "matches": 107,
          "innings": 99,
          "runs": 3868,
          "average": 42.97,
          "strikeRate": 102.76,
          "highestScore": "141*",
          "centuries": 11,
          "fifties": 17,
          "sixes": 92
        }
      },
      "t20i": {
        "batting": {
          "matches": 80,
          "innings": 73,
          "runs": 1671,
          "average": 29.83,
          "strikeRate": 137.98,
          "highestScore": "90",
          "centuries": 0,
          "fifties": 10
        }
      }
    }
  },
  {
    "id": "eoin-morgan",
    "name": "Eoin Morgan",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "dateOfBirth": "1986-09-10",
    "placeOfBirth": "Dublin, Ireland",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "2019 WORLD CUP WINNING CAPTAIN",
      "REVOLUTIONIZED ENGLISH WHITE-BALL CRICKET",
      "17 SIXES IN AN ODI (RECORD)",
      "7,701 ODI RUNS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 16,
          "innings": 24,
          "runs": 700,
          "average": 30.43,
          "strikeRate": 58.72,
          "highestScore": "130",
          "centuries": 2,
          "fifties": 3
        }
      },
      "odi": {
        "batting": {
          "matches": 248,
          "innings": 230,
          "runs": 7701,
          "average": 39.29,
          "strikeRate": 91.16,
          "highestScore": "148",
          "centuries": 14,
          "fifties": 47,
          "sixes": 220
        }
      },
      "t20i": {
        "batting": {
          "matches": 115,
          "innings": 107,
          "runs": 2458,
          "average": 28.58,
          "strikeRate": 136.17,
          "highestScore": "91",
          "centuries": 0,
          "fifties": 14,
          "sixes": 120
        }
      }
    }
  },
  {
    "id": "jofra-archer",
    "name": "Jofra Archer",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1995-04-01",
    "placeOfBirth": "Bridgetown, Barbados",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "SUPER OVER HERO 2019 WC",
      "153+ KPH CASUAL BOUNCER",
      "LORD’S DEBUT FRENZY"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 13,
          "innings": 24,
          "overs": 443.4,
          "wickets": 42,
          "economy": 3.01,
          "average": 31.04,
          "strikeRate": 63.3,
          "bestBowlingInnings": "6/62",
          "fiveWickets": 3
        }
      },
      "odi": {
        "bowling": {
          "matches": 21,
          "innings": 21,
          "overs": 198.3,
          "wickets": 42,
          "economy": 4.75,
          "average": 24.11,
          "strikeRate": 30.5,
          "bestBowlingInnings": "6/40",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 27,
          "innings": 27,
          "overs": 101.3,
          "wickets": 35,
          "economy": 7.39,
          "average": 21.42,
          "strikeRate": 17.4,
          "bestBowlingInnings": "4/33"
        }
      }
    },
    "ipl2026Team": "RR",
    "ipl2026": {
      "team": "RR",
      "role": "Fast Bowler",
      "isKeyXI": true
    }
  },
  {
    "id": "graham-gooch",
    "name": "Graham Gooch",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1953-07-23",
    "placeOfBirth": "Leytonstone, Essex, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "333 vs INDIA AT LORD’S (456 MATCH RUNS)",
      "8,900 TEST RUNS",
      "HEAVY BAT MASTER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 118,
          "innings": 215,
          "runs": 8900,
          "average": 42.58,
          "strikeRate": 49.3,
          "highestScore": "333",
          "centuries": 20,
          "fifties": 46
        }
      },
      "odi": {
        "batting": {
          "matches": 125,
          "innings": 122,
          "runs": 4290,
          "average": 36.98,
          "strikeRate": 61.88,
          "highestScore": "142",
          "centuries": 8,
          "fifties": 23
        }
      }
    }
  },
  {
    "id": "graeme-swann",
    "name": "Graeme Swann",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1979-03-24",
    "placeOfBirth": "Northampton, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "255 TEST WICKETS",
      "3X ASHES WINNER",
      "NO. 1 ODI BOWLER IN THE WORLD",
      "FLYING SAUCER OFFBREAK"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 60,
          "innings": 109,
          "overs": 2577.2,
          "wickets": 255,
          "economy": 2.98,
          "average": 29.96,
          "strikeRate": 60.1,
          "bestBowlingInnings": "6/65",
          "bestBowlingMatch": "10/132",
          "fiveWickets": 17,
          "tenWickets": 3
        }
      },
      "odi": {
        "bowling": {
          "matches": 79,
          "innings": 78,
          "overs": 686,
          "wickets": 104,
          "economy": 4.54,
          "average": 27.76,
          "strikeRate": 36.6,
          "bestBowlingInnings": "5/28",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 39,
          "innings": 38,
          "overs": 133,
          "wickets": 51,
          "economy": 6.36,
          "average": 16.82,
          "strikeRate": 15.6,
          "bestBowlingInnings": "3/13"
        }
      }
    }
  },
  {
    "id": "harry-brook",
    "name": "Harry Brook",
    "country": "England",
    "countryCode": "ENG",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1999-02-22",
    "placeOfBirth": "Keighley, Yorkshire, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "317 vs PAKISTAN (TEST TRIPLE TON)",
      "TEST STRIKE RATE 85+",
      "FASTEST TO 1,000 TEST RUNS (BALLS FACED)",
      "2022 T20 WC WINNER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 19,
          "innings": 31,
          "runs": 1875,
          "average": 62.5,
          "strikeRate": 88.45,
          "highestScore": "317",
          "centuries": 6,
          "fifties": 9,
          "fours": 215,
          "sixes": 34
        }
      },
      "odi": {
        "batting": {
          "matches": 20,
          "innings": 19,
          "runs": 719,
          "average": 42.29,
          "strikeRate": 102.13,
          "highestScore": "110",
          "centuries": 1,
          "fifties": 4
        }
      },
      "t20i": {
        "batting": {
          "matches": 39,
          "innings": 33,
          "runs": 704,
          "average": 29.33,
          "strikeRate": 145.45,
          "highestScore": "81*",
          "centuries": 0,
          "fifties": 3
        }
      }
    },
    "ipl2026Team": "DC",
    "ipl2026": {
      "team": "DC",
      "role": "Middle Order Batter",
      "isKeyXI": true
    }
  },
  {
    "id": "adil-rashid",
    "name": "Adil Rashid",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak googly",
    "dateOfBirth": "1988-02-17",
    "placeOfBirth": "Bradford, Yorkshire, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "2X WORLD CUP WINNER (2019 ODI, 2022 T20)",
      "200+ ODI WICKETS",
      "NO. 1 T20I SPINNER",
      "BALL TO DISMISS KL RAHUL AT SCG"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 19,
          "innings": 34,
          "overs": 666.1,
          "wickets": 60,
          "economy": 3.75,
          "average": 39.83,
          "strikeRate": 63.6,
          "bestBowlingInnings": "5/49",
          "fiveWickets": 2
        }
      },
      "odi": {
        "bowling": {
          "matches": 135,
          "innings": 130,
          "overs": 1145.2,
          "wickets": 199,
          "economy": 5.67,
          "average": 32.32,
          "strikeRate": 34.5,
          "bestBowlingInnings": "5/27",
          "fiveWickets": 2
        }
      },
      "t20i": {
        "bowling": {
          "matches": 114,
          "innings": 108,
          "overs": 400.1,
          "wickets": 122,
          "economy": 7.38,
          "average": 24.23,
          "strikeRate": 19.6,
          "bestBowlingInnings": "4/2"
        }
      }
    }
  },
  {
    "id": "chris-woakes",
    "name": "Chris Woakes",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1989-03-02",
    "placeOfBirth": "Birmingham, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "2019 WC FINAL 3/37",
      "2023 ASHES PLAYER OF THE SERIES",
      "LORD’S CENTURION & 5-FER HERO",
      "WIZARD UNDER ENGLISH CLOUDS"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 55,
          "innings": 99,
          "overs": 1698.4,
          "wickets": 173,
          "economy": 3.03,
          "average": 29.83,
          "strikeRate": 58.9,
          "bestBowlingInnings": "6/17",
          "fiveWickets": 5
        },
        "batting": {
          "matches": 55,
          "innings": 84,
          "runs": 1904,
          "average": 26.81,
          "strikeRate": 53.6,
          "highestScore": "137*",
          "centuries": 1,
          "fifties": 7
        }
      },
      "odi": {
        "bowling": {
          "matches": 122,
          "innings": 119,
          "overs": 987.2,
          "wickets": 173,
          "economy": 5.49,
          "average": 30.54,
          "strikeRate": 34.2,
          "bestBowlingInnings": "6/45",
          "fiveWickets": 3
        },
        "batting": {
          "matches": 122,
          "innings": 84,
          "runs": 1512,
          "average": 23.62,
          "strikeRate": 88.52,
          "highestScore": "95*",
          "centuries": 0,
          "fifties": 6
        }
      },
      "t20i": {
        "bowling": {
          "matches": 33,
          "innings": 33,
          "overs": 112.4,
          "wickets": 31,
          "economy": 8.04,
          "average": 29.29,
          "strikeRate": 21.8,
          "bestBowlingInnings": "3/4"
        }
      }
    }
  },
  {
    "id": "mark-wood",
    "name": "Mark Wood",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1990-01-11",
    "placeOfBirth": "Ashington, Northumberland, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "156.4 KPH THUNDERBOLTS",
      "2X WORLD CUP WINNER",
      "HEADINGLEY 2023 HERO (5/34 & 24 OFF 8 BALLS)"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 37,
          "innings": 66,
          "overs": 1045.2,
          "wickets": 119,
          "economy": 3.52,
          "average": 29.89,
          "strikeRate": 52.7,
          "bestBowlingInnings": "6/37",
          "fiveWickets": 4
        }
      },
      "odi": {
        "bowling": {
          "matches": 66,
          "innings": 65,
          "overs": 549.4,
          "wickets": 77,
          "economy": 5.54,
          "average": 39.58,
          "strikeRate": 42.8,
          "bestBowlingInnings": "4/33"
        }
      },
      "t20i": {
        "bowling": {
          "matches": 34,
          "innings": 34,
          "overs": 123.3,
          "wickets": 50,
          "economy": 8.16,
          "average": 20.18,
          "strikeRate": 14.8,
          "bestBowlingInnings": "3/9"
        }
      }
    }
  },
  {
    "id": "sam-curran",
    "name": "Sam Curran",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm medium-fast",
    "dateOfBirth": "1998-06-03",
    "placeOfBirth": "Northampton, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "CSK",
    "ipl2026": {
      "team": "CSK",
      "role": "Left-Arm Seam All-Rounder",
      "isKeyXI": true,
      "auctionPrice": "₹2.4 Cr"
    },
    "badges": [
      "2022 T20 WORLD CUP PLAYER OF THE TOURNAMENT & FINAL POM (3/12)",
      "CSK IPL CHAMPION 2021",
      "CLUTCH ALL-ROUND PERFORMER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 24,
          "innings": 38,
          "runs": 815,
          "average": 24.69,
          "strikeRate": 59.8,
          "highestScore": "78",
          "centuries": 0,
          "fifties": 3
        },
        "bowling": {
          "matches": 24,
          "innings": 41,
          "overs": 635.1,
          "wickets": 47,
          "economy": 3.39,
          "average": 35.51,
          "strikeRate": 62.7,
          "bestBowlingInnings": "4/58"
        }
      },
      "odi": {
        "batting": {
          "matches": 32,
          "innings": 25,
          "runs": 423,
          "average": 22.26,
          "strikeRate": 94.63,
          "highestScore": "95*",
          "centuries": 0,
          "fifties": 1
        },
        "bowling": {
          "matches": 32,
          "innings": 30,
          "overs": 202.4,
          "wickets": 33,
          "economy": 5.86,
          "average": 36.03,
          "strikeRate": 36.8,
          "bestBowlingInnings": "5/48",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "batting": {
          "matches": 58,
          "innings": 38,
          "runs": 382,
          "average": 15.28,
          "strikeRate": 130.82,
          "highestScore": "50",
          "centuries": 0,
          "fifties": 1
        },
        "bowling": {
          "matches": 58,
          "innings": 56,
          "overs": 175.4,
          "wickets": 54,
          "economy": 8.24,
          "average": 26.83,
          "strikeRate": 19.5,
          "bestBowlingInnings": "5/10",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "phil-salt",
    "name": "Phil Salt",
    "country": "England",
    "countryCode": "ENG",
    "role": "wicket-keeper",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1996-08-28",
    "placeOfBirth": "Bodelwyddan, Denbighshire, Wales",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "ipl2026Team": "RCB",
    "ipl2026": {
      "team": "RCB",
      "role": "Explosive Opening Wicket-Keeper Batter",
      "isKeyXI": true,
      "auctionPrice": "₹11.5 Cr"
    },
    "badges": [
      "2022 T20 WORLD CUP WINNER",
      "435 RUNS AT 182.00 SR IN KKR 2024 TITLE VICTORY",
      "BACK-TO-BACK T20I HUNDREDS vs WEST INDIES (109* & 119)"
    ],
    "stats": {
      "odi": {
        "batting": {
          "matches": 26,
          "innings": 26,
          "runs": 850,
          "average": 34,
          "strikeRate": 125.18,
          "highestScore": "122",
          "centuries": 1,
          "fifties": 5,
          "sixes": 30
        }
      },
      "t20i": {
        "batting": {
          "matches": 38,
          "innings": 37,
          "runs": 1114,
          "average": 35.93,
          "strikeRate": 165.77,
          "highestScore": "119",
          "centuries": 3,
          "fifties": 4,
          "fours": 110,
          "sixes": 61
        }
      }
    }
  },
  {
    "id": "liam-livingstone",
    "name": "Liam Livingstone",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak / offbreak",
    "dateOfBirth": "1993-08-04",
    "placeOfBirth": "Barrow-in-Furness, Cumbria, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "RCB",
    "ipl2026": {
      "team": "RCB",
      "role": "Middle Order Monster Six-Hitter & Dual Spinner",
      "isKeyXI": true,
      "auctionPrice": "₹8 Cr"
    },
    "badges": [
      "2022 T20 WORLD CUP WINNER",
      "FASTEST T20I CENTURY BY AN ENGLISHMAN (42 BALLS vs PAK)",
      "117-METRE MONSTER SIX RECORD"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 1,
          "innings": 1,
          "runs": 9,
          "average": 9,
          "strikeRate": 90,
          "highestScore": "9",
          "centuries": 0,
          "fifties": 0
        }
      },
      "odi": {
        "batting": {
          "matches": 33,
          "innings": 29,
          "runs": 846,
          "average": 35.25,
          "strikeRate": 111.46,
          "highestScore": "124*",
          "centuries": 2,
          "fifties": 4,
          "sixes": 45
        },
        "bowling": {
          "matches": 33,
          "innings": 23,
          "overs": 119,
          "wickets": 19,
          "economy": 5.86,
          "average": 36.73,
          "bestBowlingInnings": "3/16"
        }
      },
      "t20i": {
        "batting": {
          "matches": 53,
          "innings": 47,
          "runs": 900,
          "average": 23.68,
          "strikeRate": 147.29,
          "highestScore": "103",
          "centuries": 1,
          "fifties": 2,
          "sixes": 55
        },
        "bowling": {
          "matches": 53,
          "innings": 38,
          "overs": 98.4,
          "wickets": 26,
          "economy": 7.85,
          "average": 29.8,
          "bestBowlingInnings": "3/17"
        }
      }
    }
  },
  {
    "id": "will-jacks",
    "name": "Will Jacks",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1998-11-21",
    "placeOfBirth": "Chertsey, Surrey, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "MI",
    "ipl2026": {
      "team": "MI",
      "role": "Top-Order Blaster & Off-Spinner",
      "isKeyXI": true,
      "auctionPrice": "₹5.25 Cr"
    },
    "badges": [
      "41-BALL IPL CENTURY (100* vs GT IN 2024)",
      "6 SIXES IN AN OVER IN PRE-SEASON T10",
      "ENGLAND MULTI-FORMAT STAR"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 2,
          "innings": 4,
          "runs": 89,
          "average": 22.25,
          "strikeRate": 70.07,
          "highestScore": "31",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 2,
          "innings": 4,
          "overs": 63.3,
          "wickets": 6,
          "economy": 4.88,
          "average": 51.66,
          "bestBowlingInnings": "6/161",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 15,
          "innings": 13,
          "runs": 377,
          "average": 29,
          "strikeRate": 98.95,
          "highestScore": "94",
          "centuries": 0,
          "fifties": 3
        },
        "bowling": {
          "matches": 15,
          "innings": 6,
          "overs": 29,
          "wickets": 5,
          "economy": 5.65,
          "average": 32.8,
          "bestBowlingInnings": "3/18"
        }
      },
      "t20i": {
        "batting": {
          "matches": 20,
          "innings": 18,
          "runs": 288,
          "average": 17,
          "strikeRate": 147.69,
          "highestScore": "40",
          "centuries": 0,
          "fifties": 0,
          "sixes": 14
        },
        "bowling": {
          "matches": 20,
          "innings": 5,
          "overs": 10,
          "wickets": 1,
          "economy": 8.8,
          "average": 88,
          "bestBowlingInnings": "1/23"
        }
      }
    }
  },
  {
    "id": "moeen-ali",
    "name": "Moeen Ali",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1987-06-18",
    "placeOfBirth": "Birmingham, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "KKR",
    "ipl2026": {
      "team": "KKR",
      "role": "Spin Bowling All-Rounder & Floating Batter",
      "isKeyXI": true,
      "auctionPrice": "₹2 Cr"
    },
    "badges": [
      "2X WORLD CUP WINNER (2019 ODI, 2022 T20)",
      "2X IPL CHAMPION WITH CSK (2021, 2023)",
      "3,000+ TEST RUNS & 204 TEST WICKETS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 68,
          "innings": 122,
          "runs": 3094,
          "average": 28.12,
          "strikeRate": 53.05,
          "highestScore": "155*",
          "centuries": 5,
          "fifties": 15
        },
        "bowling": {
          "matches": 68,
          "innings": 119,
          "overs": 2276.5,
          "wickets": 204,
          "economy": 3.65,
          "average": 37.31,
          "strikeRate": 66.9,
          "bestBowlingInnings": "6/53",
          "bestBowlingMatch": "10/112",
          "fiveWickets": 5,
          "tenWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 138,
          "innings": 114,
          "runs": 2355,
          "average": 25.05,
          "strikeRate": 98.7,
          "highestScore": "128",
          "centuries": 3,
          "fifties": 6
        },
        "bowling": {
          "matches": 138,
          "innings": 124,
          "overs": 981.2,
          "wickets": 111,
          "economy": 5.25,
          "average": 46.46,
          "strikeRate": 53,
          "bestBowlingInnings": "4/46"
        }
      },
      "t20i": {
        "batting": {
          "matches": 92,
          "innings": 76,
          "runs": 1229,
          "average": 21.56,
          "strikeRate": 142.41,
          "highestScore": "72",
          "centuries": 0,
          "fifties": 7,
          "sixes": 56
        },
        "bowling": {
          "matches": 92,
          "innings": 69,
          "overs": 167.3,
          "wickets": 51,
          "economy": 8.19,
          "average": 26.9,
          "strikeRate": 19.7,
          "bestBowlingInnings": "3/24"
        }
      }
    }
  },
  {
    "id": "jacob-bethell",
    "name": "Jacob Bethell",
    "country": "England",
    "countryCode": "ENG",
    "role": "all-rounder",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "dateOfBirth": "2003-10-23",
    "placeOfBirth": "Bridgetown, Barbados",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "RCB",
    "ipl2026": {
      "team": "RCB",
      "role": "Rising Spin Bowling All-Rounder",
      "isKeyXI": false,
      "isImpactCandidate": true,
      "auctionPrice": "₹2.6 Cr"
    },
    "badges": [
      "TEST DEBUT 50* IN NEW ZEALAND 2024",
      "UNDER-19 WORLD CUP HERO (88 vs AFG SEMI-FINAL)",
      "FLUID 360° STRIKE WEAPON"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 3,
          "innings": 5,
          "runs": 262,
          "average": 65.5,
          "strikeRate": 67.52,
          "highestScore": "96",
          "centuries": 0,
          "fifties": 3
        }
      },
      "odi": {
        "batting": {
          "matches": 5,
          "innings": 4,
          "runs": 88,
          "average": 22,
          "strikeRate": 88,
          "highestScore": "35",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 5,
          "innings": 5,
          "overs": 22,
          "wickets": 3,
          "economy": 5.72,
          "average": 42,
          "bestBowlingInnings": "1/33"
        }
      },
      "t20i": {
        "batting": {
          "matches": 7,
          "innings": 6,
          "runs": 172,
          "average": 34.4,
          "strikeRate": 156.36,
          "highestScore": "62*",
          "centuries": 0,
          "fifties": 2
        }
      }
    }
  },
  {
    "id": "reece-topley",
    "name": "Reece Topley",
    "country": "England",
    "countryCode": "ENG",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast-medium",
    "dateOfBirth": "1994-02-21",
    "placeOfBirth": "Ipswich, Suffolk, England",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "ipl2026Team": "MI",
    "ipl2026": {
      "team": "MI",
      "role": "6ft 7in Left-Arm Powerplay Pacer",
      "isKeyXI": false,
      "isImpactCandidate": true,
      "auctionPrice": "₹75 Lakh"
    },
    "badges": [
      "6/24 AT LORD’S vs INDIA (BEST ODI BOWLING FOR ENGLAND)",
      "2022 T20 WORLD CUP SQUAD",
      "STEEP TOWERING BOUNCE & SHARP SWING"
    ],
    "stats": {
      "odi": {
        "bowling": {
          "matches": 30,
          "innings": 30,
          "overs": 236.4,
          "wickets": 46,
          "economy": 5.25,
          "average": 27.02,
          "strikeRate": 30.8,
          "bestBowlingInnings": "6/24",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 35,
          "innings": 35,
          "overs": 126.1,
          "wickets": 38,
          "economy": 8.03,
          "average": 26.65,
          "strikeRate": 19.9,
          "bestBowlingInnings": "3/22"
        }
      }
    }
  }
];
