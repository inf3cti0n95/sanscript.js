/**
 * sanscript.js
 *
 * sanscript.js is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Produced by learnsanskrit.org
 *
 * Released under the MIT and GPL Licenses.
 */

(function(Sanscript) {
    "use strict";

    /* Schemes
     * =======
     * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
     * describe abugida scripts found in India. "Roman" schemes describe
     * manufactured alphabets that are meant to describe or encode Brahmi
     * scripts. Abugidas and alphabets are processed by separate algorithms
     * because of the unique difficulties involved with each.
     *
     * Brahmic consonants are stated without a virama. Roman consonants are
     * stated without the vowel 'a'.
     *
     * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
     * and "roman" for clarity.)
     */
    Sanscript.schemes = {

        /* Bengali
         * -------
         * 'va' and 'ba' are both rendered as ব.
         */
        bengali: {
            vowels: 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ'.split(' '),
            vowel_marks: 'া ি ী ু ূ ৃ ৄ ৢ ৣ ে ৈ ো ৌ'.split(' '),
            other_marks: 'ং ঃ ঁ'.split(' '),
            virama: ['্'],
            consonants: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল ব শ ষ স হ ळ ক্ষ জ্ঞ'.split(' '),
            symbols: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ॐ ঽ । ॥'.split(' '),
            other: '    ড ঢ  য '.split(' ')
        },

        /* Devanagari
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        devanagari: {
            vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ'.split(' '),
            vowel_marks: 'ा ि ी ु ू ृ ॄ ॢ ॣ े ै ो ौ'.split(' '),
            other_marks: 'ं ः ँ'.split(' '),
            virama: ['्'],
            consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' '),
            symbols: '० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥'.split(' '),
            zwj: ['\u200D'],
            skip: [''],
            accent: ['\u0951', '\u0952'],
            candra: ['ॅ'],
            other: 'क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ऱ'.split(' ')
        },

        /* Gujarati
         * --------
         * Sanskrit-complete.
         */
        gujarati: {
            vowels: 'અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ એ ઐ ઓ ઔ'.split(' '),
            vowel_marks: 'ા િ ી ુ ૂ ૃ ૄ ૢ ૣ ે ૈ ો ૌ'.split(' '),
            other_marks: 'ં ઃ ઁ'.split(' '),
            virama: ['્'],
            consonants: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ ળ ક્ષ જ્ઞ'.split(' '),
            symbols: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯ ૐ ઽ ૤ ૥'.split(' '),
            candra: ['ૅ']
        },

        /* Gurmukhi
         * --------
         * Missing R/RR/lR/lRR
         */
        gurmukhi: {
            vowels: 'ਅ ਆ ਇ ਈ ਉ ਊ     ਏ ਐ ਓ ਔ'.split(' '),
            vowel_marks: 'ਾ ਿ ੀ ੁ ੂ     ੇ ੈ ੋ ੌ'.split(' '),
            other_marks: 'ਂ ਃ ਁ'.split(' '),
            virama: ['੍'],
            consonants: 'ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ਸ਼ ਸ਼ ਸ ਹ ਲ਼ ਕ੍ਸ਼ ਜ੍ਞ'.split(' '),
            symbols: '੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯ ॐ ऽ । ॥'.split(' '),
            other: ' ਖ ਗ ਜ ਡ  ਫ  '.split(' ')
        },

        /* Kannada
         * -------
         * Missing lR/lRR
         */
        kannada: {
            vowels: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ   ಏ ಐ ಓ ಔ'.split(' '),
            vowel_marks: 'ಾ ಿ ೀ ು ೂ ೃ ೄ   ೇ ೈ ೋ ೌ'.split(' '),
            other_marks: 'ಂ ಃ ँ'.split(' '),
            virama: ['್'],
            consonants: 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ ಕ್ಷ ಜ್ಞ'.split(' '),
            symbols: '೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯ ಓಂ ಽ । ॥'.split(' '),
            other: '      ಫ  ಱ'.split(' ')
        },

        /* Malayalam
         * ---------
         * Sanskrit-complete.
         */
        malayalam: {
            vowels: 'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ ഏ ഐ ഓ ഔ'.split(' '),
            vowel_marks: 'ാ ി ീ ു ൂ ൃ ൄ ൢ ൣ േ ൈ ോ ൌ'.split(' '),
            other_marks: 'ം ഃ ँ'.split(' '),
            virama: ['്'],
            consonants: 'ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ക്ഷ ജ്ഞ'.split(' '),
            symbols: '൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯ ഓം ഽ । ॥'.split(' '),
            other: '        റ'.split(' ')
        },

        /* Oriya
         * -----
         * Missing lR/lRR vowel marks
         */
        oriya: {
            vowels: 'ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଌ ୡ ଏ ଐ ଓ ଔ'.split(' '),
            vowel_marks: 'ା ି ୀ ୁ ୂ ୃ ୄ   େ ୈ ୋ ୌ'.split(' '),
            other_marks: 'ଂ ଃ ଁ'.split(' '),
            virama: ['୍'],
            consonants: 'କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଵ ଶ ଷ ସ ହ ଳ କ୍ଷ ଜ୍ଞ'.split(' '),
            symbols: '୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯ ଓଂ ଽ । ॥'.split(' '),
            other: '    ଡ ଢ  ଯ '.split(' ')
        },

        /* Tamil
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most imcomplete of the Sanskrit schemes here.
         */
        tamil: {
            vowels: 'அ ஆ இ ஈ உ ஊ     ஏ ஐ ஓ ஔ'.split(' '),
            vowel_marks: 'ா ி ீ ு ூ     ே ை ோ ௌ'.split(' '),
            other_marks: 'ஂ ஃ '.split(' '),
            virama: ['்'],
            consonants: 'க க க க ங ச ச ஜ ச ஞ ட ட ட ட ண த த த த ந ப ப ப ப ம ய ர ல வ ஶ ஷ ஸ ஹ ள க்ஷ ஜ்ஞ'.split(' '),
            symbols: '௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௐ ऽ । ॥'.split(' '),
            other: '        ற'.split(' ')
        },

        /* Telugu
         * ------
         * Sanskrit-complete.
         */
        telugu: {
            vowels: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఏ ఐ ఓ ఔ'.split(' '),
            vowel_marks: 'ా ి ీ ు ూ ృ ౄ ౢ ౣ ే ై ో ౌ'.split(' '),
            other_marks: 'ం ః ఁ'.split(' '),
            virama: ['్'],
            consonants: 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష జ్ఞ'.split(' '),
            symbols: '౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯ ఓం ఽ । ॥'.split(' '),
            other: 'క ఖ       ఱ'.split(' ')
        },

        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         */
        iast: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au'.split(' '),
            other_marks: ['ṃ', 'ḥ', '~'],
            virama: [''],
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥".split(' ')
        },

        /* ITRANS
         * ------
         * One of the first romanization schemes -- and one of the most
         * complicated. For alternate forms, see the "allAlternates" variable
         * below.
         *
         * '_' is a "null" letter, which allows adjacent vowels.
         */
        itrans: {
            vowels: 'a A i I u U RRi RRI LLi LLI e ai o au'.split(' '),
            other_marks: ['M', 'H', '.N'],
            virama: ['.h'],
            consonants: 'k kh g gh ~N ch Ch j jh ~n T Th D Dh N t th d dh n p ph b bh m y r l v sh Sh s h L kSh j~n'.split(' '),
            symbols: '0 1 2 3 4 5 6 7 8 9 OM .a | ||'.split(' '),
            candra: ['.c'],
            zwj: ['{}'],
            skip: '_',
            accent: ["\\'", "\\_"],
            other: 'q K G z .D .Dh f Y R'.split(' ')
        },

        /* Harvard-Kyoto
         * -------------
         * A simple 1:1 mapping.
         */
        hk: {
            vowels: 'a A i I u U R RR lR lRR e ai o au'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: [''],
            consonants: 'k kh g gh G c ch j jh J T Th D Dh N t th d dh n p ph b bh m y r l v z S s h L kS jJ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 OM ' | ||".split(' ')
        },

        /* National Library at Kolkata
         * ---------------------------
         * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
         * identical to IAST. ṝ, ḷ, and ḹ are not part of the scheme proper.
         */
        kolkata: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ ē ai ō au'.split(' '),
            other_marks: ['ṃ', 'ḥ', '~'],
            virama: [''],
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥".split(' ')
        },

        /* Sanskrit Library Phonetic Basic
         * -------------------------------
         * With one ASCII letter per phoneme, this is the tersest transliteration
         * scheme in use today and is especially suited to computer processing.
         */
        slp1: {
            vowels: 'a A i I u U f F x X e E o O'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: [''],
            consonants: 'k K g G N c C j J Y w W q Q R t T d D n p P b B m y r l v S z s h L kz jY'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oM ' . ..".split(' ')
        },

        /* Velthuis
         * --------
         * A case-insensitive Sanskrit encoding.
         */
        velthuis: {
            vowels: 'a aa i ii u uu .r .rr .li .ll e ai o au'.split(' '),
            other_marks: '.m .h '.split(' '),
            virama: [''],
            consonants: 'k kh g gh "n c ch j jh ~n .t .th .d .d .n t th d dh n p ph b bh m y r l v ~s .s s h L k.s j~n'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 o.m ' | ||".split(' ')
        }
    };

    // Maps primary representations to a list of alternates.
    var allAlternates = {
            itrans: {
                A: ['aa'],
                I: ['ii', 'ee'],
                U: ['uu', 'oo'],
                RRi: ['R^i'],
                RRI: ['R^I'],
                LLi: ['L^i'],
                LLI: ['L^I'],
                '.h': [''],
                M: ['.m', '.n'],
                '~N': ['N^'],
                ch: ['c'],
                Ch: ['C', 'chh'],
                '~n': ['JN'],
                v: ['w'],
                Sh: ['S', 'shh'],
                kSh: ['kS', 'x'],
                'j~n': ['GY', 'dny'],
                OM: ['AUM'],
                ".a": ['~'],
                '|': ['.'],
                '||': ['..'],
                z: ['J']
            }
        },
        romanSchemes = {'iast': true, 'itrans': true, 'hk': true,
                        'kolkata': true, 'slp1': true, 'velthuis': true};
    
    // Add a "vowel_marks" field for each roman scheme
    (function() {
        for (var name in romanSchemes) {
            if (romanSchemes.hasOwnProperty(name)) {
                var scheme = Sanscript.schemes[name];
                scheme.vowel_marks = scheme.vowels.slice(1);
            }
        }
    })();

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     * 
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var alternates = allAlternates[from] || {},
            consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            marks = {},
            toScheme = Sanscript.schemes[to];
        for (var group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (var i = 0; i < fromGroup.length; i++) {
                var F = fromGroup[i],
                    T = toGroup[i],
                    alts = alternates[F] || [],
                    numAlts = alts.length,
                    j = 0;
                if (group === 'vowel_marks' || group === 'virama') {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === 'consonants' || group === 'other') {
                        consonants[F] = T;
                        
                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }
        return {consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama};
    };

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string 
     */
    var transliterateRoman = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            dataLength = data.length,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            maxTokenLength = 3,
            optVirama = options.virama,
            tempLetter,
            tempMark,
            tokenBuffer = '',
            toRoman = map.toRoman,
            transliterationEnabled = true,
            virama = map.virama;
        // Iterate while there's more left.
        for (var i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
            // Build up a token provided it's still possible.
            var difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }
            // Match all token substrings to our map.
            for (var j = 0; j < maxTokenLength; j++) {
                var token = tokenBuffer.substr(0,maxTokenLength-j);
                
                if (token === '##') {
                    transliterationEnabled = !transliterationEnabled;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                if ((tempLetter = letters[token]) !== undefined && transliterationEnabled) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== 'a') {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength-j);
                    break;
                } else if (j === maxTokenLength - 1) {
                    if (hadConsonant) {                
                        hadConsonant = false;
                        buf.push(virama);
                    }
                    buf.push(token);
                    tokenBuffer = tokenBuffer.substr(1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && optVirama) {
            buf.push(virama);
        }
        return buf.join('');
    };

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string 
     */
    var transliterateBrahmic = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            danglingHash = false,
            hadRomanConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman,
            transliterationEnabled = true;
        for (var i = 0, L; (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === '#') {
                if (danglingHash) {
                    transliterationEnabled = !transliterationEnabled;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    // Consecutive consonants -> implicit 'a'
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (!transliterationEnabled) {
                buf.push(L);
                continue;
            }
            
            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push('#');
                }
                if (hadRomanConsonant) {
                    // Consecutive consonants -> implicit 'a'
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                
                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters[L])) {
                    buf.push(temp);
                    hadRomanConsonant = toRoman && (L in consonants);
                } else {
                    buf.push(L);
                }
            }
        }
        // Ends in bare consonant -> implicit 'a'
        if (hadRomanConsonant) {
            buf.push('a');
        }
        return buf.join('');
    };

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the the destination script
     * @param options  transliteration options [optional]
     * @return         the finished string 
     */
    Sanscript.t = function(data, from, to, options) {
        options = options || {};
        var defaults = {
            virama: true
        };
        for (var key in defaults) {
            if (!options.hasOwnProperty(key)) {
                options[key] = defaults[key];
            }
        }

        var transMap = makeMap(from, to, options);

        if (from === 'itrans') {
            // Easy way out for "{\m+}".
            data = data.replace(/\{\\m\+\}/g,".h.N");
            // Easy way out for "\".
            data = data.replace(/\\([^'_]|$)/g, "##$1##");
        }
        if (transMap.fromRoman) {
            return transliterateRoman(data, transMap, options);
        } else {
            return transliterateBrahmic(data, transMap, options);
        }
    };

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function(name) {
        return romanSchemes.hasOwnProperty(name);
    };

    /**
     * Add a Brahmic scheme to Sanscript.
     *
     * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
     * have an inherent vowel sound, but roman consonants do not. This is the
     * main difference between these two types of scheme.
     *
     * A scheme definition is an associative array ("{}") that maps a group
     * name to a list of characters. These are the group names Sanscript uses,
     * with examples from the Devanagari scheme:
     *
     * vowels     :  vowels (14)
     *               (अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ)
     * vowel_marks:  vowel marks (13)
     *               (ा ि ी ु ू ृ ॄ ॢ ॣ े ै ो ौ)
     * other_marks:  The anusvara, visarga, and candrabindu (3)
     *               (ं ः ँ)
     * virama     :  The virama (1)
     *               (्)
     * consonants :  Various consonants (36)
     *               (क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ)
     * symbols    :  the digits, the letter ॐ, and some punctuation (14)
     *               (० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥)
     * zwj        :  the zero-width joiner (1) (ITRANS only)
     *               (\u200D)
     * skip       :  a "null" letter (1) (ITRANS only)
     *               ()
     * candra     :  a plain "candra" letter (1)
     *               (ॅ)
     * other      :  non-Sanskrit consonants (9)
     *               (क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ऱ)
     *
     * The first six groups ("vowels" through "symbols") are the most useful.
     * 
     * @param name    the scheme name
     * @param scheme  the scheme data itself. This should be constructed as
     *                described above.
     */
    Sanscript.addBrahmicScheme = function(name, scheme) {
        Sanscript.schemes[name] = scheme;
    };

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the commends on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */ 
    Sanscript.addRomanScheme = function(name, scheme) {
        if (!('vowel_marks' in scheme)) {
            scheme.vowel_marks = scheme.vowels.slice(1);
        }
        Sanscript.schemes[name] = scheme;
        romanSchemes[name] = true;
    };
}(window.Sanscript = window.Sanscript || {}));
