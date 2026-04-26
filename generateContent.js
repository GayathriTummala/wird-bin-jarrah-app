const fs = require('fs');
const path = require('path');

const contentData = [
  {
    id: 1,
    title: "", titleAr: "",
    textAr: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    text: "I seek refuge in Allah from the accursed Satan."
  },
  {
    id: 2,
    title: "(Al-Fatihah)", titleAr: "(الفاتحة)",
    textAr: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّجِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\n[All] praise is [due] to Allah, Lord of the worlds ۝ The Entirely Merciful, the Especially Merciful ۝ Sovereign of the Day of Recompense ۝ It is You we worship and You we ask for help ۝ Guide us to the straight path ۝ The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray ۝",
    needsCounter: true
  },
  {
    id: 3,
    title: "(Al-Baqarah)", titleAr: "(البقرة)",
    textAr: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nالم ۝ ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ ۝ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ۝ وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝ أُولَئِكَ عَلَى هُدًى مِّن رَّبِّهِمْ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ ۝",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\nAlif, Lam, Meem ۝ This is the Book about which there is no doubt, a guidance for those conscious of Allah ۝ Who believe in the unseen, establish prayer, and spend out of what We have provided for them ۝ And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith] ۝ Those are upon [right] guidance from their Lord, and it is those who are the successful ۝"
  },
  {
    id: 4,
    title: "(Al-Baqarah)", titleAr: "(البقرة)",
    textAr: "وَإِلَهُكُمْ إِلَهٌ وَاحِدٌ لَّا إِلَهَ إِلَّا هُوَ الرَّحْمَنُ الرَّجِيمُ ۝",
    text: "And your god is one God. There is no deity [worthy of worship] except Him, the Entirely Merciful, the Especially Merciful ۝"
  },
  {
    id: 5,
    title: "(Al-Baqarah)", titleAr: "(البقرة)",
    textAr: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ ۝",
    text: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great ۝"
  },
  {
    id: 6,
    title: "(Al-Baqarah)", titleAr: "(البقرة)",
    textAr: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ۝",
    text: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], 'We make no distinction between any of His messengers.' And they say, 'We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination.' ۝ Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. 'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.' ۝"
  },
  {
    id: 7,
    title: "(Al Imran)", titleAr: "(آل عمران)",
    textAr: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ لَا إِلَهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ ۝",
    text: "Allah witnesses that there is no deity except Him, and [so do] the angels and those of knowledge - [that He is] maintaining [creation] in justice. There is no deity except Him, the Exalted in Might, the Wise ۝"
  },
  {
    id: 8,
    title: "(Al-A'raf)", titleAr: "(الأعراف)",
    textAr: "إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَى عَلَى الْعَرْشِ يُغْشِي اللَّيْلَ النَّهَارَ يَطْلُبُهُ حَثِيثًا وَالشَّمْسَ وَالْقَمَرَ وَالنُّجُومَ مُسَخَّرَاتٍ بِأَمْرِهِ أَلَا لَهُ الْخَلْقُ وَالْأَمْرُ تَبَارَكَ اللَّهُ رَبُّ الْعَالَمِينَ ۝ ادْعُوا رَبَّكُمْ تَضَرُّعًا وَخُفْيَةً إِنَّهُ لَا يُحِبُّ الْمُعْتَدِينَ ۝ وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ ۝",
    text: "Indeed, your Lord is Allah, who created the heavens and earth in six days and then established Himself above the Throne. He covers the night with the day, [another night] chasing it rapidly; and [He created] the sun, the moon, and the stars, subjected by His command. Unquestionably, His is the creation and the command; blessed is Allah, Lord of the worlds ۝ Call upon your Lord in humility and privately; indeed, He does not like transgressors ۝ And cause not corruption upon the earth after its reformation. And invoke Him in fear and aspiration. Indeed, the mercy of Allah is near to the doers of good ۝"
  },
  {
    id: 9,
    title: "(At-Tawbah)", titleAr: "(التوبة)",
    textAr: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ ۝",
    text: "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne ۝"
  },
  {
    id: 10,
    title: "(Al-Mu'minun)", titleAr: "(المؤمنون)",
    textAr: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ ۝ فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ لَا إِلَهَ إِلَّا هُوَ رَبُّ الْعَرْشِ الْكَرِيمِ ۝ وَمَن يَدْعُ مَعَ اللَّهِ إِلَهًا آخَرَ لَا بُرْهَانَ لَهُ بِهِ فَإِنَّمَا حِسَابُهُ عِندَ رَبِّهِ إِنَّهُ لَا يُفْلِحُ الْكَافِرُونَ ۝ وَقُل رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ ۝",
    text: "Then did you think that We created you uselessly and that to Us you would not be returned? ۝ So exalted is Allah, the Sovereign, the Truth; there is no deity except Him, Lord of the Noble Throne ۝ And whoever invokes besides Allah another deity for which he has no proof - then his account is only with his Lord. Indeed, the disbelievers will not succeed ۝ And say, 'My Lord, forgive and have mercy, and You are the best of the merciful.' ۝"
  },
  {
    id: 11,
    title: "(Ar-Rum)", titleAr: "(الروم)",
    textAr: "فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ ۝ وَلَهُ الْحَمْدُ فِي السَّمَاوَاتِ وَالْأَرْضِ وَعَشِيًّا وَحِينَ تُظْهِرُونَ ۝ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَيُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا وَكَذَلِكَ تُخْرَجُونَ ۝",
    text: "So exalted is Allah when you reach the evening and when you reach the morning ۝ And to Him is [due all] praise throughout the heavens and the earth. And [exalted is He] at night and when you are at noon ۝ He brings the living out of the dead and brings the dead out of the living and brings to life the earth after its lifelessness. And thus will you be brought out ۝"
  },
  {
    id: 12,
    title: "(In the morning it is said: We have reached the morning)", titleAr: "(في الصباح يقال أصبحنا)",
    textAr: "بسم الله\nامسينا بالله الذي ليس شيء منه ممتنع وبعزة الله التي لا ترام ولا تضام وسلطان الله المنيع نحتجب وبأسماء الله الحسنى كلها عائذاً بالله من الابالسة ومن شر شياطين الإنس والجن ومن شر كل معلن أو مسر ومن شر ما يكمن بالليل ويخرج بالنهار أو يكمن بالنهار ويخرج بالليل ومن شر ما خلق وذرأ وبرأ ومن شر إبليس وجنوده ومن شر كل دابة أنت آخذ بناصيتها ان ربي على صراط مستقيم\nأعوذ بالله مما استعاذ به موسى وعيسى وإبراهيم الذي وفّى من شر ما خلق وذرأ وبرأ ومن شر إبليس وجنوده ومن شر ما يتقى",
    text: "In the name of Allah\nWe have reached the evening by Allah, from Whom nothing is prevented, and by the might of Allah which cannot be sought nor wronged, and by the impenetrable authority of Allah we are veiled, and by all the beautiful names of Allah, seeking refuge in Allah from the devils, and from the evil of the devils of mankind and jinn, and from the evil of everything declared or hidden, and from the evil of what hides by night and comes out by day, or hides by day and comes out by night, and from the evil of what He created and multiplied and originated, and from the evil of Iblees and his soldiers, and from the evil of every creature You take by the forelock. Indeed, my Lord is on a straight path.\nI seek refuge in Allah from that which Moses, Jesus, and Abraham, who fulfilled [his obligations], sought refuge, from the evil of what He created, multiplied and originated, and from the evil of Iblees and his soldiers, and from the evil of what is feared."
  },
  {
    id: 13,
    title: "(As-Saffat)", titleAr: "(الصافات)",
    textAr: "أعوذ بالله السميع العليم من الشيطان الرجيم\nبِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nوَالصَّافَّاتِ صَفًّا ۝ فَالزَّاجِرَاتِ زَجْرًا ۝ فَالتَّالِيَاتِ ذِكْرًا ۝ إِنَّ إِلَهَكُمْ لَوَاحِدٌ ۝ رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا وَرَبُّ الْمَشَارِقِ ۝ إِنَّا زَيَّنَّا السَّمَاءَ الدُّنْيَا بِزِينَةٍ الْكَوَاكِبِ ۝ وَحِفْظًا مِّن كُلِّ شَيْطَانٍ مَّارِدٍ ۝ لَّا يَسَّمَّعُونَ إِلَى الْمَلَإِ الْأَعْلَى وَيُقْذَفُونَ مِن كُلِّ جَانِبٍ ۝ دُحُورًا وَلَهُمْ عَذَابٌ وَاصِبٌ ۝ إِلَّا مَنْ خَطِفَ الْخَطْفَةَ فَأَتْبَعَهُ شِهَابٌ ثَاقِبٌ ۝ فَاسْتَفْتِهِمْ أَهُمْ أَشَدُّ خَلْقًا أَم مَّنْ خَلَقْنَا إِنَّا خَلَقْنَاهُم مِّن طِينٍ لَّازِبٍ ۝ بَلْ عَجِبْتَ وَيَسْخَرُونَ ۝ وَإِذَا ذُكِّرُوا لَا يَذْكُرُونَ ۝ وَإِذَا رَأَوْا آيَةً يَسْتَسْخِرُونَ ۝",
    text: "I seek refuge in Allah, the Hearing, the Knowing, from the accursed Satan.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful.\nBy those [angels] lined up in rows ۝ And those who drive [the clouds] ۝ And those who recite the message ۝ Indeed, your God is One ۝ Lord of the heavens and the earth and that between them and Lord of the sunrises ۝ Indeed, We have adorned the nearest heaven with an adornment of stars ۝ And as protection against every rebellious devil ۝ [So] they may not listen to the exalted assembly [of angels] and are pelted from every side ۝ Repelled; and for them is a constant punishment ۝ Except one who snatches [some words] by theft, but they are pursued by a burning flame, piercing [in brightness] ۝ Then inquire of them, [O Muhammad], 'Are they a stronger [or more difficult] creation or those [others] We have created?' Indeed, We created them from sticky clay ۝ But you wonder, while they mock ۝ And when they are reminded, they remember not ۝ And when they see a sign, they ridicule ۝"
  },
  {
    id: 14,
    title: "(Ar-Rahman)", titleAr: "(الرحمن)",
    textAr: "يَا مَعْشَرَ الْجِنِّ وَالْإِنسِ إِنِ اسْتَطَعْتُمْ أَن تَنفُذُوا مِنْ أَقْطَارِ السَّمَاوَاتِ وَالْأَرْضِ فَانفُذُوا لَا تَنفُذُونَ إِلَّا بِسُلْطَانٍ ۝",
    text: "O company of jinn and mankind, if you are able to pass beyond the regions of the heavens and the earth, then pass. You will not pass except by authority [from Allah] ۝"
  },
  {
    id: 15,
    title: "(Al-Hashr)", titleAr: "(الحشر)",
    textAr: "لَوْ أَنزَلْنَا هَذَا الْقُرْآنَ عَلَى جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ لَعَلَّهُمْ يَتَفَكَّرُونَ ۝ هُوَ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ هُوَ الرَّحْمَنُ الرَّحِيمُ ۝ هُوَ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ ۝ هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنَى يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ الْعَزِيزُ الْحَكِيمُ ۝",
    text: "If We had sent down this Qur'an upon a mountain, you would have seen it humbled and coming apart from fear of Allah. And these examples We present to the people that perhaps they will give thought ۝ He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful ۝ He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Perfection, the Bestower of Faith, the Overseer, the Exalted in Might, the Compeller, the Superior. Exalted is Allah above whatever they associate with Him ۝ He is Allah, the Creator, the Inventor, the Fashioner; to Him belong the best names. Whatever is in the heavens and earth is exalting Him. And He is the Exalted in Might, the Wise ۝"
  },
  {
    id: 16,
    title: "(Al-Ikhlas)", titleAr: "(الإخلاص)",
    textAr: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۝",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\nSay, 'He is Allah, [who is] One ۝ Allah, the Eternal Refuge ۝ He neither begets nor is born ۝ Nor is there to Him any equivalent ۝'",
    needsCounter: true
  },
  {
    id: 17,
    title: "(Al-Falaq)", titleAr: "(الفلق)",
    textAr: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\nSay, 'I seek refuge in the Lord of daybreak ۝ From the evil of that which He created ۝ And from the evil of darkness when it settles ۝ And from the evil of the blowers in knots ۝ And from the evil of an envier when he envies ۝'",
    needsCounter: true
  },
  {
    id: 18,
    title: "(An-Nas)", titleAr: "(الناس)",
    textAr: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّجِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ ۝",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\nSay, 'I seek refuge in the Lord of mankind ۝ The Sovereign of mankind ۝ The God of mankind ۝ From the evil of the retreating whisperer ۝ Who whispers [evil] into the breasts of mankind ۝ From among the jinn and mankind ۝'",
    needsCounter: true
  },
  {
    id: 19,
    title: "", titleAr: "",
    textAr: "أعوذ بالله السميع العليم من الشيطان الرجيم من همزه ونفخه ونفثه.",
    text: "I seek refuge in Allah, the All-Hearing, the All-Knowing, from the accursed Satan, from his madness, his arrogance, and his poetry.",
    needsCounter: true
  },
  {
    id: 20,
    title: "", titleAr: "",
    textAr: "بسم الله الرحمن الرحيم\nبسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.\nIn the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.",
    needsCounter: true
  },
  {
    id: 21,
    title: "", titleAr: "",
    textAr: "بسم الله ذي الشأن، عظيم السلطان شديد البرهان قوي الأركان ما شاء الله كان، أعوذ بالله من كل شيطان إنس وجان.",
    text: "In the name of Allah, Owner of Majesty, Great in Power, Strong in Proof, Firm in Foundations. Whatever Allah wills, is. I seek refuge in Allah from every devil among mankind and jinn.",
    needsCounter: true
  },
  {
    id: 22,
    title: "", titleAr: "",
    textAr: "أعوذ بكلمات الله التامات من شر ما خلق.",
    text: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    needsCounter: true
  },
  {
    id: 23,
    title: "", titleAr: "",
    textAr: "أعوذ بكلمات الله التامة، من كل شيطان وهامة، ومن كل عين لامة.",
    text: "I seek refuge in the perfect words of Allah, from every devil and every poisonous pest, and from every evil, harmful eye.",
    needsCounter: true
  },
  {
    id: 24,
    title: "", titleAr: "",
    textAr: "أعوذ بكلمات الله التامات التي لا يجاوزهن بر ولا فاجر من شر ما خلق وذرأ وبرأ ومن شر ما ينزل من السماء ومن شر ما يعرج فيها، ومن شر ما ذرأ في الأرض ومن شر ما يخرج منها، ومن شر فتن الليل والنهار ومن شر طوارق الليل والنهار، إلا طارقاً يطرق بخير يا رحمان.",
    text: "I seek refuge in the perfect words of Allah, which neither the righteous nor the wicked can transgress, from the evil of what He has created, multiplied, and originated, and from the evil of what descends from the sky and what ascends in it, and from the evil of what is created in the earth and what comes out of it, and from the evil of the trials of night and day, and from the evil of the night-callers and day-callers, except one who calls with good, O Most Merciful.",
    needsCounter: true
  },
  {
    id: 25,
    title: "", titleAr: "",
    textAr: "أعوذ بكلمات الله التامة من غضبه وعقابه، ومن شر عباده، ومن همزات الشياطين، وان يحضرون.",
    text: "I seek refuge in the perfect words of Allah from His anger and punishment, and from the evil of His servants, and from the suggestions of the devils, and from their presence.",
    needsCounter: true
  },
  {
    id: 26,
    title: "", titleAr: "",
    textAr: "اللهم اني اعوذ بوجهك الكريم وكلماتك التامات من شر ما أنت اخذ بناصيته، اللهم انت تكشف المأثم والمغرم اللهم انه لا يُهزَمُ جُنْدُك ولا يُخْلَفُ وَعْدُك سبحانك وبحمدك.",
    text: "O Allah, I seek refuge in Your noble Face and Your perfect words from the evil of that which You take by the forelock. O Allah, You remove sin and debt. O Allah, Your army cannot be defeated, and Your promise cannot be broken. Glory and praise be to You.",
    needsCounter: true
  },
  {
    id: 27,
    title: "", titleAr: "",
    textAr: "أعوذ بوجه الله العظيم الذي لا شيء أعظم منه، وبكلماته التامات التي لا يجاوزهن بر ولا فاجر، وأسماء الله الحسنى كلها ما علمت منها وما لم أعلم، من شر ما خلق وذرأ وبرأ، ومن شر كل ذي شر لا نطيق شره، ومن شر كل ذي شر أنت اخذ بناصيته ان ربي على صراط مستقيم.",
    text: "I seek refuge in the Face of Allah the Great, than which there is nothing greater, and in His perfect words which neither the righteous nor the wicked can transgress, and in all the beautiful names of Allah, those I know and those I do not know, from the evil of what He created, multiplied, and originated, and from the evil of every possessor of evil whose evil we cannot bear, and from the evil of every possessor of evil whom You take by the forelock. Indeed, my Lord is on a straight path.",
    needsCounter: true
  },
  {
    id: 28,
    title: "", titleAr: "",
    textAr: "اللهم أنت ربي لا إله إلا أنت عليك توكلت رب العرش العظيم، ما شاء الله كان وما لم يشأ لم يكن لا حول ولا قوة إلا بالله أعلم ان الله على كل شيء قدير، وإن الله قد احاط بكل شيء علما، واحصى كل شيء عدداً، اللهم إني أعوذ بك من شر نفسي ومن شر الشيطان وشركه ومن شر كل دابة أنت اخذ بناصيته ان ربي على صراط مستقيم.",
    text: "O Allah, You are my Lord; there is no deity except You. Upon You I rely, Lord of the Great Throne. Whatever Allah wills, is, and whatever He does not will, is not. There is no power and no strength except with Allah. I know that Allah is competent over all things, and that Allah has encompassed all things in knowledge, and has enumerated all things in number. O Allah, I seek refuge in You from the evil of my soul, and from the evil of Satan and his polytheism, and from the evil of every creature You take by the forelock. Indeed, my Lord is on a straight path.",
    needsCounter: true
  },
  {
    id: 29,
    title: "", titleAr: "",
    textAr: "تحصنت بالله الذي لا إله إلا هو إلهي وإله كل شيء، واعتصمت بربي ورب كل شيء، وتوكلت على الحي الذي لا يموت، واستدفعت الشر بلا حول ولا قوة إلا بالله حسبي الله ونعم الوكيل حسبي الرب من العباد حسبي الخالق من المخلوق حسبي الرازق من المرزوق حسبي الذي هو حسبي، حسبي الذي بيده ملكوت كل شيء وهو يجير ولا يجار عليه حسبي الله وكفى سمع الله من دعى ليس وراء الله مرمى حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم.",
    text: "I fortify myself with Allah, other than Whom there is no deity, my God and the God of all things. I hold fast to my Lord and the Lord of all things, and I rely upon the Ever-Living who does not die. I repel evil by 'There is no power and no strength except with Allah.' Sufficient for me is Allah, and [He is] the best Disposer of affairs. Sufficient is the Lord over the servants. Sufficient is the Creator over the created. Sufficient is the Provider over the provided for. Sufficient is He who is my sufficiency. Sufficient is He in whose hand is the dominion of all things, and He protects while against Him there is no protector. Sufficient is Allah, and enough. Allah hears whoever calls. There is no goal beyond Allah. Sufficient for me is Allah; there is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.",
    needsCounter: true
  },
  {
    id: 30,
    title: "", titleAr: "",
    textAr: "اللهم صلي على محمد وعلى آل محمد كما صليت على آل إبراهيم انك حميد مجيد وبارك على محمد وعلى آل محمد كما باركت على آل إبراهيم انك حميد مجيد.",
    text: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon the family of Abraham. Indeed, You are Praiseworthy and Glorious. And bless Muhammad and the family of Muhammad, as You blessed the family of Abraham. Indeed, You are Praiseworthy and Glorious.",
  },
  {
    id: 31,
    title: "", titleAr: "",
    textAr: "بسم الله الرحمن الرحيم عن يميني\nبسم الله الرحمن الرحيم عن شمالي\nبسم الله الرحمن الرحيم بين يدي\nبسم الله الرحمن الرحيم من خلفي\nبسم الله الرحمن الرحيم من فوقي\nبسم الله الرحمن الرحيم من جميع جوانبي\nبسم الله الرحمن الرحيم قابض على ناصيتي",
    text: "In the name of Allah, the Entirely Merciful, the Especially Merciful, on my right.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, on my left.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, in front of me.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, behind me.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, above me.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, from all my sides.\nIn the name of Allah, the Entirely Merciful, the Especially Merciful, grasping my forelock.",
  },
  {
    id: 32,
    title: "", titleAr: "",
    textAr: "أعوذ بعزة الله وعظمته، وبعزة الله وقدرته، وبعزة الله وسلطانه وبعز جلال الله وبعز الله من شر ما خلق وذرأ وبرأ .",
    text: "I seek refuge in the might of Allah and His greatness, and in the might of Allah and His power, and in the might of Allah and His authority, and in the might of the majesty of Allah, and in the might of Allah, from the evil of what He created, multiplied, and originated.",
  },
  {
    id: 33,
    title: "", titleAr: "",
    textAr: "ومن شر ما تحت الثرى ومن شر كل دابة ربي اخذ بناصيتها ان ربي على صراط مستقيم ولا حول ولا قوة إلا بالله العلي العظيم ملجأ كل هارب ومأوى كل خائف لا حول ولا قوة إلا بالله العلي العظيم اقي بها نفسي وديني وأهلي ومالي لا حول ولا قوة إلا بالله العلي العظيم انجو بها من إبليس وخيله ورجله وشياطينه ومردته واعوانه وجميع الإنس والجن وشرورهم.",
    text: "And from the evil of what is beneath the earth, and from the evil of every creature my Lord takes by its forelock. Indeed, my Lord is on a straight path. And there is no power and no strength except with Allah, the Most High, the Great, the refuge of every fleer and the shelter of every fearful one. There is no power and no strength except with Allah, the Most High, the Great. With it, I protect my soul, my religion, my family, and my wealth. There is no power and no strength except with Allah, the Most High, the Great. With it, I am saved from Iblees, his cavalry, his infantry, his devils, his rebellious ones, his helpers, and all mankind and jinn and their evils.",
  },
  {
    id: 34,
    title: "", titleAr: "",
    textAr: "لا حول ولا قوة إلا بالله العلي العظيم امتنع بها من ظُلم من اراد ظلمي من جميع خلق الله.\nلا حول ولا قوة إلا بالله اكف بها عدوان من اعتدى عليّ من جميع خلق الله لا حول ولا قوة إلا بالله أَتْعَسُ بها جُهْدَ من بَغى عليّ من جميع خلق الله.\nلا حول ولا قوة إلا بالله اضعفُ بها كيد من كادني من جميع خلق الله.",
    text: "There is no power and no strength except with Allah, the Most High, the Great. By it, I am protected from the oppression of whoever intends to oppress me among all of Allah's creation.\nThere is no power and no strength except with Allah. By it, I stop the aggression of whoever transgresses against me among all of Allah's creation. There is no power and no strength except with Allah. By it, I frustrate the effort of whoever wrongs me among all of Allah's creation.\nThere is no power and no strength except with Allah. By it, I weaken the plot of whoever plots against me among all of Allah's creation.",
  },
  {
    id: 35,
    title: "", titleAr: "",
    textAr: "لا حول ولا قوة إلا بالله العلي العظيم أزيلُ بها مَكْرَ من مكر بي من جميع خلق الله.\nلا حول ولا قوة إلا بالله العلي العظيم أبطل بها سَعْيَ من سَعَى عليّ من جميع خلق الله.\nلا حول ولا قوة إلا بالله العلي العظيم اذل بها من تعزز علي من جميع خلق الله.\nلا حول ولا قوة إلا بالله أهين بها من أهانني من جميع خلق الله.",
    text: "There is no power and no strength except with Allah, the Most High, the Great. By it, I remove the deception of whoever deceives me among all of Allah's creation.\nThere is no power and no strength except with Allah, the Most High, the Great. By it, I nullify the striving of whoever strives against me among all of Allah's creation.\nThere is no power and no strength except with Allah, the Most High, the Great. By it, I humble whoever exalts himself over me among all of Allah's creation.\nThere is no power and no strength except with Allah. By it, I humiliate whoever humiliates me among all of Allah's creation.",
  },
  {
    id: 36,
    title: "", titleAr: "",
    textAr: "لا حول ولا قوة إلا بالله أقصم بها ظالميّ من جميع خلق الله.\nلا حول ولا قوة إلا بالله أقبرُ على ذي القدرة عليّ من جميع خلق الله.\nلا حول ولا قوة إلا بالله استدفع بها شر من ارادني بشر من جميع خلق الله.",
    text: "There is no power and no strength except with Allah. By it, I break my oppressors among all of Allah's creation.\nThere is no power and no strength except with Allah. By it, I bury whoever has power over me among all of Allah's creation.\nThere is no power and no strength except with Allah. By it, I repel the evil of whoever intends evil for me among all of Allah's creation.",
  },
  {
    id: 37,
    title: "", titleAr: "",
    textAr: "لا حول ولا قوة إلا بالله استغاثة بعزة الله.\nلا حول ولا قوة إلا بالله استغاثة بقوة الله.\nلا حول ولا قوة إلا بالله استجارة بقدرة الله.",
    text: "There is no power and no strength except with Allah, seeking help by the might of Allah.\nThere is no power and no strength except with Allah, seeking help by the strength of Allah.\nThere is no power and no strength except with Allah, seeking protection by the ability of Allah.",
  },
  {
    id: 38,
    title: "", titleAr: "",
    textAr: "لا حول ولا قوة إلا بالله أحصن بها روحي واعضائي وشعري وبشري.\nلا حول ولا قوة إلا بالله استعين بها على محياي ومماتي وعند نزول ملك الموت بي ومعالجة سكراته وغمراته.",
    text: "There is no power and no strength except with Allah. By it, I fortify my soul, my limbs, my hair, and my skin.\nThere is no power and no strength except with Allah. By it, I seek help in my life, in my death, upon the descent of the Angel of Death to me, and in enduring its agonies and overwhelming depths.",
  },
  {
    id: 39,
    title: "", titleAr: "",
    textAr: "اللهم صلي على محمد وعلى آل محمد كما صليت على آل إبراهيم انك حميد مجيد وبارك على محمد وعلى آل محمد كما باركت على آل إبراهيم انك حميد مجيد.\nيا حي يا قيوم يا بديع السموات والأرض يا ذا الجلال والإكرام يا الله لا إله إلا انت اللهم استر عورتي وامن روعتي وخفف لوعتي اللهم اغفر لي كل ذنب واحفظني من كل جنب وفرج عني كل كرب. اللهم اني اسألك العافية في الدنيا والآخرة اللهم اني اسألك العفو والعافية في الدين والدنيا والآخرة اللهم استر عوراتي وامن روعاتي اللهم احفظني من بين يدي ومن خلفي وعن يميني وعن شمالي ومن فوقي واعوذ بعظمتك ان اغتال من تحتي.",
    text: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon the family of Abraham. Indeed, You are Praiseworthy and Glorious. And bless Muhammad and the family of Muhammad, as You blessed the family of Abraham. Indeed, You are Praiseworthy and Glorious.\nO Ever-Living, O Sustainer of existence, O Originator of the heavens and the earth, O Owner of Majesty and Honor. O Allah, there is no deity except You. O Allah, conceal my faults, calm my fears, and lighten my anguish. O Allah, forgive me every sin, protect me from every side, and relieve me of every distress. O Allah, I ask You for well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, and the Hereafter. O Allah, conceal my faults and calm my fears. O Allah, protect me from in front of me, from behind me, from my right, from my left, and from above me, and I seek refuge in Your greatness from being unexpectedly destroyed from beneath me.",
  },
  {
    id: 40,
    title: "", titleAr: "",
    textAr: "اللهم اني عبدك ابن عبدك (١) ابن امتك ناصيتي بيدك ماض في حكمك عدل في قضاؤك، اسألك بكل اسم هو لك سميت به نفسك أو انزلته في كتابك، أو علمته أحداً من خلقك، أو استأثرت به في علم الغيب عندك ان تجعل القرآن العظيم نور صدري، وربيع قلبي، وجلاء حُزني وذهاب همي.\n\n(١) وتقول المرأة اللهم اني امتك بنت عبدك ابن امتك.. إلى آخره.",
    text: "O Allah, I am Your servant, son of Your servant (1), son of Your female servant. My forelock is in Your hand. Your judgment upon me is assured, and Your decree concerning me is just. I ask You by every Name that is Yours, which You have named Yourself with, or revealed in Your Book, or taught to any of Your creation, or kept exclusively in the knowledge of the unseen with You, that You make the Great Qur'an the light of my chest, the spring of my heart, the departure of my sorrow, and the vanishing of my anxiety.\n\n(1) A woman says: O Allah, I am Your female servant, daughter of Your servant, daughter of Your female servant... to the end.",
    needsCounter: true
  },
  {
    id: 41,
    title: "", titleAr: "",
    textAr: "اللهم صلي على محمد عبدك ورسولك النبي الأمي وعلى آل محمد وأزواجه وذرياته كما صليت على إبراهيم وعلى آل إبراهيم وبارك على محمد وعلى آل محمد وازواجه وذرياته كما باركت على إبراهيم وعلى آل إبراهيم في العالمين انك حميد مجيد.\nسبحان ربك رب العزة عما يصفون وسلام على المرسلين والحمد لله رب العالمين.",
    text: "O Allah, send prayers upon Muhammad, Your servant and Messenger, the unlettered Prophet, and upon the family of Muhammad, his wives, and his descendants, as You sent prayers upon Abraham and the family of Abraham. And bless Muhammad, the family of Muhammad, his wives, and his descendants, as You blessed Abraham and the family of Abraham in all the worlds. Indeed, You are Praiseworthy and Glorious.\nExalted is your Lord, the Lord of might, above what they describe. And peace upon the messengers. And praise to Allah, Lord of the worlds.",
  }
];

const fileContent = "export const contentData = " + JSON.stringify(contentData, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, 'constants', 'content.ts'), fileContent, 'utf8');
console.log('Successfully wrote content.ts with 41 items.');
