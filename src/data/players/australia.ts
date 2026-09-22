import type { NormalizedPlayer } from '../../types/player';

export const AUSTRALIA_PLAYERS: NormalizedPlayer[] = [
  {
    "id": "steve-smith",
    "name": "Steve Smith",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "1989-06-02",
    "placeOfBirth": "Sydney, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
    "isFallbackData": true,
    "badges": [
      "ASHES COLOSSUS",
      "UNORTHODOX MASTERY",
      "TEST AVERAGER 57+"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 109,
          "innings": 195,
          "runs": 9685,
          "average": 56.97,
          "strikeRate": 53.54,
          "highestScore": "239",
          "centuries": 32,
          "fifties": 41,
          "fours": 1039,
          "sixes": 54
        }
      },
      "odi": {
        "batting": {
          "matches": 158,
          "innings": 142,
          "runs": 5446,
          "average": 43.91,
          "strikeRate": 87.32,
          "highestScore": "164",
          "centuries": 12,
          "fifties": 33,
          "fours": 512,
          "sixes": 56
        }
      },
      "t20i": {
        "batting": {
          "matches": 67,
          "innings": 55,
          "runs": 1094,
          "average": 24.86,
          "strikeRate": 125.45,
          "highestScore": "90",
          "centuries": 0,
          "fifties": 5,
          "fours": 98,
          "sixes": 29
        }
      }
    }
  },
  {
    "id": "pat-cummins",
    "name": "Pat Cummins",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1993-05-08",
    "placeOfBirth": "Westmead, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "isFallbackData": true,
    "badges": [
      "WORLD CUP WINNING SKIPPER",
      "PRECISION SEAM",
      "ICC CRICKETER OF THE YEAR"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 62,
          "innings": 116,
          "overs": 2154.5,
          "wickets": 269,
          "economy": 2.76,
          "average": 22.53,
          "strikeRate": 48,
          "bestBowlingInnings": "6/23",
          "bestBowlingMatch": "10/62",
          "fiveWickets": 12
        },
        "batting": {
          "matches": 62,
          "innings": 91,
          "runs": 1295,
          "average": 16.6,
          "strikeRate": 48.2,
          "highestScore": "64*",
          "centuries": 0,
          "fifties": 3
        }
      },
      "odi": {
        "bowling": {
          "matches": 88,
          "innings": 88,
          "overs": 768.1,
          "wickets": 141,
          "economy": 5.22,
          "average": 28.46,
          "strikeRate": 32.6,
          "bestBowlingInnings": "5/70",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 52,
          "innings": 52,
          "overs": 191.4,
          "wickets": 66,
          "economy": 7.43,
          "average": 21.57,
          "strikeRate": 17.4,
          "bestBowlingInnings": "3/15"
        }
      }
    },
    "ipl2026Team": "SRH",
    "ipl2026": {
      "team": "SRH",
      "role": "Captain / Fast Bowling All-Rounder",
      "isKeyXI": true
    }
  },
  {
    "id": "don-bradman",
    "name": "Sir Donald Bradman",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "1908-08-27",
    "placeOfBirth": "Cootamundra, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "THE DON",
      "99.94 TEST AVERAGE",
      "29 CENTURIES IN 52 TESTS",
      "GREATEST BATSMAN EVER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 52,
          "innings": 80,
          "runs": 6996,
          "average": 99.94,
          "strikeRate": 71.4,
          "highestScore": "334",
          "centuries": 29,
          "fifties": 13,
          "fours": 618,
          "sixes": 6
        },
        "bowling": {
          "matches": 52,
          "wickets": 2,
          "economy": 3.55,
          "average": 36,
          "bestBowlingInnings": "1/8"
        }
      }
    }
  },
  {
    "id": "ricky-ponting",
    "name": "Ricky Ponting",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1974-12-19",
    "placeOfBirth": "Launceston, Tasmania, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "PUNTER",
      "2X UNDEFEATED WC CAPTAIN (2003, 2007)",
      "71 INT CENTURIES",
      "MASTER PULLER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 168,
          "innings": 287,
          "runs": 13378,
          "average": 51.85,
          "strikeRate": 58.72,
          "highestScore": "257",
          "centuries": 41,
          "fifties": 62,
          "fours": 1509,
          "sixes": 73
        }
      },
      "odi": {
        "batting": {
          "matches": 375,
          "innings": 365,
          "runs": 13704,
          "average": 42.03,
          "strikeRate": 80.39,
          "highestScore": "164",
          "centuries": 30,
          "fifties": 82,
          "fours": 1231,
          "sixes": 162
        }
      },
      "t20i": {
        "batting": {
          "matches": 17,
          "innings": 16,
          "runs": 401,
          "average": 28.64,
          "strikeRate": 132.78,
          "highestScore": "98*",
          "centuries": 0,
          "fifties": 2
        }
      }
    }
  },
  {
    "id": "shane-warne",
    "name": "Shane Warne",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "1969-09-13",
    "placeOfBirth": "Upper Ferntree Gully, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "BALL OF THE CENTURY",
      "708 TEST WICKETS",
      "KING OF SPIN",
      "WISDEN CRICKETER OF CENTURY"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 145,
          "innings": 273,
          "overs": 6784.1,
          "wickets": 708,
          "economy": 2.78,
          "average": 25.41,
          "strikeRate": 57.4,
          "bestBowlingInnings": "8/71",
          "bestBowlingMatch": "12/128",
          "fiveWickets": 37,
          "tenWickets": 10
        },
        "batting": {
          "matches": 145,
          "innings": 199,
          "runs": 3154,
          "average": 17.32,
          "strikeRate": 57.6,
          "highestScore": "99",
          "centuries": 0,
          "fifties": 12
        }
      },
      "odi": {
        "bowling": {
          "matches": 194,
          "innings": 191,
          "overs": 1773.4,
          "wickets": 293,
          "economy": 4.25,
          "average": 25.73,
          "strikeRate": 36.3,
          "bestBowlingInnings": "5/33",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "glenn-mcgrath",
    "name": "Glenn McGrath",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1970-02-09",
    "placeOfBirth": "Dubbo, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "PIGEON",
      "563 TEST WICKETS",
      "METRONOMIC ACCURACY",
      "3X WORLD CUP WINNER"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 124,
          "innings": 243,
          "overs": 4872.4,
          "wickets": 563,
          "economy": 2.49,
          "average": 21.64,
          "strikeRate": 51.9,
          "bestBowlingInnings": "8/24",
          "bestBowlingMatch": "10/27",
          "fiveWickets": 29,
          "tenWickets": 3
        }
      },
      "odi": {
        "bowling": {
          "matches": 250,
          "innings": 248,
          "overs": 2161.4,
          "wickets": 381,
          "economy": 3.88,
          "average": 22.02,
          "strikeRate": 34,
          "bestBowlingInnings": "7/15",
          "fiveWickets": 7
        }
      },
      "t20i": {
        "bowling": {
          "matches": 2,
          "innings": 2,
          "overs": 8,
          "wickets": 5,
          "economy": 7.25,
          "average": 11.6,
          "strikeRate": 9.6,
          "bestBowlingInnings": "3/31"
        }
      }
    }
  },
  {
    "id": "adam-gilchrist",
    "name": "Adam Gilchrist",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "wicket-keeper",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1971-11-14",
    "placeOfBirth": "Bellingen, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "badges": [
      "GILLY",
      "3X WORLD CUP WINNER",
      "149 IN 2007 WC FINAL (SQUASH BALL)",
      "TEST SR 81.9"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 96,
          "innings": 137,
          "runs": 5570,
          "average": 47.6,
          "strikeRate": 81.95,
          "highestScore": "204*",
          "centuries": 17,
          "fifties": 26,
          "fours": 677,
          "sixes": 100
        }
      },
      "odi": {
        "batting": {
          "matches": 287,
          "innings": 279,
          "runs": 9619,
          "average": 35.89,
          "strikeRate": 96.94,
          "highestScore": "172",
          "centuries": 16,
          "fifties": 55,
          "fours": 1162,
          "sixes": 149
        }
      },
      "t20i": {
        "batting": {
          "matches": 13,
          "innings": 13,
          "runs": 272,
          "average": 22.66,
          "strikeRate": 141.66,
          "highestScore": "48",
          "centuries": 0,
          "fifties": 0
        }
      }
    }
  },
  {
    "id": "david-warner",
    "name": "David Warner",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "1986-10-27",
    "placeOfBirth": "Paddington, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "THE BULL",
      "335* ADELAIDE OVAL",
      "49 INT CENTURIES",
      "2X ODI WC + 1X T20 WC WINNER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 112,
          "innings": 205,
          "runs": 8786,
          "average": 44.59,
          "strikeRate": 70.19,
          "highestScore": "335*",
          "centuries": 26,
          "fifties": 37,
          "fours": 1036,
          "sixes": 69
        }
      },
      "odi": {
        "batting": {
          "matches": 161,
          "innings": 159,
          "runs": 6932,
          "average": 45.3,
          "strikeRate": 97.26,
          "highestScore": "179",
          "centuries": 22,
          "fifties": 33,
          "fours": 733,
          "sixes": 102
        }
      },
      "t20i": {
        "batting": {
          "matches": 110,
          "innings": 110,
          "runs": 3277,
          "average": 33.43,
          "strikeRate": 142.47,
          "highestScore": "100*",
          "centuries": 1,
          "fifties": 28,
          "fours": 347,
          "sixes": 122
        }
      }
    }
  },
  {
    "id": "mitchell-starc",
    "name": "Mitchell Starc",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "dateOfBirth": "1990-01-30",
    "placeOfBirth": "Baulkham Hills, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "160.4 KPH THUNDERBOLT",
      "2X WC PLAYER OF TOURNAMENT CONTENDER",
      "PINK BALL MONSTER"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 89,
          "innings": 171,
          "overs": 3073.4,
          "wickets": 358,
          "economy": 3.42,
          "average": 27.74,
          "strikeRate": 48.6,
          "bestBowlingInnings": "6/50",
          "bestBowlingMatch": "11/94",
          "fiveWickets": 14,
          "tenWickets": 2
        }
      },
      "odi": {
        "bowling": {
          "matches": 121,
          "innings": 121,
          "overs": 1025.3,
          "wickets": 236,
          "economy": 5.15,
          "average": 22.96,
          "strikeRate": 26,
          "bestBowlingInnings": "6/28",
          "fiveWickets": 9
        }
      },
      "t20i": {
        "bowling": {
          "matches": 65,
          "innings": 65,
          "overs": 243.2,
          "wickets": 79,
          "economy": 7.74,
          "average": 23.82,
          "strikeRate": 18.4,
          "bestBowlingInnings": "4/20"
        }
      }
    },
    "ipl2026Team": "DC",
    "ipl2026": {
      "team": "DC",
      "role": "Left-Arm Fast Bowler",
      "isKeyXI": true
    }
  },
  {
    "id": "josh-hazlewood",
    "name": "Josh Hazlewood",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1991-01-08",
    "placeOfBirth": "Tamworth, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "THE BENDIGO MCGRATH",
      "TEST SEAM LINE MASTER",
      "T20 WC WINNING WEAPON"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 70,
          "innings": 133,
          "overs": 2471.1,
          "wickets": 273,
          "economy": 2.76,
          "average": 24.81,
          "strikeRate": 54.3,
          "bestBowlingInnings": "6/67",
          "fiveWickets": 12
        }
      },
      "odi": {
        "bowling": {
          "matches": 88,
          "innings": 87,
          "overs": 775.2,
          "wickets": 132,
          "economy": 4.63,
          "average": 27.24,
          "strikeRate": 35.2,
          "bestBowlingInnings": "6/52",
          "fiveWickets": 3
        }
      },
      "t20i": {
        "bowling": {
          "matches": 48,
          "innings": 48,
          "overs": 182.4,
          "wickets": 64,
          "economy": 7.22,
          "average": 20.64,
          "strikeRate": 17.1,
          "bestBowlingInnings": "4/12"
        }
      }
    },
    "ipl2026Team": "RCB",
    "ipl2026": {
      "team": "RCB",
      "role": "Fast Bowler",
      "isKeyXI": true
    }
  },
  {
    "id": "nathan-lyon",
    "name": "Nathan Lyon",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1987-11-20",
    "placeOfBirth": "Young, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "GARRY",
      "530+ TEST WICKETS",
      "CURATOR TO LEGEND",
      "OFF-SPIN OVERSPIN BOUNCE"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 129,
          "innings": 242,
          "overs": 5635.4,
          "wickets": 530,
          "economy": 2.81,
          "average": 30.28,
          "strikeRate": 63.7,
          "bestBowlingInnings": "8/50",
          "bestBowlingMatch": "13/154",
          "fiveWickets": 24,
          "tenWickets": 4
        }
      },
      "odi": {
        "bowling": {
          "matches": 29,
          "innings": 29,
          "overs": 254,
          "wickets": 29,
          "economy": 4.92,
          "average": 43.1,
          "strikeRate": 52.5,
          "bestBowlingInnings": "4/44"
        }
      }
    }
  },
  {
    "id": "matthew-hayden",
    "name": "Matthew Hayden",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1971-10-29",
    "placeOfBirth": "Kingaroy, Queensland, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "HAYDOS",
      "380 vs ZIMBABWE (RECORD HOLDER)",
      "30 TEST HUNDREDS",
      "BRUTAL POWER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 103,
          "innings": 184,
          "runs": 8625,
          "average": 50.73,
          "strikeRate": 60.11,
          "highestScore": "380",
          "centuries": 30,
          "fifties": 29,
          "fours": 1049,
          "sixes": 82
        }
      },
      "odi": {
        "batting": {
          "matches": 161,
          "innings": 155,
          "runs": 6133,
          "average": 43.8,
          "strikeRate": 78.96,
          "highestScore": "181*",
          "centuries": 10,
          "fifties": 36,
          "sixes": 87
        }
      },
      "t20i": {
        "batting": {
          "matches": 9,
          "innings": 9,
          "runs": 288,
          "average": 57.6,
          "strikeRate": 144,
          "highestScore": "73*",
          "centuries": 0,
          "fifties": 3
        }
      }
    }
  },
  {
    "id": "brett-lee",
    "name": "Brett Lee",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1976-11-08",
    "placeOfBirth": "Wollongong, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "BINGA",
      "161.1 KPH LIGHTNING",
      "310 TEST WKTS & 380 ODI WKTS",
      "CHAINSAW CELEBRATION"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 76,
          "innings": 150,
          "overs": 2755.2,
          "wickets": 310,
          "economy": 3.46,
          "average": 30.81,
          "strikeRate": 53.3,
          "bestBowlingInnings": "5/30",
          "fiveWickets": 10
        }
      },
      "odi": {
        "bowling": {
          "matches": 221,
          "innings": 217,
          "overs": 1851.3,
          "wickets": 380,
          "economy": 4.76,
          "average": 23.36,
          "strikeRate": 29.2,
          "bestBowlingInnings": "5/22",
          "fiveWickets": 9
        }
      },
      "t20i": {
        "bowling": {
          "matches": 25,
          "innings": 25,
          "overs": 92.4,
          "wickets": 28,
          "economy": 7.86,
          "average": 25.5,
          "strikeRate": 19.8,
          "bestBowlingInnings": "3/23"
        }
      }
    }
  },
  {
    "id": "michael-hussey",
    "name": "Michael Hussey",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1975-05-27",
    "placeOfBirth": "Morley, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "MR CRICKET",
      "60+ TEST AVERAGE AT PEAK",
      "2010 T20 WC SEMI-FINAL HERO",
      "CLUTCH BRAIN"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 79,
          "innings": 137,
          "runs": 6235,
          "average": 51.52,
          "strikeRate": 54.09,
          "highestScore": "195",
          "centuries": 19,
          "fifties": 29
        }
      },
      "odi": {
        "batting": {
          "matches": 185,
          "innings": 157,
          "runs": 5442,
          "average": 48.15,
          "strikeRate": 87.16,
          "highestScore": "109*",
          "centuries": 3,
          "fifties": 39
        }
      },
      "t20i": {
        "batting": {
          "matches": 38,
          "innings": 30,
          "runs": 721,
          "average": 37.94,
          "strikeRate": 136.29,
          "highestScore": "60*",
          "centuries": 0,
          "fifties": 4
        }
      }
    }
  },
  {
    "id": "mitchell-johnson",
    "name": "Mitchell Johnson",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Left-arm fast",
    "dateOfBirth": "1981-11-02",
    "placeOfBirth": "Townsville, Queensland, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "37 ASHES WICKETS 2013-14",
      "TERRORIZING BOUNCER",
      "313 TEST WICKETS",
      "ICC CRICKETER OF YEAR 2014"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 73,
          "innings": 140,
          "overs": 2667.1,
          "wickets": 313,
          "economy": 3.33,
          "average": 28.4,
          "strikeRate": 51.1,
          "bestBowlingInnings": "8/61",
          "bestBowlingMatch": "12/127",
          "fiveWickets": 12,
          "tenWickets": 3
        },
        "batting": {
          "matches": 73,
          "innings": 109,
          "runs": 2065,
          "average": 22.2,
          "strikeRate": 57.6,
          "highestScore": "123*",
          "centuries": 1,
          "fifties": 11
        }
      },
      "odi": {
        "bowling": {
          "matches": 153,
          "innings": 150,
          "overs": 1284.5,
          "wickets": 239,
          "economy": 4.83,
          "average": 25.26,
          "strikeRate": 32.2,
          "bestBowlingInnings": "6/31",
          "fiveWickets": 3
        }
      },
      "t20i": {
        "bowling": {
          "matches": 30,
          "innings": 30,
          "overs": 108,
          "wickets": 38,
          "economy": 7.28,
          "average": 20.97,
          "strikeRate": 17,
          "bestBowlingInnings": "3/15"
        }
      }
    }
  },
  {
    "id": "glenn-maxwell",
    "name": "Glenn Maxwell",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1988-10-14",
    "placeOfBirth": "Kew, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "THE BIG SHOW",
      "201* vs AFGHANISTAN (CRAMPED HERO)",
      "FASTEST ODI WC CENTURY (40 BALLS)",
      "5 T20I CENTURIES"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 7,
          "innings": 14,
          "runs": 339,
          "average": 26.07,
          "strikeRate": 64.94,
          "highestScore": "104",
          "centuries": 1,
          "fifties": 0
        }
      },
      "odi": {
        "batting": {
          "matches": 142,
          "innings": 130,
          "runs": 3934,
          "average": 35.44,
          "strikeRate": 126.9,
          "highestScore": "201*",
          "centuries": 4,
          "fifties": 23,
          "sixes": 155
        },
        "bowling": {
          "matches": 142,
          "wickets": 70,
          "economy": 5.46,
          "average": 47.97,
          "strikeRate": 52.6,
          "bestBowlingInnings": "4/40"
        }
      },
      "t20i": {
        "batting": {
          "matches": 113,
          "innings": 103,
          "runs": 2600,
          "average": 29.54,
          "strikeRate": 155.5,
          "highestScore": "145*",
          "centuries": 5,
          "fifties": 11,
          "sixes": 134
        },
        "bowling": {
          "matches": 113,
          "wickets": 43,
          "economy": 7.57,
          "average": 27.67,
          "strikeRate": 21.9,
          "bestBowlingInnings": "3/10"
        }
      }
    },
    "ipl2026Team": "PBKS",
    "ipl2026": {
      "team": "PBKS",
      "role": "All-Rounder / Finisher",
      "isKeyXI": true
    }
  },
  {
    "id": "travis-head",
    "name": "Travis Head",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1993-12-29",
    "placeOfBirth": "Adelaide, South Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "2023 WTC FINAL CENTURY (163)",
      "2023 ODI WC FINAL CENTURY (137)",
      "ULTRA-AGGRESSIVE LEADER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 49,
          "innings": 83,
          "runs": 3173,
          "average": 41.75,
          "strikeRate": 64.91,
          "highestScore": "175",
          "centuries": 7,
          "fifties": 16
        }
      },
      "odi": {
        "batting": {
          "matches": 65,
          "innings": 62,
          "runs": 2393,
          "average": 42.73,
          "strikeRate": 105.04,
          "highestScore": "152",
          "centuries": 5,
          "fifties": 16
        }
      },
      "t20i": {
        "batting": {
          "matches": 38,
          "innings": 37,
          "runs": 1092,
          "average": 33.09,
          "strikeRate": 158.49,
          "highestScore": "91",
          "centuries": 0,
          "fifties": 5
        }
      }
    },
    "ipl2026Team": "SRH",
    "ipl2026": {
      "team": "SRH",
      "role": "Explosive Opening Batter",
      "isKeyXI": true
    }
  },
  {
    "id": "marnus-labuschagne",
    "name": "Marnus Labuschagne",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "1994-06-22",
    "placeOfBirth": "Klerksdorp, North West, South Africa",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "TEST CRICKET’S FIRST CONCUSSION SUB",
      "4,000+ TEST RUNS (50+ AVG)",
      "DOUBLE CENTURIES AT PERTH & ADELAIDE",
      "NO RUNS QUIRK"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 50,
          "innings": 90,
          "runs": 4114,
          "average": 49.56,
          "strikeRate": 52.48,
          "highestScore": "215",
          "centuries": 11,
          "fifties": 20
        }
      },
      "odi": {
        "batting": {
          "matches": 52,
          "innings": 49,
          "runs": 1654,
          "average": 37.59,
          "strikeRate": 83.45,
          "highestScore": "124",
          "centuries": 2,
          "fifties": 10
        }
      }
    }
  },
  {
    "id": "michael-clarke",
    "name": "Michael Clarke",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "dateOfBirth": "1981-04-02",
    "placeOfBirth": "Liverpool, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "PUP",
      "329* SCG TRIPLE CENTURY",
      "2015 WORLD CUP WINNING CAPTAIN",
      "8,643 TEST RUNS (49.10 AVG)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 115,
          "innings": 198,
          "runs": 8643,
          "average": 49.1,
          "strikeRate": 55.92,
          "highestScore": "329*",
          "centuries": 28,
          "fifties": 27,
          "fours": 978,
          "sixes": 39
        },
        "bowling": {
          "matches": 115,
          "wickets": 31,
          "economy": 3.12,
          "average": 38.19,
          "bestBowlingInnings": "6/9",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 245,
          "innings": 223,
          "runs": 7981,
          "average": 44.58,
          "strikeRate": 78.98,
          "highestScore": "130",
          "centuries": 8,
          "fifties": 58
        },
        "bowling": {
          "matches": 245,
          "wickets": 57,
          "economy": 4.88,
          "average": 37.64,
          "bestBowlingInnings": "5/21",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "andrew-symonds",
    "name": "Andrew Symonds",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak / medium-fast",
    "dateOfBirth": "1975-06-09",
    "placeOfBirth": "Birmingham, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "ROY",
      "143* vs PAKISTAN 2003 WORLD CUP OPENER",
      "2X UNDEFEATED WORLD CUP CHAMPION",
      "FEARLESS POWER HITTER & ATHLETE"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 26,
          "innings": 41,
          "runs": 1462,
          "average": 40.61,
          "strikeRate": 64.8,
          "highestScore": "162*",
          "centuries": 2,
          "fifties": 10
        },
        "bowling": {
          "matches": 26,
          "wickets": 24,
          "economy": 2.87,
          "average": 37.33,
          "bestBowlingInnings": "3/50"
        }
      },
      "odi": {
        "batting": {
          "matches": 198,
          "innings": 161,
          "runs": 5088,
          "average": 39.75,
          "strikeRate": 92.44,
          "highestScore": "156",
          "centuries": 6,
          "fifties": 30,
          "sixes": 103
        },
        "bowling": {
          "matches": 198,
          "innings": 143,
          "overs": 1011.5,
          "wickets": 133,
          "economy": 5,
          "average": 37.25,
          "strikeRate": 45.6,
          "bestBowlingInnings": "5/18",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "batting": {
          "matches": 14,
          "innings": 11,
          "runs": 337,
          "average": 48.14,
          "strikeRate": 169.34,
          "highestScore": "85*",
          "centuries": 0,
          "fifties": 2,
          "sixes": 17
        }
      }
    }
  },
  {
    "id": "allan-border",
    "name": "Allan Border",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "dateOfBirth": "1955-07-27",
    "placeOfBirth": "Cremorne, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "AB",
      "11000+ TEST RUNS",
      "1987 WORLD CUP WINNING SKIPPER",
      "153 CONSECUTIVE TESTS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 156,
          "innings": 265,
          "runs": 11174,
          "average": 50.56,
          "strikeRate": 51.2,
          "highestScore": "205",
          "centuries": 27,
          "fifties": 63,
          "fours": 1161,
          "sixes": 28
        },
        "bowling": {
          "matches": 156,
          "wickets": 39,
          "economy": 2.89,
          "average": 39.56,
          "bestBowlingInnings": "7/46",
          "bestBowlingMatch": "11/96",
          "fiveWickets": 2,
          "tenWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 273,
          "innings": 252,
          "runs": 6524,
          "average": 30.62,
          "strikeRate": 71.42,
          "highestScore": "127*",
          "centuries": 3,
          "fifties": 39
        },
        "bowling": {
          "matches": 273,
          "innings": 155,
          "overs": 887.2,
          "wickets": 73,
          "economy": 4.66,
          "average": 28.36,
          "bestBowlingInnings": "3/20"
        }
      }
    }
  },
  {
    "id": "steve-waugh",
    "name": "Steve Waugh",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1965-06-02",
    "placeOfBirth": "Canterbury, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "TUGGA",
      "1999 WORLD CUP WINNING CAPTAIN",
      "16 CONSECUTIVE TEST WINS",
      "ICEMAN OF CRICKET"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 168,
          "innings": 260,
          "runs": 10927,
          "average": 51.06,
          "strikeRate": 48.64,
          "highestScore": "200",
          "centuries": 32,
          "fifties": 50,
          "fours": 1175,
          "sixes": 20
        },
        "bowling": {
          "matches": 168,
          "innings": 162,
          "overs": 1301.2,
          "wickets": 92,
          "economy": 3.03,
          "average": 37.44,
          "strikeRate": 84.8,
          "bestBowlingInnings": "5/28",
          "fiveWickets": 3
        }
      },
      "odi": {
        "batting": {
          "matches": 325,
          "innings": 288,
          "runs": 7569,
          "average": 32.9,
          "strikeRate": 75.91,
          "highestScore": "120*",
          "centuries": 3,
          "fifties": 45
        },
        "bowling": {
          "matches": 325,
          "innings": 207,
          "overs": 1478.4,
          "wickets": 195,
          "economy": 4.56,
          "average": 34.67,
          "strikeRate": 45.5,
          "bestBowlingInnings": "4/33"
        }
      }
    }
  },
  {
    "id": "dennis-lillee",
    "name": "Dennis Lillee",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1949-07-18",
    "placeOfBirth": "Subiaco, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "DKL",
      "355 TEST WICKETS",
      "FAST BOWLING GODFATHER",
      "CENTENARY TEST 11 WICKETS"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 70,
          "innings": 132,
          "overs": 3076.4,
          "wickets": 355,
          "economy": 2.75,
          "average": 23.92,
          "strikeRate": 52,
          "bestBowlingInnings": "7/89",
          "bestBowlingMatch": "11/123",
          "fiveWickets": 23,
          "tenWickets": 7
        },
        "batting": {
          "matches": 70,
          "innings": 90,
          "runs": 903,
          "average": 13.68,
          "highestScore": "73*",
          "centuries": 0,
          "fifties": 1
        }
      },
      "odi": {
        "bowling": {
          "matches": 63,
          "innings": 63,
          "overs": 593.4,
          "wickets": 103,
          "economy": 3.58,
          "average": 20.82,
          "strikeRate": 34.5,
          "bestBowlingInnings": "5/34",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "mark-waugh",
    "name": "Mark Waugh",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium / offbreak",
    "dateOfBirth": "1965-06-02",
    "placeOfBirth": "Canterbury, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "JUNIOR",
      "SUPREME ELEGANCE",
      "1999 WORLD CUP WINNER",
      "FIRST SLIP MAESTRO"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 128,
          "innings": 209,
          "runs": 8029,
          "average": 41.81,
          "strikeRate": 52.9,
          "highestScore": "153*",
          "centuries": 20,
          "fifties": 47,
          "fours": 904,
          "sixes": 34
        },
        "bowling": {
          "matches": 128,
          "innings": 106,
          "overs": 808.2,
          "wickets": 59,
          "economy": 3.12,
          "average": 41.16,
          "bestBowlingInnings": "5/40",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 244,
          "innings": 236,
          "runs": 8500,
          "average": 39.35,
          "strikeRate": 76.9,
          "highestScore": "173",
          "centuries": 18,
          "fifties": 50,
          "sixes": 57
        },
        "bowling": {
          "matches": 244,
          "innings": 147,
          "overs": 835.4,
          "wickets": 85,
          "economy": 4.45,
          "average": 34.56,
          "bestBowlingInnings": "5/24",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "michael-bevan",
    "name": "Michael Bevan",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm chinaman",
    "dateOfBirth": "1970-05-08",
    "placeOfBirth": "Belconnen, Australian Capital Territory",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "THE ORIGINAL FINISHER",
      "53.58 ODI AVERAGE",
      "2X WORLD CUP WINNER (1999, 2003)",
      "NEW YEAR CHASE HERO 1996"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 18,
          "innings": 30,
          "runs": 785,
          "average": 29.07,
          "strikeRate": 46.2,
          "highestScore": "91",
          "centuries": 0,
          "fifties": 6
        },
        "bowling": {
          "matches": 18,
          "wickets": 29,
          "economy": 3.14,
          "average": 24.24,
          "bestBowlingInnings": "6/82",
          "bestBowlingMatch": "10/113",
          "fiveWickets": 2,
          "tenWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 232,
          "innings": 196,
          "runs": 6912,
          "average": 53.58,
          "strikeRate": 74.16,
          "highestScore": "108*",
          "centuries": 6,
          "fifties": 46
        },
        "bowling": {
          "matches": 232,
          "innings": 84,
          "overs": 379.3,
          "wickets": 36,
          "economy": 5.05,
          "average": 45.97,
          "bestBowlingInnings": "3/36"
        }
      }
    }
  },
  {
    "id": "marcus-stoinis",
    "name": "Marcus Stoinis",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast",
    "dateOfBirth": "1989-08-16",
    "placeOfBirth": "Perth, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "PBKS",
    "ipl2026": {
      "team": "PBKS",
      "role": "Powerhouse Middle-Order All-Rounder",
      "isKeyXI": true,
      "auctionPrice": "₹11 Cr"
    },
    "badges": [
      "124* AT CHEPAUK (RECORD CHASE vs CSK 2024)",
      "2021 T20 WORLD CUP & 2023 ODI WORLD CUP WINNER",
      "THE HULK"
    ],
    "stats": {
      "odi": {
        "batting": {
          "matches": 71,
          "innings": 64,
          "runs": 1495,
          "average": 26.69,
          "strikeRate": 92.56,
          "highestScore": "146*",
          "centuries": 1,
          "fifties": 6
        },
        "bowling": {
          "matches": 71,
          "innings": 59,
          "overs": 350.2,
          "wickets": 48,
          "economy": 5.86,
          "average": 42.77,
          "bestBowlingInnings": "3/16"
        }
      },
      "t20i": {
        "batting": {
          "matches": 74,
          "innings": 61,
          "runs": 1324,
          "average": 31.52,
          "strikeRate": 147.27,
          "highestScore": "78",
          "centuries": 0,
          "fifties": 5,
          "sixes": 66
        },
        "bowling": {
          "matches": 74,
          "innings": 49,
          "overs": 147.1,
          "wickets": 45,
          "economy": 8.52,
          "average": 27.84,
          "strikeRate": 19.6,
          "bestBowlingInnings": "3/18"
        }
      }
    }
  },
  {
    "id": "mitchell-marsh",
    "name": "Mitchell Marsh",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1991-10-20",
    "placeOfBirth": "Attadale, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "LSG",
    "ipl2026": {
      "team": "LSG",
      "role": "Top-Order Enforcer All-Rounder",
      "isKeyXI": true,
      "auctionPrice": "₹3.4 Cr"
    },
    "badges": [
      "2021 T20 WORLD CUP FINAL PLAYER OF MATCH (77*)",
      "2X ODI WORLD CUP WINNER (2015, 2023)",
      "ALLAN BORDER MEDALIST 2024"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 46,
          "innings": 81,
          "runs": 2269,
          "average": 29.85,
          "strikeRate": 55.4,
          "highestScore": "181",
          "centuries": 3,
          "fifties": 10
        },
        "bowling": {
          "matches": 46,
          "innings": 69,
          "overs": 730,
          "wickets": 51,
          "economy": 3.42,
          "average": 40.5,
          "bestBowlingInnings": "5/86",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 93,
          "innings": 86,
          "runs": 2843,
          "average": 36.44,
          "strikeRate": 94.67,
          "highestScore": "177*",
          "centuries": 3,
          "fifties": 18,
          "sixes": 104
        },
        "bowling": {
          "matches": 93,
          "innings": 73,
          "overs": 418.3,
          "wickets": 57,
          "economy": 5.56,
          "average": 37.89,
          "bestBowlingInnings": "5/33",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "batting": {
          "matches": 65,
          "innings": 61,
          "runs": 1629,
          "average": 32.58,
          "strikeRate": 135.52,
          "highestScore": "92*",
          "centuries": 0,
          "fifties": 9,
          "sixes": 78
        },
        "bowling": {
          "matches": 65,
          "innings": 26,
          "overs": 63.4,
          "wickets": 17,
          "economy": 8.16,
          "average": 30.58,
          "bestBowlingInnings": "3/24"
        }
      }
    }
  },
  {
    "id": "tim-david",
    "name": "Tim David",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm offbreak",
    "dateOfBirth": "1996-04-08",
    "placeOfBirth": "Singapore",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "RCB",
    "ipl2026": {
      "team": "RCB",
      "role": "Lower-Order Demolition Finisher",
      "isKeyXI": true,
      "auctionPrice": "₹3 Cr"
    },
    "badges": [
      "T20 STRIKE RATE 160+",
      "GLOBAL T20 FINISHER SPECIALIST",
      "MATCH-WINNING 46 (18) vs RR IN IPL"
    ],
    "stats": {
      "t20i": {
        "batting": {
          "matches": 53,
          "innings": 47,
          "runs": 1205,
          "average": 34.42,
          "strikeRate": 161.96,
          "highestScore": "92*",
          "centuries": 0,
          "fifties": 6,
          "sixes": 75
        }
      }
    }
  },
  {
    "id": "adam-zampa",
    "name": "Adam Zampa",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak googly",
    "dateOfBirth": "1992-03-31",
    "placeOfBirth": "Shellharbour, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "ipl2026Team": "SRH",
    "ipl2026": {
      "team": "SRH",
      "role": "Lead Wrist Spinner",
      "isKeyXI": true,
      "auctionPrice": "₹2.4 Cr"
    },
    "badges": [
      "2023 ODI WORLD CUP WINNER (23 WKTS - 2ND HIGHEST)",
      "2021 T20 WORLD CUP WINNER",
      "110+ T20I WICKETS (AUSTRALIA ALL-TIME HIGHEST)"
    ],
    "stats": {
      "odi": {
        "bowling": {
          "matches": 104,
          "innings": 102,
          "overs": 928.1,
          "wickets": 177,
          "economy": 5.51,
          "average": 28.89,
          "strikeRate": 31.4,
          "bestBowlingInnings": "5/35",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "bowling": {
          "matches": 92,
          "innings": 91,
          "overs": 337.5,
          "wickets": 117,
          "economy": 7.23,
          "average": 20.89,
          "strikeRate": 17.3,
          "bestBowlingInnings": "5/19",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "jake-fraser-mcgurk",
    "name": "Jake Fraser-McGurk",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm legbreak",
    "dateOfBirth": "2002-04-11",
    "placeOfBirth": "Melbourne, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "DC",
    "ipl2026": {
      "team": "DC",
      "role": "Ultra-Aggressive Opening Batter",
      "isKeyXI": true,
      "auctionPrice": "₹9 Cr (RTM)"
    },
    "badges": [
      "WORLD RECORD FASTEST LIST A CENTURY (29 BALLS)",
      "330 RUNS AT 234.04 SR IN IPL 2024",
      "15-BALL IPL HALF-CENTURY RECORD"
    ],
    "stats": {
      "odi": {
        "batting": {
          "matches": 5,
          "innings": 5,
          "runs": 114,
          "average": 22.8,
          "strikeRate": 137.34,
          "highestScore": "41",
          "centuries": 0,
          "fifties": 0
        }
      },
      "t20i": {
        "batting": {
          "matches": 6,
          "innings": 6,
          "runs": 106,
          "average": 17.66,
          "strikeRate": 147.22,
          "highestScore": "50",
          "centuries": 0,
          "fifties": 1
        }
      }
    }
  },
  {
    "id": "josh-inglis",
    "name": "Josh Inglis",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "wicket-keeper",
    "battingStyle": "Right-hand bat",
    "dateOfBirth": "1995-03-04",
    "placeOfBirth": "Leeds, England",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "ipl2026Team": "PBKS",
    "ipl2026": {
      "team": "PBKS",
      "role": "Dynamic Wicket-Keeper Batter",
      "isKeyXI": true,
      "auctionPrice": "₹2.6 Cr"
    },
    "badges": [
      "43-BALL T20I CENTURY (JOINT FASTEST BY AN AUSTRALIAN)",
      "2023 ODI WORLD CUP FINAL WINNING WICKET-KEEPER",
      "360° SCOOP MASTER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 1,
          "innings": 2,
          "runs": 42,
          "average": 21,
          "strikeRate": 67.74,
          "highestScore": "24",
          "centuries": 0,
          "fifties": 0
        }
      },
      "odi": {
        "batting": {
          "matches": 28,
          "innings": 26,
          "runs": 631,
          "average": 27.43,
          "strikeRate": 94.46,
          "highestScore": "65",
          "centuries": 0,
          "fifties": 3
        }
      },
      "t20i": {
        "batting": {
          "matches": 32,
          "innings": 31,
          "runs": 819,
          "average": 30.33,
          "strikeRate": 157.8,
          "highestScore": "110",
          "centuries": 2,
          "fifties": 1,
          "sixes": 38
        }
      }
    }
  },
  {
    "id": "nathan-ellis",
    "name": "Nathan Ellis",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1994-09-22",
    "placeOfBirth": "Greenacre, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "ipl2026Team": "CSK",
    "ipl2026": {
      "team": "CSK",
      "role": "Death Overs Specialist / Yorker Bowler",
      "isKeyXI": true,
      "auctionPrice": "₹2 Cr"
    },
    "badges": [
      "T20I DEBUT HAT-TRICK vs BANGLADESH (FIRST EVER)",
      "ELITE DIPPING SLOW BALLS & WIDE YORKERS"
    ],
    "stats": {
      "odi": {
        "bowling": {
          "matches": 8,
          "innings": 8,
          "overs": 68,
          "wickets": 10,
          "economy": 5.66,
          "average": 38.5,
          "bestBowlingInnings": "2/39"
        }
      },
      "t20i": {
        "bowling": {
          "matches": 20,
          "innings": 20,
          "overs": 73.1,
          "wickets": 29,
          "economy": 8.04,
          "average": 20.31,
          "strikeRate": 15.1,
          "bestBowlingInnings": "4/28",
          "fourWickets": 2
        }
      }
    }
  },
  {
    "id": "xavier-bartlett",
    "name": "Xavier Bartlett",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1998-12-17",
    "placeOfBirth": "Adelaide, South Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "ipl2026Team": "PBKS",
    "ipl2026": {
      "team": "PBKS",
      "role": "New-Ball Swing Fast Bowler",
      "isKeyXI": true,
      "auctionPrice": "₹80 Lakh"
    },
    "badges": [
      "4/17 ON ODI DEBUT vs WEST INDIES AT MCG",
      "BBL 13 LEADING WICKET TAKER (20 WKTS)",
      "AUSTRALIA T20I STRIKE BOWLER"
    ],
    "stats": {
      "odi": {
        "bowling": {
          "matches": 2,
          "innings": 2,
          "overs": 16.1,
          "wickets": 8,
          "economy": 4.08,
          "average": 8.25,
          "strikeRate": 12.1,
          "bestBowlingInnings": "4/17",
          "fourWickets": 2
        }
      },
      "t20i": {
        "bowling": {
          "matches": 6,
          "innings": 6,
          "overs": 20,
          "wickets": 10,
          "economy": 8.05,
          "average": 16.1,
          "strikeRate": 12,
          "bestBowlingInnings": "3/23"
        }
      }
    }
  },
  {
    "id": "aaron-hardie",
    "name": "Aaron Hardie",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium-fast",
    "dateOfBirth": "1999-01-07",
    "placeOfBirth": "Bournemouth, England",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "ipl2026Team": "PBKS",
    "ipl2026": {
      "team": "PBKS",
      "role": "Pace Bowling All-Rounder",
      "isKeyXI": false,
      "isImpactCandidate": true,
      "auctionPrice": "₹1.25 Cr"
    },
    "badges": [
      "2X BBL CHAMPION WITH PERTH SCORCHERS",
      "SHIELD FINAL PLAYER OF THE MATCH (174* vs VICTORIA)",
      "AUSTRALIAN WHITE-BALL ALL-ROUNDER"
    ],
    "stats": {
      "odi": {
        "batting": {
          "matches": 8,
          "innings": 6,
          "runs": 128,
          "average": 21.33,
          "strikeRate": 86.48,
          "highestScore": "44",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 8,
          "innings": 7,
          "overs": 33,
          "wickets": 4,
          "economy": 5.48,
          "average": 45.25,
          "bestBowlingInnings": "2/38"
        }
      },
      "t20i": {
        "batting": {
          "matches": 13,
          "innings": 10,
          "runs": 164,
          "average": 20.5,
          "strikeRate": 137.81,
          "highestScore": "28",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 13,
          "innings": 10,
          "overs": 26,
          "wickets": 7,
          "economy": 8.8,
          "average": 32.71,
          "strikeRate": 22.2,
          "bestBowlingInnings": "3/21"
        }
      }
    }
  },
  {
    "id": "justin-langer",
    "name": "Justin Langer",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1970-11-21",
    "placeOfBirth": "Perth, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "7,696 TEST RUNS & 23 CENTURIES",
      "ICONIC OPENING PARTNERSHIP WITH MATTHEW HAYDEN (5,655 RUNS)",
      "250 vs ENGLAND AT THE MCG",
      "ASHES & T20 WORLD CUP WINNING COACH"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 105,
          "innings": 182,
          "runs": 7696,
          "average": 45.27,
          "strikeRate": 54.1,
          "highestScore": "250",
          "centuries": 23,
          "fifties": 30,
          "fours": 906,
          "sixes": 12
        }
      },
      "odi": {
        "batting": {
          "matches": 8,
          "innings": 7,
          "runs": 160,
          "average": 32,
          "strikeRate": 67.22,
          "highestScore": "36",
          "centuries": 0,
          "fifties": 0
        }
      }
    }
  },
  {
    "id": "damien-martyn",
    "name": "Damien Martyn",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1971-10-21",
    "placeOfBirth": "Darwin, Northern Territory, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "EFFORTLESS OFF-DRIVE PURIST",
      "88* IN 2003 WORLD CUP FINAL vs INDIA (WITH BROKEN FINGER)",
      "2X WORLD CUP WINNER (1999, 2003)",
      "2006 CHAMPIONS TROPHY PLAYER OF THE TOURNAMENT"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 67,
          "innings": 109,
          "runs": 4406,
          "average": 46.37,
          "strikeRate": 51.8,
          "highestScore": "165",
          "centuries": 13,
          "fifties": 23,
          "fours": 517,
          "sixes": 16
        }
      },
      "odi": {
        "batting": {
          "matches": 208,
          "innings": 182,
          "runs": 5346,
          "average": 40.8,
          "strikeRate": 77.73,
          "highestScore": "144*",
          "centuries": 5,
          "fifties": 37,
          "sixes": 22
        }
      }
    }
  },
  {
    "id": "jason-gillespie",
    "name": "Jason Gillespie",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1975-04-19",
    "placeOfBirth": "Darlinghurst, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "DIZZY",
      "259 TEST WICKETS AT 26.13 AVERAGE",
      "201* NIGHTWATCHMAN DOUBLE CENTURY vs BANGLADESH (WORLD RECORD)",
      "2003 WORLD CUP WINNER"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 71,
          "innings": 137,
          "overs": 2793.4,
          "wickets": 259,
          "economy": 2.42,
          "average": 26.13,
          "strikeRate": 64.7,
          "bestBowlingInnings": "7/37",
          "bestBowlingMatch": "9/67",
          "fiveWickets": 8
        },
        "batting": {
          "matches": 71,
          "innings": 93,
          "runs": 1218,
          "average": 15.61,
          "strikeRate": 43.1,
          "highestScore": "201*",
          "centuries": 1,
          "fifties": 2
        }
      },
      "odi": {
        "bowling": {
          "matches": 97,
          "innings": 95,
          "overs": 835.3,
          "wickets": 142,
          "economy": 4.21,
          "average": 25.42,
          "strikeRate": 35.3,
          "bestBowlingInnings": "5/22",
          "fiveWickets": 3
        }
      }
    }
  },
  {
    "id": "shane-watson",
    "name": "Shane Watson",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1981-06-17",
    "placeOfBirth": "Ipswich, Queensland, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "WATO",
      "2X WORLD CUP WINNER (2007, 2015)",
      "2X CHAMPIONS TROPHY FINAL PLAYER OF THE MATCH (2006, 2009)",
      "2X ALLAN BORDER MEDALIST",
      "185* vs BAN (15 SIXES RECORD)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 59,
          "innings": 109,
          "runs": 3731,
          "average": 35.19,
          "strikeRate": 54.96,
          "highestScore": "176",
          "centuries": 4,
          "fifties": 24,
          "fours": 479,
          "sixes": 31
        },
        "bowling": {
          "matches": 59,
          "innings": 87,
          "overs": 947.3,
          "wickets": 75,
          "economy": 2.74,
          "average": 33.68,
          "strikeRate": 75.8,
          "bestBowlingInnings": "5/42",
          "fiveWickets": 3
        }
      },
      "odi": {
        "batting": {
          "matches": 190,
          "innings": 169,
          "runs": 5757,
          "average": 40.54,
          "strikeRate": 90.44,
          "highestScore": "185*",
          "centuries": 9,
          "fifties": 33,
          "fours": 570,
          "sixes": 131
        },
        "bowling": {
          "matches": 190,
          "innings": 163,
          "overs": 1083.5,
          "wickets": 168,
          "economy": 4.95,
          "average": 31.79,
          "strikeRate": 38.7,
          "bestBowlingInnings": "4/36",
          "fourWickets": 3
        }
      },
      "t20i": {
        "batting": {
          "matches": 58,
          "innings": 56,
          "runs": 1462,
          "average": 29.24,
          "strikeRate": 145.32,
          "highestScore": "124*",
          "centuries": 1,
          "fifties": 10,
          "fours": 115,
          "sixes": 83
        },
        "bowling": {
          "matches": 58,
          "innings": 47,
          "overs": 156.4,
          "wickets": 48,
          "economy": 7.65,
          "average": 24.72,
          "strikeRate": 19.5,
          "bestBowlingInnings": "4/15",
          "fourWickets": 1
        }
      }
    }
  },
  {
    "id": "brad-haddin",
    "name": "Brad Haddin",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "wicket-keeper",
    "battingStyle": "Right-hand bat",
    "dateOfBirth": "1977-10-23",
    "placeOfBirth": "Cowra, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "badges": [
      "2015 WORLD CUP WINNER",
      "493 RUNS IN 2013-14 5-0 ASHES WHITEWASH (RECORD FIGHTBACK)",
      "3,268 TEST RUNS & 270 DISMISSALS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 66,
          "innings": 112,
          "runs": 3268,
          "average": 32.98,
          "strikeRate": 58.74,
          "highestScore": "169",
          "centuries": 4,
          "fifties": 18,
          "fours": 377,
          "sixes": 34
        }
      },
      "odi": {
        "batting": {
          "matches": 126,
          "innings": 115,
          "runs": 3122,
          "average": 31.53,
          "strikeRate": 83.74,
          "highestScore": "110",
          "centuries": 2,
          "fifties": 16
        }
      },
      "t20i": {
        "batting": {
          "matches": 34,
          "innings": 30,
          "runs": 402,
          "average": 17.47,
          "strikeRate": 114.2,
          "highestScore": "47",
          "centuries": 0,
          "fifties": 0
        }
      }
    }
  },
  {
    "id": "brad-hogg",
    "name": "Brad Hogg",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm chinaman",
    "dateOfBirth": "1971-02-06",
    "placeOfBirth": "Narrogin, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "2X UNDEFEATED WORLD CUP CHAMPION (2003, 2007)",
      "156 ODI WICKETS AT 26.84",
      "TONGUE-OUT FLIPPER & WRIST SPIN ENCHANTER"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 7,
          "innings": 11,
          "overs": 247.3,
          "wickets": 17,
          "economy": 3.76,
          "average": 54.76,
          "bestBowlingInnings": "4/133"
        }
      },
      "odi": {
        "bowling": {
          "matches": 123,
          "innings": 113,
          "overs": 947.5,
          "wickets": 156,
          "economy": 4.51,
          "average": 26.84,
          "strikeRate": 36.4,
          "bestBowlingInnings": "5/32",
          "fourWickets": 3,
          "fiveWickets": 2
        }
      },
      "t20i": {
        "bowling": {
          "matches": 15,
          "innings": 15,
          "overs": 51,
          "wickets": 7,
          "economy": 6.88,
          "average": 50.14,
          "bestBowlingInnings": "2/31"
        }
      }
    }
  },
  {
    "id": "nathan-bracken",
    "name": "Nathan Bracken",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast-medium",
    "dateOfBirth": "1977-09-12",
    "placeOfBirth": "Penrith, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "FORMER NO. 1 ICC ODI BOWLER IN THE WORLD",
      "2007 WORLD CUP WINNER (16 WICKETS AT 16.1 AVG)",
      "174 ODI WICKETS AT 24.36 (SWING & CUTTER GENIUS)"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 5,
          "innings": 8,
          "overs": 175.4,
          "wickets": 12,
          "economy": 2.86,
          "average": 42.08,
          "bestBowlingInnings": "4/48"
        }
      },
      "odi": {
        "bowling": {
          "matches": 116,
          "innings": 116,
          "overs": 969.5,
          "wickets": 174,
          "economy": 4.41,
          "average": 24.36,
          "strikeRate": 33.4,
          "bestBowlingInnings": "5/47",
          "fourWickets": 5,
          "fiveWickets": 2
        }
      },
      "t20i": {
        "bowling": {
          "matches": 19,
          "innings": 19,
          "overs": 69.3,
          "wickets": 19,
          "economy": 7.02,
          "average": 25.68,
          "strikeRate": 21.9,
          "bestBowlingInnings": "3/11"
        }
      }
    }
  },
  {
    "id": "stuart-clark",
    "name": "Stuart Clark",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1975-09-28",
    "placeOfBirth": "Sutherland, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "SARFRAZ",
      "2006-07 5-0 ASHES WHITEWASH HERO (26 WICKETS AT 17.03)",
      "94 TEST WICKETS AT SENSATIONAL 22.86 AVERAGE",
      "MCGRATH CLONE ACCURACY"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 24,
          "innings": 43,
          "overs": 829.4,
          "wickets": 94,
          "economy": 2.59,
          "average": 22.86,
          "strikeRate": 52.9,
          "bestBowlingInnings": "5/55",
          "fiveWickets": 2
        }
      },
      "odi": {
        "bowling": {
          "matches": 39,
          "innings": 38,
          "overs": 337.5,
          "wickets": 53,
          "economy": 4.88,
          "average": 31.11,
          "strikeRate": 38.2,
          "bestBowlingInnings": "4/54",
          "fourWickets": 1
        }
      }
    }
  },
  {
    "id": "simon-katich",
    "name": "Simon Katich",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm chinaman",
    "dateOfBirth": "1975-08-21",
    "placeOfBirth": "Middle Swan, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "4,188 TEST RUNS AT 45.03",
      "10 TEST CENTURIES (157 vs WI AT BRIDGETOWN & 131* AT SCG)",
      "TENACIOUS FIGHTING TEST OPENER & 6/65 TEST 5-FER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 56,
          "innings": 99,
          "runs": 4188,
          "average": 45.03,
          "strikeRate": 50.8,
          "highestScore": "157",
          "centuries": 10,
          "fifties": 25,
          "fours": 474,
          "sixes": 10
        },
        "bowling": {
          "matches": 56,
          "innings": 32,
          "overs": 198.3,
          "wickets": 21,
          "economy": 3.86,
          "average": 30.23,
          "bestBowlingInnings": "6/65",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 45,
          "innings": 42,
          "runs": 1324,
          "average": 35.78,
          "strikeRate": 68.74,
          "highestScore": "107*",
          "centuries": 1,
          "fifties": 9
        }
      }
    }
  },
  {
    "id": "peter-siddle",
    "name": "Peter Siddle",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1984-11-25",
    "placeOfBirth": "Traralgon, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "BIRTHDAY TEST HAT-TRICK vs ENGLAND AT THE GABBA (2010)",
      "221 TEST WICKETS (8 FIVE-WICKET HAULS)",
      "WORKHORSE HEART & VEGAN POWER"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 67,
          "innings": 126,
          "overs": 2263.1,
          "wickets": 221,
          "economy": 2.94,
          "average": 30.66,
          "strikeRate": 61.4,
          "bestBowlingInnings": "6/54",
          "bestBowlingMatch": "9/104",
          "fiveWickets": 8
        },
        "batting": {
          "matches": 67,
          "innings": 93,
          "runs": 1164,
          "average": 14.55,
          "strikeRate": 40.2,
          "highestScore": "51",
          "centuries": 0,
          "fifties": 2
        }
      },
      "odi": {
        "bowling": {
          "matches": 20,
          "innings": 20,
          "overs": 177.3,
          "wickets": 17,
          "economy": 4.87,
          "average": 50.88,
          "bestBowlingInnings": "3/55"
        }
      }
    }
  },
  {
    "id": "ryan-harris",
    "name": "Ryan Harris",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast",
    "dateOfBirth": "1979-10-11",
    "placeOfBirth": "Sydney, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "RYANO",
      "BALL OF THE 21ST CENTURY (ALASTAIR COOK PERTH 1st BALL)",
      "113 TEST WICKETS AT SENSATIONAL 23.52 AVERAGE",
      "2013-14 5-0 ASHES SEAM MASTER (22 WKTS)"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 27,
          "innings": 52,
          "overs": 981.4,
          "wickets": 113,
          "economy": 2.78,
          "average": 23.52,
          "strikeRate": 50.7,
          "bestBowlingInnings": "7/117",
          "bestBowlingMatch": "9/106",
          "fiveWickets": 5
        }
      },
      "odi": {
        "bowling": {
          "matches": 21,
          "innings": 21,
          "overs": 182.2,
          "wickets": 44,
          "economy": 4.56,
          "average": 18.9,
          "strikeRate": 24.8,
          "bestBowlingInnings": "5/19",
          "fourWickets": 2,
          "fiveWickets": 3
        }
      }
    }
  },
  {
    "id": "matthew-wade",
    "name": "Matthew Wade",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "wicket-keeper",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1987-12-26",
    "placeOfBirth": "Hobart, Tasmania, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFallbackData": true,
    "badges": [
      "2021 T20 WORLD CUP HERO (41* OFF 17 vs SHAHIN AFRIDI/PAK IN SEMI-FINAL)",
      "4 TEST CENTURIES (TWIN ASHES CENTURIES IN 2019)",
      "AGGRESSIVE BULLDOG COMBATIVE SPIRIT"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 36,
          "innings": 66,
          "runs": 1613,
          "average": 29.87,
          "strikeRate": 53.8,
          "highestScore": "117",
          "centuries": 4,
          "fifties": 5,
          "fours": 191,
          "sixes": 8
        }
      },
      "odi": {
        "batting": {
          "matches": 97,
          "innings": 83,
          "runs": 1867,
          "average": 26.29,
          "strikeRate": 82.5,
          "highestScore": "100*",
          "centuries": 1,
          "fifties": 11
        }
      },
      "t20i": {
        "batting": {
          "matches": 92,
          "innings": 68,
          "runs": 1202,
          "average": 26.13,
          "strikeRate": 134.15,
          "highestScore": "80",
          "centuries": 0,
          "fifties": 3,
          "sixes": 45
        }
      }
    }
  },
  {
    "id": "james-faulkner",
    "name": "James Faulkner",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Left-arm fast-medium",
    "dateOfBirth": "1990-04-29",
    "placeOfBirth": "Launceston, Tasmania, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "2015 WORLD CUP FINAL PLAYER OF THE MATCH (3/36)",
      "THE FINISHER (69* OFF 47 IN MIRACULOUS CHASE vs ENG AT BRISBANE)",
      "96 ODI WICKETS & HAT-TRICK vs SRI LANKA"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 1,
          "innings": 2,
          "runs": 45,
          "average": 22.5,
          "strikeRate": 60,
          "highestScore": "23",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 1,
          "innings": 2,
          "overs": 26,
          "wickets": 6,
          "economy": 3.76,
          "average": 16.33,
          "bestBowlingInnings": "4/51"
        }
      },
      "odi": {
        "batting": {
          "matches": 69,
          "innings": 52,
          "runs": 1032,
          "average": 34.4,
          "strikeRate": 104.24,
          "highestScore": "116",
          "centuries": 1,
          "fifties": 4,
          "sixes": 34
        },
        "bowling": {
          "matches": 69,
          "innings": 66,
          "overs": 531,
          "wickets": 96,
          "economy": 5.52,
          "average": 30.56,
          "strikeRate": 33.1,
          "bestBowlingInnings": "4/48",
          "fourWickets": 3
        }
      },
      "t20i": {
        "batting": {
          "matches": 24,
          "innings": 14,
          "runs": 159,
          "average": 14.45,
          "strikeRate": 120.45,
          "highestScore": "41*",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 24,
          "innings": 24,
          "overs": 73.1,
          "wickets": 36,
          "economy": 7.96,
          "average": 19,
          "strikeRate": 12.1,
          "bestBowlingInnings": "5/27",
          "fiveWickets": 1
        }
      }
    }
  },
  {
    "id": "usman-khawaja",
    "name": "Usman Khawaja",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Right-arm medium / offbreak",
    "dateOfBirth": "1986-12-18",
    "placeOfBirth": "Islamabad, Pakistan",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "ICC TEST CRICKETER OF THE YEAR 2023",
      "5,451 TEST RUNS AT 45.8 AVERAGE & 15 CENTURIES",
      "141 IN DUBAI vs PAKISTAN (MARATHON 524 MINUTES RESCUE)",
      "2023 WTC & WORLD CUP WINNER"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 73,
          "innings": 133,
          "runs": 5451,
          "average": 45.8,
          "strikeRate": 48.74,
          "highestScore": "195*",
          "centuries": 15,
          "fifties": 26,
          "fours": 602,
          "sixes": 27
        }
      },
      "odi": {
        "batting": {
          "matches": 40,
          "innings": 39,
          "runs": 1554,
          "average": 42,
          "strikeRate": 84.45,
          "highestScore": "104",
          "centuries": 2,
          "fifties": 12
        }
      },
      "t20i": {
        "batting": {
          "matches": 9,
          "innings": 9,
          "runs": 241,
          "average": 26.77,
          "strikeRate": 136.15,
          "highestScore": "58",
          "centuries": 0,
          "fifties": 1
        }
      }
    }
  },
  {
    "id": "cameron-green",
    "name": "Cameron Green",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1999-06-03",
    "placeOfBirth": "Subiaco, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "174* IN WELLINGTON (UNBEATEN HEROIC TEST TON)",
      "5/27 AT MCG vs SA (BOXING DAY 5-FER)",
      "2023 WTC & WORLD CUP WINNER",
      "UNREAL GULLY CATCHING RADIUS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 28,
          "innings": 46,
          "runs": 1377,
          "average": 36.23,
          "strikeRate": 48.5,
          "highestScore": "174*",
          "centuries": 2,
          "fifties": 6,
          "fours": 148,
          "sixes": 10
        },
        "bowling": {
          "matches": 28,
          "innings": 43,
          "overs": 488.2,
          "wickets": 35,
          "economy": 3.39,
          "average": 35.31,
          "strikeRate": 62.5,
          "bestBowlingInnings": "5/27",
          "fiveWickets": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 26,
          "innings": 21,
          "runs": 494,
          "average": 32.93,
          "strikeRate": 89.81,
          "highestScore": "89*",
          "centuries": 0,
          "fifties": 2
        },
        "bowling": {
          "matches": 26,
          "innings": 20,
          "overs": 119,
          "wickets": 16,
          "economy": 5.37,
          "average": 40,
          "bestBowlingInnings": "5/33",
          "fiveWickets": 1
        }
      },
      "t20i": {
        "batting": {
          "matches": 13,
          "innings": 13,
          "runs": 263,
          "average": 26.3,
          "strikeRate": 162.34,
          "highestScore": "61",
          "centuries": 0,
          "fifties": 2,
          "sixes": 14
        },
        "bowling": {
          "matches": 13,
          "innings": 8,
          "overs": 22,
          "wickets": 6,
          "economy": 9.04,
          "average": 33.16,
          "bestBowlingInnings": "2/16"
        }
      }
    }
  },
  {
    "id": "scott-boland",
    "name": "Scott Boland",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "bowler",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm fast-medium",
    "dateOfBirth": "1989-04-11",
    "placeOfBirth": "Mordialloc, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    "isFallbackData": true,
    "badges": [
      "6/7 AT THE MCG ON TEST DEBUT (MULLAGH MEDAL WINNER)",
      "35 TEST WICKETS AT UNBELIEVABLE 20.34 AVERAGE",
      "2023 WORLD TEST CHAMPIONSHIP WINNER (GILL & KOHLI DISMISSALS)"
    ],
    "stats": {
      "test": {
        "bowling": {
          "matches": 10,
          "innings": 19,
          "overs": 301.2,
          "wickets": 35,
          "economy": 2.84,
          "average": 20.34,
          "strikeRate": 51.6,
          "bestBowlingInnings": "6/7",
          "fiveWickets": 1
        }
      },
      "odi": {
        "bowling": {
          "matches": 14,
          "innings": 14,
          "overs": 128,
          "wickets": 16,
          "economy": 4.88,
          "average": 45.31,
          "bestBowlingInnings": "3/67"
        }
      }
    }
  },
  {
    "id": "george-bailey",
    "name": "George Bailey",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Right-hand bat",
    "bowlingStyle": "Right-arm medium",
    "dateOfBirth": "1982-09-07",
    "placeOfBirth": "Launceston, Tasmania, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "2015 WORLD CUP WINNER",
      "478 RUNS AT 95.60 IN INDIA ODI SERIES (2013)",
      "CAPTAINED AUSTRALIA ON T20I DEBUT",
      "CHAIR OF CRICKET AUSTRALIA SELECTORS"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 5,
          "innings": 8,
          "runs": 183,
          "average": 26.14,
          "strikeRate": 59.8,
          "highestScore": "53",
          "centuries": 0,
          "fifties": 1
        }
      },
      "odi": {
        "batting": {
          "matches": 90,
          "innings": 85,
          "runs": 3044,
          "average": 40.58,
          "strikeRate": 83.48,
          "highestScore": "156",
          "centuries": 3,
          "fifties": 22,
          "fours": 254,
          "sixes": 56
        }
      },
      "t20i": {
        "batting": {
          "matches": 30,
          "innings": 26,
          "runs": 473,
          "average": 26.27,
          "strikeRate": 140.77,
          "highestScore": "63",
          "centuries": 0,
          "fifties": 2
        }
      }
    }
  },
  {
    "id": "shaun-marsh",
    "name": "Shaun Marsh",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "dateOfBirth": "1983-07-09",
    "placeOfBirth": "Narigun, Western Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "SOS",
      "141 ON TEST DEBUT vs SRI LANKA IN PALLEKELE",
      "6 TEST & 7 ODI CENTURIES",
      "INAUGURAL IPL ORANGE CAP WINNER 2008 (616 RUNS)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 38,
          "innings": 68,
          "runs": 2265,
          "average": 34.31,
          "strikeRate": 46.2,
          "highestScore": "182",
          "centuries": 6,
          "fifties": 10,
          "fours": 279,
          "sixes": 10
        }
      },
      "odi": {
        "batting": {
          "matches": 73,
          "innings": 72,
          "runs": 2773,
          "average": 40.77,
          "strikeRate": 81.42,
          "highestScore": "151",
          "centuries": 7,
          "fifties": 15,
          "sixes": 34
        }
      },
      "t20i": {
        "batting": {
          "matches": 15,
          "innings": 15,
          "runs": 255,
          "average": 18.21,
          "strikeRate": 102.82,
          "highestScore": "47",
          "centuries": 0,
          "fifties": 0
        }
      }
    }
  },
  {
    "id": "chris-rogers",
    "name": "Chris Rogers",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "batter",
    "battingStyle": "Left-hand bat",
    "dateOfBirth": "1977-08-31",
    "placeOfBirth": "Sydney, New South Wales, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "BUCK",
      "2,015 TEST RUNS IN 25 TESTS AT 42.87",
      "5 TEST CENTURIES (MELBOURNE, SYDNEY, LORD’S ASHES HUNDREDS)",
      "25,470 FIRST-CLASS RUNS (76 HUNDREDS)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 25,
          "innings": 48,
          "runs": 2015,
          "average": 42.87,
          "strikeRate": 51.52,
          "highestScore": "173",
          "centuries": 5,
          "fifties": 14,
          "fours": 258,
          "sixes": 1
        }
      }
    }
  },
  {
    "id": "ashton-agar",
    "name": "Ashton Agar",
    "country": "Australia",
    "countryCode": "AUS",
    "role": "all-rounder",
    "battingStyle": "Left-hand bat",
    "bowlingStyle": "Slow left-arm orthodox",
    "dateOfBirth": "1993-10-14",
    "placeOfBirth": "Melbourne, Victoria, Australia",
    "imageUrl": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    "isFallbackData": true,
    "badges": [
      "98 ON TEST DEBUT AT NO. 11 AT TRENT BRIDGE (WORLD RECORD)",
      "2021 T20 WORLD CUP WINNER",
      "T20I HAT-TRICK vs SOUTH AFRICA (5/24)"
    ],
    "stats": {
      "test": {
        "batting": {
          "matches": 5,
          "innings": 9,
          "runs": 195,
          "average": 24.37,
          "strikeRate": 63.31,
          "highestScore": "98",
          "centuries": 0,
          "fifties": 1
        },
        "bowling": {
          "matches": 5,
          "innings": 9,
          "overs": 147.2,
          "wickets": 9,
          "economy": 3.32,
          "average": 54.33,
          "bestBowlingInnings": "3/41"
        }
      },
      "odi": {
        "batting": {
          "matches": 22,
          "innings": 16,
          "runs": 274,
          "average": 22.83,
          "strikeRate": 85.35,
          "highestScore": "46",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 22,
          "innings": 22,
          "overs": 193.3,
          "wickets": 21,
          "economy": 5.34,
          "average": 49.23,
          "bestBowlingInnings": "2/31"
        }
      },
      "t20i": {
        "batting": {
          "matches": 47,
          "innings": 23,
          "runs": 277,
          "average": 15.38,
          "strikeRate": 114.93,
          "highestScore": "29",
          "centuries": 0,
          "fifties": 0
        },
        "bowling": {
          "matches": 47,
          "innings": 46,
          "overs": 166.4,
          "wickets": 48,
          "economy": 6.5,
          "average": 22.56,
          "strikeRate": 20.8,
          "bestBowlingInnings": "5/24",
          "fiveWickets": 1
        }
      }
    }
  }
];
