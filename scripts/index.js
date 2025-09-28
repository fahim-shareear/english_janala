const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then((json) => displayLesons(json.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWords(data.data);
    });
};

const displayLevelWords=(words)=>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length === 0){
            wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-xl font-medium text-gray-400 font-bangla">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="text-4xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>`;
            return;
        };


    words.forEach(word => {
        // console.log(word);
//     {
//     "id": 3,
//     "level": 2,
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস"
// }
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি।"}</h2>
                <p class="font-semibold">Meaning / Pronounciation</p>
                <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "পাওয়া যায়নি।"}</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });
};

const displayLesons = (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    for(let lesson of lessons){
        // console.log(lesson);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `

                <button href="" class="btn btn-outline btn-primary" id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"> 
                    <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                </button>

        `

        levelContainer.append(btnDiv);
    }  
};

loadLessons();