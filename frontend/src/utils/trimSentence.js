function trimSentence(sentence, maxCharacters) {
  let trimmed = sentence;
  if (sentence.length > maxCharacters) {
    trimmed = sentence.substr(0, maxCharacters);

    if (sentence[maxCharacters + 1] !== ' ') {
      trimmed = trimmed.substr(0, trimmed.lastIndexOf(' '));
    }
    
    trimmed = `${trimmed}...`;
  }

  return trimmed;
}

export default trimSentence;