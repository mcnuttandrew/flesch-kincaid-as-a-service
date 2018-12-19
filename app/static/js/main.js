const getTextBody = () => document.querySelector('.textmsg');

const EASE_LABELS = [
    {min: 90, max: 100, annotation: 'Very easy to read. Easily understood by an average 11-year-old student.'},
    {min: 80, max: 89, annotation: 'Easy to read. Conversational English for consumers.'},
    {min: 70, max: 79, annotation: 'Fairly easy to read'},
    {min: 60, max: 69, annotation: 'Plain English. Easily understood by 13- to 15-year-old students'},
    {min: 50, max: 59, annotation: 'Fairly difficult to read'},
    {min: 30, max: 49, annotation: 'College	Level, difficult to read'},
    {min: -Infinity, max: 29, annotation: 'College graduate level.	Very difficult to read'}
];

const ARIS = [
    {score: 1, ageAnnotation: '5-6', annotation: 'Kindergarten'},
    {score: 2, ageAnnotation: '6-7', annotation: 'First/Second Grade'},
    {score: 3, ageAnnotation: '7-9', annotation: 'Third Grade'},
    {score: 4, ageAnnotation: '9-10', annotation: 'Fourth Grade'},
    {score: 5, ageAnnotation: '10-11', annotation: 'Fifth Grade'},
    {score: 6, ageAnnotation: '11-12', annotation: 'Sixth Grade'},
    {score: 7, ageAnnotation: '12-13', annotation: 'Seventh Grade'},
    {score: 8, ageAnnotation: '13-14', annotation: 'Eighth Grade'},
    {score: 9, ageAnnotation: '14-15', annotation: 'Ninth Grade'},
    {score: 10, ageAnnotation: '15-16', annotation: 'Tenth Grade'},
    {score: 11, ageAnnotation: '16-17', annotation: 'Eleventh Grade'},
    {score: 12, ageAnnotation: '17-18', annotation: 'Twelfth grade'},
    {score: 13, ageAnnotation: '18-24', annotation: 'College student'},
    {score: 14, ageAnnotation: '24+', annotation: 'Professor'}
];

const GRADED_SCORED = [
  {score: 17,	age: 'College graduate'},
  {score: 16,	age: 'College senior'},
  {score: 15,	age: 'College junior'},
  {score: 14,	age: 'College sophomore'},
  {score: 13,	age: 'College freshman'},
  {score: 12,	age: 'High school senior'},
  {score: 11,	age: 'High school junior'},
  {score: 10,	age: 'High school sophomore'},
  {score: 9,	age: 'High school freshman'},
  {score: 8,	age: 'Eighth grade'},
  {score: 7,	age: 'Seventh grade'},
  {score: 6,	age: 'Sixth grade'},
  {score: 5,	age: 'Fifth grade'},
  {score: 4,	age: 'Fourth grade'},
  {score: 3,	age: 'Third grade'},
  {score: 2,	age: 'Second grade'},
  {score: 1,	age: 'First grade'},
  {score: 0, age: 'Kindergarten'}
  // default Kindergarten
];

const DALL_CHALL = [
  {score: 10.0, annotation: 'Easily understood by a college graduate'},
  {score: 9.0, annotation: 'Easily understood by an average 13th to 15th-grade (college) student'},
  {score: 8.0, annotation: 'Easily understood by an average 11th or 12th-grade student'},
  {score: 7.0, annotation: 'Easily understood by an average 9th or 10th-grade student'},
  {score: 6.0, annotation: 'Easily understood by an average 7th or 8th-grade student'},
  {score: 5.0, annotation: 'Easily understood by an average 5th or 6th-grade student'},
  {score: -Infinity, annotation: 'Easily understood by an average 4th-grade student or lower'}
];

const GRADE_NUMBERED = val => {
  const {age} = GRADED_SCORED.find(({score}) => score <= Number(val));
  return `Appropriate for ${age} reading level`;
}

const ordinalMap = {1: 'st', 2: 'nd', 3: 'rd'};
const teensMap = {11: 'th', 12: 'th', 13: 'th'};
const getOrdinalSuffix = num => teensMap[num % 100] || ordinalMap[num % 10] || 'th';

const GRADES = [{
  displayName: 'Automated Readability Index',
  name: 'automated-readability-index',
  link: 'https://en.wikipedia.org/wiki/Automated_readability_index',
  buildDescription: val => {
    return ARIS.reduce((acc, {score, ageAnnotation, annotation}) => {
      return (score <= Number(val)) ?
        `Appropriate for ages ${ageAnnotation}, or a ${annotation} reading level` :
        acc;
    }, '');
  }
}, {
  displayName: 'Coleman-Liau index',
  name: 'coleman-liau-index',
  link: 'https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index',
  buildDescription: GRADE_NUMBERED
}, {
  displayName: 'Dale-Chall readability score',
  name: 'dale-chall-readability-score',
  link: 'https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula',
  buildDescription: val => DALL_CHALL.find(({score, annotation}) => val > score).annotation
}, {
  displayName: 'Flesch-Kincaid grade level',
  name: 'flesch-kincaid-grade',
  link: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch%E2%80%93Kincaid_grade_level',
  buildDescription: val => `Appropriate for a ${val}${getOrdinalSuffix(val)} grade level`
}, {
  displayName: 'Flesch Reading ease',
  name: 'flesch-reading-ease',
  link: 'https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch_reading_ease',
  buildDescription: val => EASE_LABELS.find(({min}) => val >= Number(min)).annotation
}, {
  displayName: 'Gunning-Fog index',
  name: 'gunning-fog',
  link: 'https://en.wikipedia.org/wiki/Gunning_fog_index',
  buildDescription: GRADE_NUMBERED
}, {
  displayName: 'Linsear-Write formula',
  name: 'linsear-write-formula',
  link: 'https://en.wikipedia.org/wiki/Linsear_Write',
  buildDescription: GRADE_NUMBERED
},
// {
//   displayName: 'Smog-index (Simple Measure of Gobbledygook)',
//   name: 'smog-index',
//   link: 'https://en.wikipedia.org/wiki/SMOG',
//   buildDescription: GRADE_NUMBERED
// }
]

document.querySelector('.submission').addEventListener('click', () => {
  fetch('/analyze', {
    method: 'POST',
    body: getTextBody().value
  })
  .then(response => response.json())
  .then(response => {
    document.querySelector('.report').setAttribute('style', 'display: flex');
    document.querySelector('.summary-content').innerHTML = response['text-standard'];
    document.querySelector('.grades').innerHTML = GRADES.map(row => {
      const {name, link, displayName, description, buildDescription} = row;
      const measureRow = `<span><a href=${link}>${displayName}</a>: ${response[name]}</span>`;
      const content = buildDescription && buildDescription(response[name]) || description || '';
      return `<div class='grade'>${measureRow}<div>${content}</div></div>`;
    }).join('\n');
  })
});

const PROUST = 'But I had seen first one and then another of the rooms in which I had slept during my life, and in the end I would revisit them all in the long course of my waking dream: rooms in winter, where on going to bed I would at once bury my head in a nest, built up out of the most diverse materials, the corner of my pillow, the top of my blankets, a piece of a shawl, the edge of my bed, and a copy of an evening paper, all of which things I would contrive, with the infinite patience of birds building their nests, to cement into one whole; rooms where, in a keen frost, I would feel the satisfaction of being shut in from the outer world (like the sea-swallow which builds at the end of a dark tunnel and is kept warm by the surrounding earth), and where, the fire keeping in all night, I would sleep wrapped up, as it were, in a great cloak of snug and savoury air, shot with the glow of the logs which would break out again in flame: in a sort of alcove without walls, a cave of warmth dug out of the heart of the room itself, a zone of heat whose boundaries were constantly shifting and altering in temperature as gusts of air ran across them to strike freshly upon my face, from the corners of the room, or from parts near the window or far from the fireplace which had therefore remained cold—or rooms in summer, where I would delight to feel myself a part of the warm evening, where the moonlight striking upon the half-opened shutters would throw down to the foot of my bed its enchanted ladder; where I would fall asleep, as it might be in the open air, like a titmouse which the breeze keeps poised in the focus of a sunbeam—or sometimes the Louis XVI room, so cheerful that I could never feel really unhappy, even on my first night in it: that room where the slender columns which lightly supported its ceiling would part, ever so gracefully, to indicate where the bed was and to keep it separate; sometimes again that little room with the high ceiling, hollowed in the form of a pyramid out of two separate storeys, and partly walled with mahogany, in which from the first moment my mind was drugged by the unfamiliar scent of flowering grasses, convinced of the hostility of the violet curtains and of the insolent indifference of a clock that chattered on at the top of its voice as though I were not there; while a strange and pitiless mirror with square feet, which stood across one corner of the room, cleared for itself a site I had not looked to find tenanted in the quiet surroundings of my normal field of vision: that room in which my mind, forcing itself for hours on end to leave its moorings, to elongate itself upwards so as to take on the exact shape of the room, and to reach to the summit of that monstrous funnel, had passed so many anxious nights while my body lay stretched out in bed, my eyes staring upwards, my ears straining, my nostrils sniffing uneasily, and my heart beating; until custom had changed the colour of the curtains, made the clock keep quiet, brought an expression of pity to the cruel, slanting face of the glass, disguised or even completely dispelled the scent of flowering grasses, and distinctly reduced the apparent loftiness of the ceiling.'

document.querySelector('.proust').addEventListener('click', () => {
  getTextBody().value = PROUST;
});

const POEM = 'Roses are red\n violets are blue\n I like to word good \n do you?';
document.querySelector('.poem').addEventListener('click', () => {
  getTextBody().value = POEM;
});
