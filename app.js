// The lists of most common (American) English words for several parts of speech.
// These are JavaScript arrays.

var nouns = ['time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact'];

var plural_nouns = ['times', 'persons', 'years', 'ways', 'days', 'things', 'men', 'worlds', 'lives', 'hands', 'parts', 'children', 'eyes', 'women', 'places', 'works', 'weeks', 'cases', 'points', 'governments', 'companies', 'numbers', 'groups', 'problems', 'facts'];

var adjectives = ['good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'];

var prepositions = ['to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'beneath', 'under', 'above'];

var articles = ['a', 'an', 'the'];

// Some Pride-and-Prejudice-specific words that will make the replacements more interesting.

var surnames_pnp = ['Bennet', 'Bingley', 'Netherfield', 'Long']

var pronouns = ['I', 'you', 'we', 'he', 'she', 'it', "y'all", 'they']

// The first couple pages of Pride and Prejudice.

var original_text = '<p> It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. </p>\n<p> However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families that he is considered as the rightful property of some one or other of their daughters. </p>\n<p> "My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?" </p>\n<p> Mr. Bennet replied that he had not. </p>\n<p> "But it is," returned she; "for Mrs. Long has just been here, and she told me all about it." </p>\n<p> Mr. Bennet made no answer. </p>\n<p> "Do not you want to know who has taken it?" cried his wife impatiently. </p>\n<p> "You want to tell me, and I have no objection to hearing it." </p>\n<p> This was invitation enough. </p>\n<p> "Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week." </p>\n<p> "What is his name?" </p>\n<p> "Bingley." </p>\n<p> "Is he married or single?" </p>\n<p> "Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!" </p>\n<p> "How so? how can it affect them?" </p>';

// This function puts the P&P text into the website.

function insertText () {
  document.getElementById('shakespeare').innerHTML = original_text;
}

// This variable makes the replace_random_word() function repeat by default.

var keep_going = true;

// The main function, which finds a random word in the text and if it finds it in one of the lists above,
// replaces it with a different word from that list.

function replace_random_word() {

  // Get text from the website and split it by word into a list (array), using spaces to delimit words.

  var the_text = document.getElementById('shakespeare').innerHTML;
  var the_text_words = the_text.split(' ');

  // Pick a random word in the array of words.

  var random_index = Math.floor(Math.random() * the_text_words.length);
  var random_word = the_text_words[random_index];

  // Find the punctuation-free word without erasing the random_word variable that contains the punctuation
  // (which we'll need later).

  var random_word_no_punc = random_word.replace(',', '').replace('.', '').replace('?', '').replace('!', '').replace(';', '');
  var random_word_no_punc_no_quote = random_word_no_punc.replace(/"/g, '');
  if (random_word[0] == '"') {
    leading_quote = true;
  } else {
    leading_quote = false;
  }
  if (random_word[random_word.length - 1] == '"') {
    trailing_quote = true;
  } else {
    trailing_quote = false;
  }  console.log(random_word, random_word_no_punc, random_word_no_punc_no_quote);

  // WORD REPLACEMENT LOOP

  // Search part-of-speech lists for the selected target word.
  // If present in one of those lists, replace it with another word in that list.

  if (nouns.includes(random_word_no_punc_no_quote)) {
    new_word = nouns[Math.floor(Math.random() * nouns.length)];
  } else if (plural_nouns.includes(random_word_no_punc_no_quote)) {
    new_word = plural_nouns[Math.floor(Math.random() * plural_nouns.length)];  } else if (adjectives.includes(random_word_no_punc_no_quote)) {
    new_word = adjectives[Math.floor(Math.random() * adjectives.length)];
  } else if (surnames_pnp.includes(random_word_no_punc_no_quote)) {
    new_word = surnames_pnp[Math.floor(Math.random() * surnames_pnp.length)];
  } else {
    new_word = random_word_no_punc_no_quote;
  }

  // If there was punctuation in the originally selected word, add it to the new word.

  if (random_word != random_word_no_punc && trailing_quote == false) {
    new_word += random_word[random_word.length-1];
  } else if (random_word != random_word_no_punc && trailing_quote == true) {
    new_word += random_word[random_word.length-2];
  }
  if (trailing_quote == true) {
    new_word += '"';
  }
  if (leading_quote == true) {
    new_word = '"' + new_word;
  }

  // Log the new word to the developer console for debugging purposes.

  console.log(new_word);

  // Put the new word (with punctuation, if necessary) into the word array.

  the_text_words[random_index] = new_word;

  // Use the word array to Reconstruct a website-friendly text block.

  var the_new_text = the_text_words.join(' ');

  // Replace the whole text block on the web page with the new text block (without reloading the page).

  document.getElementById('shakespeare').innerHTML = the_new_text;

  // Repeat the proess until keep_going = false.

  if (keep_going == true) {
    setTimeout('replace_random_word()', 20);
  }
}

// A function to stop the replace_random_word() function from looping.

function stop () {
  keep_going = false;
}
