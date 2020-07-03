export class Utils {
  /**
   * Solution taken from s.o. Users Aaron Goldsmith and somethinghere, https://stackoverflow.com/questions/32589197/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
   * @param word
   */
  static titleCaseWord(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
}
