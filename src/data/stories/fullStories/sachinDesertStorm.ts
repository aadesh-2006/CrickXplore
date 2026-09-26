import type { FullStory } from '../../../types/stories';

export const SACHIN_DESERT_STORM_FULL_STORY: FullStory = {
  slug: 'sachin-tendulkar-desert-storm-sharjah-1998',
  title: 'DESERT STORM',
  subtitle: 'The day Sachin Tendulkar turned a sandstorm into history',
  player: 'Sachin Tendulkar',
  playerId: 'sachin-tendulkar',
  year: 1998,
  date: '22–24 April 1998',
  matchContext: 'India vs Australia • Coca-Cola Cup 1998',
  tournament: 'Coca-Cola Cup 1998',
  venue: 'Sharjah Cricket Stadium, UAE',
  headlineScore: '143 & 134',
  readTime: '16 min read',
  tagline: 'Scorecards tell you what happened. Stories tell you why it mattered.',
  colorAccent: {
    primary: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    text: 'text-sky-400',
    border: 'border-sky-400/30',
  },
  sections: [
    {
      id: 'desert-storm-prologue',
      paragraphs: [
        "There are innings that win matches.",
        "There are innings that win tournaments.",
        "And then there are innings that become so deeply attached to a place, a moment and a feeling that the innings gets its own name.",
        "**Desert Storm.**",
        "22 April 1998.\n\nSharjah Cricket Stadium.\n\nAustralia versus India.",
        "Sachin Tendulkar walked out into the heat of the desert knowing that India were not simply playing Australia.",
        "They were playing the tournament.\n\nThey were playing the numbers.\n\nThey were playing the clock.\n\nAnd, eventually, they were playing the weather itself.",
        "What followed was 143 runs from 131 balls.\n\nNine fours.\n\nFive sixes.\n\nA strike rate of over 109.",
        "But the numbers alone don't explain why this innings became one of the most celebrated performances of Sachin's career.",
        "To understand that, we have to go back to Sharjah before the storm arrived."
      ]
    },
    {
      id: 'sharjah-was-already-sachins-stage',
      heading: "Sharjah was already Sachin's stage",
      image: {
        src: '/stories/sachin-desert-storm-warne.webp',
        alt: 'Sachin Tendulkar playing against Shane Warne and Australia in Sharjah',
        layout: 'landscape',
        float: 'right'
      },
      paragraphs: [
        "By 1998, Sharjah was not just another cricket ground.",
        "For Indian cricket fans, it was almost a second home.",
        "The stadium had become famous for hosting triangular tournaments and drawing enormous crowds, particularly from the South Asian expatriate community in the Gulf.\n\nAnd Sachin had already built a relationship with this ground.",
        "But the 1998 Coca-Cola Cup was different.\n\nIndia, Australia and New Zealand were competing.",
        "And Australia were not some ordinary opponent.\n\nThey were becoming one of the defining teams of the era.",
        "They had the Waugh brothers.\n\nRicky Ponting.\n\nMichael Bevan.\n\nShane Warne.\n\nDamien Fleming.\n\nMichael Kasprowicz.",
        "A team full of players who would go on to define Australian cricket for years.",
        "And standing at the other end was a 24-year-old Sachin Tendulkar who, by 1998, had already become the centre of India's batting universe.",
        "The battle was not just India versus Australia.\n\nIt was becoming something more personal.",
        "Australia had Shane Warne.\n\nIndia had Sachin.",
        "And Sachin had already spent the year making Australia uncomfortable.",
        "Earlier in 1998, he had dominated the Border-Gavaskar Trophy, scoring 446 runs at an average of 111.50.",
        "The Australians knew exactly who they had to stop.\n\nAnd Sachin knew exactly who was standing in his way."
      ]
    },
    {
      id: 'not-just-about-australia',
      heading: "But this wasn't just about Australia",
      paragraphs: [
        "The Coca-Cola Cup was a triangular series.\n\nIndia.\n\nAustralia.\n\nNew Zealand.\n\nEvery game mattered.",
        "And by the time 22 April arrived, India needed more than just a good performance.\n\nThey needed to understand the mathematics of qualification.",
        "New Zealand were in the race for the final.\n\nIndia's match against Australia was their final league game.\n\nAustralia were already in a strong position.\n\nIndia needed to put themselves ahead of New Zealand.",
        "The simplest way was to win.",
        "But there was another route.",
        "**Net run rate.**",
        "And that number would become incredibly important before the day was over.",
        "India needed **254 runs** to move ahead of New Zealand's net run rate and qualify for the final.",
        "So India were not simply chasing Australia's score.\n\nThey were chasing two different targets.",
        "One was the target on the scoreboard.\n\nThe other was the target hidden inside the tournament table.",
        "Nobody knew yet how important that distinction would become."
      ],
      keyStat: {
        value: '254 Runs',
        label: "Initial qualification mark required to surpass New Zealand's NRR"
      }
    },
    {
      id: '22-april-1998-australia-innings',
      heading: '22 April 1998',
      subheading: 'Australia won the toss',
      paragraphs: [
        "They chose to bat.\n\nAnd Australia batted like Australia.",
        "Mark Waugh made 81.\n\nRicky Ponting contributed 31.\n\nAnd then came Michael Bevan.",
        "The quiet destroyer.",
        "The man who could bat for 20 overs without seeming to do anything spectacular and somehow leave you staring at an enormous total.",
        "Bevan finished unbeaten on **101 from 103 balls**.",
        "Australia reached **284/7** in 50 overs.",
        "India had 285 to win.\n\nBut because of the qualification equation, there was something else in Sachin's mind.",
        "India didn't necessarily have to chase the entire 285.\n\nThey needed **254** to get ahead of New Zealand on net run rate.",
        "That was the number.\n\n254.",
        "Still, 285 was the official target.\n\nAnd Australia had put up a serious total."
      ],
      keyStat: {
        value: '284 / 7',
        label: 'Australia 50-over total powered by Michael Bevan (101*)'
      }
    },
    {
      id: 'then-the-desert-changed',
      heading: 'Then the desert changed',
      paragraphs: [
        "India began the chase.\n\nSourav Ganguly and Sachin Tendulkar opened.\n\nGanguly made 17.\n\nSachin stayed.",
        "And then, suddenly, the desert itself interrupted the match.",
        "A sandstorm swept across Sharjah.\n\nVisibility deteriorated.\n\nPlay stopped.",
        "For roughly 25 minutes, cricket disappeared.",
        "The players left the field.\n\nThe crowd waited.\n\nThe scoreboard stood still.\n\nThe desert had taken control.",
        "But the storm didn't simply delay the game.\n\nIt changed the mathematics.",
        "When play resumed, India's target was revised.\n\nTo win: **276 from 46 overs.**",
        "But remember that other number?\n\nThe qualification number?",
        "India now needed **237 from 46 overs** to move ahead of New Zealand and reach the final.",
        "That meant Sachin now had two jobs.\n\nWin the match if possible.",
        "But at the very least—\n\n**get India past 237.**",
        "The storm had literally changed the target.\n\nAnd Sachin responded by changing gears."
      ],
      keyStat: {
        value: '237 in 46 ov',
        label: 'Revised qualification target after the 25-minute sandstorm'
      }
    },
    {
      id: 'then-sachin-started-attacking',
      heading: 'Then Sachin started attacking',
      image: {
        src: '/stories/sachin-desert-storm-stance.jpg',
        alt: 'Sachin Tendulkar batting during the 1998 Desert Storm innings',
        layout: 'portrait',
        float: 'right'
      },
      paragraphs: [
        "There was no panic.\n\nNo wild slogging.\n\nJust timing.",
        "The kind of timing that made Sachin look like he had more time than everyone else on the field.",
        "Australia had Shane Warne.\n\nThey had Fleming.\n\nThey had Kasprowicz.\n\nThey had the attack of a team that knew how to close games.",
        "But Sachin began taking them apart.",
        "The ball disappeared through the covers.\n\nThen through midwicket.\n\nThen over the infield.",
        "And occasionally, into the stands.\n\nFive times.",
        "Nine boundaries along the ground and through the gaps.\n\nFive sixes into the Sharjah night.",
        "ICC records the innings as **143 from 131 balls**, with nine fours and five sixes.",
        "And the remarkable part wasn't simply how many runs he scored.\n\nIt was when he scored them.",
        "India had to maintain a scoring rate dictated by a tournament equation.",
        "Every over mattered.\n\nEvery boundary mattered.\n\nEvery single run had consequences.",
        "Sachin wasn't just batting.\n\nHe was calculating."
      ]
    },
    {
      id: 'century-arrived',
      heading: '100',
      paragraphs: [
        "The century arrived.\n\nAnother hundred against Australia.\n\nAnother reminder that 1998 had become Sachin's year.",
        "But this wasn't the end.\n\nIt was the middle.",
        "India still needed to push toward the qualification mark.",
        "Sachin continued.",
        "Australia kept trying different options.\n\nWarne.\n\nFleming.\n\nKasprowicz.\n\nMoody.\n\nSteve Waugh.\n\nNothing seemed to stop him.",
        "The scoreboard kept climbing.\n\nAnd the equation kept getting closer."
      ]
    },
    {
      id: 'two-hundred-approaching',
      heading: '200...',
      paragraphs: [
        "Then 220...\n\nThen 230...",
        "And suddenly, the number that had been sitting quietly in India's dressing room all afternoon was right in front of them.",
        "**237.**",
        "India needed that number to qualify.\n\nSachin was approaching it.",
        "The entire context of the innings had changed.",
        "At the start, people might have asked:\n\nCan India chase 285?",
        "Now the question was:\n\nCan India get to 237?",
        "And Sachin answered it."
      ]
    },
    {
      id: 'two-hundred-thirty-seven',
      heading: '237',
      image: {
        src: '/stories/sachin-desert-storm-graphic.jpg',
        alt: 'Sachin Tendulkar 143 off 131 balls Desert Storm record graphic',
        layout: 'portrait',
        float: 'left'
      },
      paragraphs: [
        "India crossed the qualification mark.\n\nThe final was theirs.\n\nThe match itself wasn't.",
        "Sachin kept going.\n\nIndia kept chasing.\n\nBut Australia had scored too much.",
        "Eventually, Sachin was dismissed for **143 from 131 balls**.\n\nHe had done almost everything.",
        "India finished on **250/5**.",
        "Australia won by 26 runs under the competition's rain-adjusted method.",
        "India had lost.",
        "But somehow, they had won the thing that mattered most.",
        "They had qualified for the final."
      ],
      keyStat: {
        value: '143 (131b)',
        label: 'Sachin Tendulkar score on 22 April 1998 (9 fours, 5 sixes)'
      }
    },
    {
      id: 'thats-why-143-was-different',
      heading: "That's why 143 was different",
      paragraphs: [
        "Look at the scorecard.\n\nAustralia won.\n\nIndia lost.\n\nSachin didn't finish the chase.",
        "So why is this remembered as one of the greatest innings of his career?",
        "Because sometimes the result column doesn't tell the whole story.",
        "Sachin's 143 had rescued India's tournament.",
        "The century wasn't enough to win the game, but it pushed India past New Zealand on net run rate and into the final. ICC specifically describes the innings as the performance that secured India's place in the final.",
        "And that's when the name stuck.",
        "The storm had interrupted the game.\n\nSachin had answered it.",
        "**Desert Storm.**"
      ]
    },
    {
      id: 'story-wasnt-over',
      heading: "But the story wasn't over",
      paragraphs: [
        "Two days later.\n\n24 April 1998.\n\nSame ground.\n\nSame opponent.\n\nSame Sachin Tendulkar.",
        "But this time, there was no complicated qualification equation.\n\nNo New Zealand waiting somewhere in the background.\n\nNo need to calculate net run rate.",
        "This time—\n\nit was the final.",
        "And there was another little detail.\n\nIt was Sachin Tendulkar's **25th birthday**.",
        "Australia batted first again.\n\nThey scored **272/9**.\n\nIndia needed 273.",
        "And the man who had just scored 143 against Australia two days earlier walked out again."
      ]
    },
    {
      id: 'the-birthday-innings',
      heading: 'The birthday innings',
      image: {
        src: '/stories/sachin-desert-storm-celebration.webp',
        alt: 'Sachin Tendulkar celebrating his match-winning 134 in the 1998 Sharjah final on his 25th birthday',
        layout: 'landscape',
        float: 'right'
      },
      paragraphs: [
        "Sachin didn't look like someone who had just played one of the most physically demanding innings of his career.\n\nHe looked like Sachin.",
        "The same straight drive.\n\nThe same balance.\n\nThe same ability to make world-class bowlers look ordinary.",
        "Australia tried again.\n\nBut Sachin had already seen this attack.\n\nAnd he was ready.",
        "He scored **134 from 131 balls**.\n\nEight fours.\n\nFive sixes.",
        "And this time, the result followed the performance.",
        "India chased the target.\n\nThey won by six wickets.",
        "Sachin had scored centuries in consecutive matches against Australia.\n\n**143.**\n\nThen:\n\n**134.**",
        "Both at Sharjah.\n\nBoth against Australia.\n\nBoth when the stakes were enormous.",
        "And the second one came on his birthday.",
        "ICC records the final as a six-wicket Indian victory, with Tendulkar's 134 steering the chase."
      ],
      keyStat: {
        value: '134 (131b)',
        label: 'Sachin Tendulkar score in the Final on 24 April 1998 (25th Birthday)'
      }
    },
    {
      id: 'two-innings-two-days-one-story',
      heading: 'Two innings. Two days. One story.',
      paragraphs: [
        "If you only remember the 143, you remember the storm.\n\nIf you remember the 134, you remember the trophy.\n\nBut together, they tell the real story.",
        "On 22 April, Sachin played an innings India needed to **survive**.\n\nOn 24 April, he played an innings India needed to **win**.",
        "The first one was chaos.\n\nThe second was control.",
        "The first one had a sandstorm.\n\nThe second had a birthday.",
        "The first one ended in defeat.\n\nThe second ended with India lifting the trophy.",
        "And between them, Sachin scored **277 runs**.\n\nIn two matches.\n\nAgainst Australia.\n\nAt Sharjah."
      ],
      keyStat: {
        value: '277 Runs',
        label: 'Combined runs scored by Sachin in 48 hours across the 2 matches'
      }
    },
    {
      id: 'australian-problem',
      heading: 'The Australian problem called Sachin Tendulkar',
      paragraphs: [
        "What makes the story even more remarkable is the timing.\n\nThis wasn't an ordinary Australian side.",
        "Australia were entering an era in which they would eventually become the dominant force in world cricket.\n\nThe same generation would go on to win the 1999, 2003 and 2007 World Cups.",
        "And yet, in Sharjah in 1998, one Indian batsman repeatedly found a way through them.",
        "The Australians could prepare for him.\n\nThey could change bowlers.\n\nThey could set fields.\n\nThey could bring Shane Warne into the attack.",
        "But when Sachin found his rhythm, the plans started disappearing.",
        "That is part of what made the Desert Storm innings so special.",
        "It wasn't simply a batsman scoring heavily against an average bowling attack.\n\nIt was Sachin taking on one of the strongest cricket teams in the world.",
        "And doing it when India desperately needed him."
      ]
    },
    {
      id: 'the-storm-became-the-metaphor',
      heading: 'The storm became the metaphor',
      paragraphs: [
        "Maybe that's why the name survived.\n\nBecause \"Desert Storm\" sounds bigger than a cricket innings.\n\nAnd the innings itself felt bigger than a cricket innings.",
        "The sky changed.\n\nThe match stopped.\n\nThe target changed.\n\nThe equation changed.\n\nAnd then Sachin changed the game.",
        "There was something almost cinematic about it.",
        "A desert afternoon.\n\nA sandstorm.\n\nA stadium full of people.\n\nAustralia sitting on 284.\n\nIndia needing 276.\n\nNew Zealand waiting on the qualification equation.\n\nAnd one batsman standing between India and elimination.",
        "The storm passed.\n\nSachin remained.\n\nAnd then he began hitting."
      ]
    },
    {
      id: 'what-the-scorecard-doesnt-tell-you',
      heading: "What the scorecard doesn't tell you",
      paragraphs: [
        "A scorecard tells you:\n\n**Sachin Tendulkar — 143 (131)**\n\n9 fours.\n\n5 sixes.\n\nIt tells you India made 250/5.\n\nIt tells you Australia won by 26 runs.\n\nIt tells you Sachin was Player of the Match.",
        "But it doesn't tell you what the number **237** felt like.",
        "It doesn't tell you what it meant for India to lose the match and still walk away knowing they had reached the final.",
        "It doesn't tell you what the sandstorm looked like.",
        "It doesn't tell you how the atmosphere changed when Sachin crossed the qualification mark.",
        "It doesn't tell you what it felt like to watch a 24-year-old take responsibility for an entire country's hopes.",
        "And that's why cricket remembers it."
      ]
    },
    {
      id: 'the-day-sachin-became-the-storm',
      heading: 'The day Sachin became the storm',
      paragraphs: [
        "There have been bigger scores.\n\nThere have been faster centuries.\n\nThere have been more important finals.\n\nBut some innings become immortal because of the circumstances surrounding them.",
        "Kapil Dev's 175 was about rescuing India from 17/5.\n\nSachin's 143 was about rescuing India from a tournament equation.",
        "And in both cases, the greatness wasn't just in the runs.\n\nIt was in **when the runs came.**",
        "On 22 April 1998, the desert tried to interrupt Sachin Tendulkar.\n\nIt stopped the match.\n\nIt changed the target.\n\nIt changed the mathematics.\n\nBut it couldn't stop him.",
        "The storm came.\n\nThe storm passed.\n\nSachin kept batting.",
        "And when he finally walked back after scoring 143, India had lost the match—\n\nbut they had won their place in the final.",
        "Two days later, on his 25th birthday, Sachin returned.\n\nThis time, he didn't just survive.\n\nHe finished the job.",
        "**134.**\n\n**India champions.**",
        "And Sharjah had witnessed something that cricket would remember forever.\n\nNot simply a century.\n\nNot simply a chase.\n\nNot simply a tournament.",
        "But a moment when the desert itself seemed to become part of the story.",
        "**The Desert Storm.**\n\n**22 April 1998.**\n\n**Sachin Tendulkar.**\n\n**143 off 131.**\n\n**And a storm that became immortal.**"
      ]
    }
  ],
  editorialNote: 'Archival verification note: Match details, tournament net-run-rate equations, and consecutive centuries cross-referenced with official 1998 Coca-Cola Cup Sharjah tournament registries.'
};
