const getTextBody = () => document.querySelector('.textmsg');

const GRADES = [
  {displayName: 'Automated Readability Index', name: 'automated-readability-index', link: 'https://en.wikipedia.org/wiki/Automated_readability_index'},
  {displayName: 'Coleman-Liau index', name: 'coleman-liau-index', link: 'https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index'},
  {displayName: 'Dale-Chall readability score', name: 'dale-chall-readability-score', link: 'https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula'},
  // {displayName: 'Number of difficult words', name: 'difficult-words'},
  {displayName: 'Flesch-Kinkiad grade level', name: 'flesch-kinkiad-grade', link: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch%E2%80%93Kincaid_grade_level'},
  {displayName: 'Flesch Reading ease', name: 'flesch-reading-ease', link: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch_reading_ease'},
  {displayName: 'Gunning-Fog index', name: 'gunning-fog', link: 'https://en.wikipedia.org/wiki/Gunning_fog_index'},
  {displayName: 'Linsear-Write formula', name: 'linsear-write-formula', link: 'https://en.wikipedia.org/wiki/Linsear_Write'},
  {displayName: 'Smog-index', name: 'smog-index', link: 'https://en.wikipedia.org/wiki/SMOG'}
]
// text-standard

document.querySelector('.submission').addEventListener('click', () => {
  fetch('/analyze', {
    method: "POST",
    body: getTextBody().value
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
    const grades = GRADES.map(({name, link, displayName}) => {
      return `<div><a href=${link}>${displayName}</a>: ${response[name]}</div>`;
    }).join('\n')

    document.querySelector('.report').innerHTML = `<h3>Ledgibility Report</h3><h5>Summary: ${response['text-standard']}</h5><div class="flex-down">${grades}</div>`;

  })
});

const PROUST = "But I had seen first one and then another of the rooms in which I had slept during my life, and in the end I would revisit them all in the long course of my waking dream: rooms in winter, where on going to bed I would at once bury my head in a nest, built up out of the most diverse materials, the corner of my pillow, the top of my blankets, a piece of a shawl, the edge of my bed, and a copy of an evening paper, all of which things I would contrive, with the infinite patience of birds building their nests, to cement into one whole; rooms where, in a keen frost, I would feel the satisfaction of being shut in from the outer world (like the sea-swallow which builds at the end of a dark tunnel and is kept warm by the surrounding earth), and where, the fire keeping in all night, I would sleep wrapped up, as it were, in a great cloak of snug and savoury air, shot with the glow of the logs which would break out again in flame: in a sort of alcove without walls, a cave of warmth dug out of the heart of the room itself, a zone of heat whose boundaries were constantly shifting and altering in temperature as gusts of air ran across them to strike freshly upon my face, from the corners of the room, or from parts near the window or far from the fireplace which had therefore remained cold—or rooms in summer, where I would delight to feel myself a part of the warm evening, where the moonlight striking upon the half-opened shutters would throw down to the foot of my bed its enchanted ladder; where I would fall asleep, as it might be in the open air, like a titmouse which the breeze keeps poised in the focus of a sunbeam—or sometimes the Louis XVI room, so cheerful that I could never feel really unhappy, even on my first night in it: that room where the slender columns which lightly supported its ceiling would part, ever so gracefully, to indicate where the bed was and to keep it separate; sometimes again that little room with the high ceiling, hollowed in the form of a pyramid out of two separate storeys, and partly walled with mahogany, in which from the first moment my mind was drugged by the unfamiliar scent of flowering grasses, convinced of the hostility of the violet curtains and of the insolent indifference of a clock that chattered on at the top of its voice as though I were not there; while a strange and pitiless mirror with square feet, which stood across one corner of the room, cleared for itself a site I had not looked to find tenanted in the quiet surroundings of my normal field of vision: that room in which my mind, forcing itself for hours on end to leave its moorings, to elongate itself upwards so as to take on the exact shape of the room, and to reach to the summit of that monstrous funnel, had passed so many anxious nights while my body lay stretched out in bed, my eyes staring upwards, my ears straining, my nostrils sniffing uneasily, and my heart beating; until custom had changed the colour of the curtains, made the clock keep quiet, brought an expression of pity to the cruel, slanting face of the glass, disguised or even completely dispelled the scent of flowering grasses, and distinctly reduced the apparent loftiness of the ceiling."

document.querySelector('.proust').addEventListener('click', () => {
  getTextBody().value = PROUST;
});

const POEM = "Roses are red\n violets are blue\n I like to read \n do you?";
document.querySelector('.poem').addEventListener('click', () => {
  getTextBody().value = POEM;
});
